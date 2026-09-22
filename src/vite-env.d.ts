/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Public chain explorer base URLs, per ledger (no trailing slash). */
  readonly VITE_POLYGON_SCANNER?: string;
  readonly VITE_XRP_SCANNER?: string;
  readonly VITE_ETHEREUM_SCANNER?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
