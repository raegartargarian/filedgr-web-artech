// Framework-free wiring of the Filedgr template API on top of
// @filedgr/web-core/api. Kept free of the redux store so it can be unit
// tested; src/shared/providers/api.ts binds it to the app.
import type { ENV_TYPE } from "@/containers/global/types";
import {
  createApiClient,
  createFiledgrApi,
  isJwtExpired,
  type PaginatedResponse,
} from "@filedgr/web-core/api";
import type { AxiosError, AxiosInstance } from "axios";

/**
 * Template API base URL per environment — the same table the retired
 * @filedgr/filedgr-template-sdk used. Any env other than DEVELOPMENT/TESTNET
 * resolves to production, as it always has.
 */
export const TEMPLATE_API_URLS = {
  DEVELOPMENT: "https://template-api.dev.filedgr.network",
  TESTNET: "https://template-api.test.filedgr.network",
  MAINNET: "https://template-api.filedgr.network",
} as const satisfies Record<ENV_TYPE, string>;

export const getTemplateApiUrl = (env?: string): string =>
  env === "DEVELOPMENT"
    ? TEMPLATE_API_URLS.DEVELOPMENT
    : env === "TESTNET"
      ? TEMPLATE_API_URLS.TESTNET
      : TEMPLATE_API_URLS.MAINNET;

/** Bearer value the template API accepts for anonymous (public) reads. */
export const PUBLIC_BEARER = "Bearer public";

interface TemplateApiErrorBody {
  message?: string;
  detail?: Array<{ msg?: string }>;
}

/** The human-readable message the template API puts in an error body. */
export const extractApiErrorMessage = (
  body: unknown,
  fallback: string
): string => {
  const data = body as TemplateApiErrorBody | null | undefined;
  return data?.detail?.[0]?.msg || data?.message || fallback;
};

export interface TemplateApiClientOptions {
  baseURL: string;
  /** Raw stored access token (may be JSON-quoted), or null when signed out. */
  getToken: () => string | null | undefined;
  /** Called when the stored token has expired or cannot be parsed. */
  onTokenExpired: () => void;
}

/**
 * An axios client for the template API.
 *
 * - A valid stored JWT is sent as the bearer token (by web-core's interceptor).
 * - Without one the request goes out as `Bearer public`.
 * - An expired/corrupt token triggers `onTokenExpired` and the request falls
 *   back to public access instead of failing — the template SDK's behaviour.
 * - Error messages are lifted from the API's `detail[0].msg` / `message`.
 */
export const createTemplateApiClient = ({
  baseURL,
  getToken,
  onTokenExpired,
}: TemplateApiClientOptions): AxiosInstance => {
  const getValidToken = () => {
    const token = getToken();
    if (!token) return null;
    if (isJwtExpired(token)) {
      onTokenExpired();
      return null;
    }
    return token;
  };

  const client = createApiClient({
    baseURL,
    getToken: getValidToken,
    onTokenExpired,
  });

  // Axios runs request interceptors last-registered-first, so this default
  // is applied before web-core's JWT interceptor, which overrides it when a
  // valid token is stored.
  client.interceptors.request.use((config) => {
    if (!config.headers.Authorization) {
      config.headers.Authorization = PUBLIC_BEARER;
    }
    return config;
  });

  client.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error?.response) {
        error.message = extractApiErrorMessage(
          error.response.data,
          error.response.statusText || error.message
        );
      }
      return Promise.reject(error);
    }
  );

  return client;
};

/** The two template endpoints this app reads, bound to a client. */
export const createTemplateApi = (client: AxiosInstance) => {
  const filedgrApi = createFiledgrApi(client, { defaultPageSize: 15 });

  return {
    /** GET /streams/{code}/attachments — one page of a stream's attachments. */
    getTokensAttachment: async <T = unknown>(params: {
      tokenCode: string;
      page: number;
      pageSize: number;
    }): Promise<PaginatedResponse<T>> =>
      (
        await filedgrApi.getTokenAttachments(
          params.tokenCode,
          params.page,
          params.pageSize
        )
      ).data,

    /** GET /attachments/{id} */
    getAttachmentDetail: async <T = unknown>(id: string): Promise<T> =>
      (await filedgrApi.getSingleAttachment(id)).data as T,
  };
};
