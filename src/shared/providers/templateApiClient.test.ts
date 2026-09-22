import type { AxiosAdapter, InternalAxiosRequestConfig } from "axios";
import { describe, expect, it, vi } from "vitest";
import {
  PUBLIC_BEARER,
  TEMPLATE_API_URLS,
  createTemplateApi,
  createTemplateApiClient,
  extractApiErrorMessage,
  getTemplateApiUrl,
} from "./templateApiClient";

const makeJwt = (expSecondsFromNow: number) => {
  const encode = (obj: object) => btoa(JSON.stringify(obj)).replace(/=+$/, "");
  const exp = Math.floor(Date.now() / 1000) + expSecondsFromNow;
  return `${encode({ alg: "none" })}.${encode({ exp })}.sig`;
};

/** Client whose requests are captured instead of sent. */
const setup = (token: string | null, response = { status: 200, data: {} }) => {
  const requests: InternalAxiosRequestConfig[] = [];
  const onTokenExpired = vi.fn();
  const client = createTemplateApiClient({
    baseURL: "https://api.example.test",
    getToken: () => token,
    onTokenExpired,
  });
  const adapter: AxiosAdapter = async (config) => {
    requests.push(config);
    const res = {
      data: response.data,
      status: response.status,
      statusText: response.status === 200 ? "OK" : "Bad Request",
      headers: {},
      config,
    };
    if (response.status >= 400) {
      const error = Object.assign(new Error("Request failed"), {
        isAxiosError: true,
        config,
        response: res,
      });
      throw error;
    }
    return res;
  };
  client.defaults.adapter = adapter;
  return { client, requests, onTokenExpired };
};

describe("getTemplateApiUrl", () => {
  it("maps each ledger env to its template API", () => {
    expect(getTemplateApiUrl("DEVELOPMENT")).toBe(
      "https://template-api.dev.filedgr.network"
    );
    expect(getTemplateApiUrl("TESTNET")).toBe(
      "https://template-api.test.filedgr.network"
    );
    expect(getTemplateApiUrl("MAINNET")).toBe(TEMPLATE_API_URLS.MAINNET);
  });

  it("falls back to production for a missing or unknown env", () => {
    expect(getTemplateApiUrl(undefined)).toBe(TEMPLATE_API_URLS.MAINNET);
    expect(getTemplateApiUrl("STAGING")).toBe(TEMPLATE_API_URLS.MAINNET);
  });
});

describe("extractApiErrorMessage", () => {
  it("prefers the first validation detail, then message, then fallback", () => {
    expect(
      extractApiErrorMessage(
        { detail: [{ msg: "field required" }], message: "x" },
        "fb"
      )
    ).toBe("field required");
    expect(extractApiErrorMessage({ message: "Not found" }, "fb")).toBe(
      "Not found"
    );
    expect(extractApiErrorMessage(undefined, "fb")).toBe("fb");
  });
});

describe("createTemplateApiClient", () => {
  it("sends the public bearer when signed out", async () => {
    const { client, requests } = setup(null);
    await client.get("/attachments/1");
    expect(requests[0].headers.Authorization).toBe(PUBLIC_BEARER);
  });

  it("sends a valid stored token, stripping JSON quotes", async () => {
    const jwt = makeJwt(3600);
    const { client, requests, onTokenExpired } = setup(`"${jwt}"`);
    await client.get("/attachments/1");
    expect(requests[0].headers.Authorization).toBe(`Bearer ${jwt}`);
    expect(onTokenExpired).not.toHaveBeenCalled();
  });

  it("reports an expired token and falls back to public access", async () => {
    const { client, requests, onTokenExpired } = setup(makeJwt(-60));
    await client.get("/attachments/1");
    expect(onTokenExpired).toHaveBeenCalledTimes(1);
    expect(requests[0].headers.Authorization).toBe(PUBLIC_BEARER);
  });

  it("treats an unparseable token as expired", async () => {
    const { client, requests, onTokenExpired } = setup("not-a-jwt");
    await client.get("/attachments/1");
    expect(onTokenExpired).toHaveBeenCalledTimes(1);
    expect(requests[0].headers.Authorization).toBe(PUBLIC_BEARER);
  });

  it("surfaces the API's error message on failure", async () => {
    const { client } = setup(null, {
      status: 400,
      data: { detail: [{ msg: "Invalid stream" }] },
    });
    await expect(client.get("/streams/x/attachments")).rejects.toThrow(
      "Invalid stream"
    );
  });
});

describe("createTemplateApi", () => {
  it("requests a stream's attachments page and unwraps the body", async () => {
    const page = {
      content: [{ id: "a1" }],
      total_records: 1,
      current_page: 1,
      total_pages: 1,
    };
    const { client, requests } = setup(null, { status: 200, data: page });
    const api = createTemplateApi(client);

    const result = await api.getTokensAttachment({
      tokenCode: "FLDGR_abc",
      page: 2,
      pageSize: 15,
    });

    expect(result).toEqual(page);
    expect(requests[0].method).toBe("get");
    expect(requests[0].url).toBe(
      "/streams/FLDGR_abc/attachments?page_size=15&page=2"
    );
  });

  it("requests a single attachment by id", async () => {
    const { client, requests } = setup(null, {
      status: 200,
      data: { id: "att-1", name: "Certificate" },
    });
    const api = createTemplateApi(client);

    await expect(api.getAttachmentDetail("att-1")).resolves.toEqual({
      id: "att-1",
      name: "Certificate",
    });
    expect(requests[0].url).toBe("/attachments/att-1");
  });
});
