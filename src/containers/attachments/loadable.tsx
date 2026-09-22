import { LoadingIndicator } from "../../shared/components/LoadingIndicator";
import { lazyLoad } from "@filedgr/web-core/react";

export const ProofOfReserveAttachmentsPage = lazyLoad(
  () => import("./index"),
  (module) => module.default,
  { fallback: <LoadingIndicator fullPageHeight /> }
);
