// Template API access, replacing @filedgr/filedgr-template-sdk with
// @filedgr/web-core/api. Only the app wiring lives here: which environment to
// talk to (from src/json/ledger.json), where the token is stored, and logging
// out through the redux store.
import type { AttachmentModel } from "@/containers/attachments/types";
import { globalActions } from "@/containers/global/slice";
import { GlobalState } from "@/containers/global/types";
import JSONFile from "@/json/ledger.json";
import { store } from "@/main";
import { LocalStorageKeys } from "../utils/localStorageHelpers";
import {
  createTemplateApi,
  createTemplateApiClient,
  getTemplateApiUrl,
} from "./templateApiClient";

const jsonData = JSONFile as GlobalState["data"];

export const apiClient = createTemplateApiClient({
  baseURL: getTemplateApiUrl(jsonData?.env),
  getToken: () => localStorage.getItem(LocalStorageKeys.jwtAccessKey),
  onTokenExpired: () => {
    localStorage.removeItem(LocalStorageKeys.jwtAccessKey);
    store.dispatch(globalActions.logOut());
  },
});

const templateApi = createTemplateApi(apiClient);

export const getTokensAttachment = (params: {
  tokenCode: string;
  page: number;
  pageSize: number;
}) => templateApi.getTokensAttachment<AttachmentModel>(params);

export const getAttachmentDetail = (id: string) =>
  templateApi.getAttachmentDetail<AttachmentModel>(id);
