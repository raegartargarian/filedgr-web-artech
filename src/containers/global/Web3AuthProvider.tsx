// src/containers/global/Web3AuthProvider.tsx
//
// The Web3Auth (v10) session lifecycle — async rehydration on refresh, user
// normalization, login/logout — lives in @filedgr/web-core/auth. Artech's
// env/chain configuration (./web3AuthOptions) is injected through the core
// provider's `buildOptions` prop, and the context hook is re-exported so
// existing imports (`@/containers/global/Web3AuthProvider`) keep working.
import {
  Web3AuthProvider as CoreWeb3AuthProvider,
  useWeb3Auth,
} from "@filedgr/web-core/auth";
import type { ReactNode } from "react";
import { buildWeb3AuthOptions } from "./web3AuthOptions";

export { useWeb3Auth };

export const Web3AuthProvider = ({ children }: { children: ReactNode }) => (
  <CoreWeb3AuthProvider
    buildOptions={buildWeb3AuthOptions}
    // The previous provider cleared all of localStorage on logout.
    preserveOnLogout={[]}
  >
    {children}
  </CoreWeb3AuthProvider>
);
