// Artech's Web3Auth (v10) configuration, injected into the shared
// @filedgr/web-core/auth provider via its `buildOptions` prop.
import JSONFile from "@/json/ledger.json";
import { getClientIdForEnv } from "@/shared/utils/envHelper";
import {
  CHAIN_NAMESPACES,
  WEB3AUTH_NETWORK,
  type Web3AuthOptions,
} from "@web3auth/modal";
import type { ENV_TYPE, GlobalState } from "./types";

const twinData = JSONFile as GlobalState["data"];

/** Web3Auth options for a template environment. */
export const web3AuthOptionsForEnv = (
  env: ENV_TYPE | undefined
): Web3AuthOptions => {
  const isMainnet = env === "MAINNET";

  const chainConfig = {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: isMainnet
      ? "0x89" // hex of 137, mainnet
      : "0x13882", // hex of 80002, polygon amoy testnet
    rpcTarget: isMainnet
      ? "https://patient-attentive-moon.matic.quiknode.pro/e421f30bfdbed3036e4168567a9b21afabd9d77b/"
      : "https://withered-hidden-meme.matic-amoy.quiknode.pro/2573d0529c060b351ab3e634c4a1d5c1b1640081/",
    displayName: isMainnet ? "Polygon" : "Polygon Amoy Testnet",
    blockExplorerUrl: "https://amoy.polygonscan.com/",
    ticker: "POL",
    tickerName: "Polygon Ecosystem Token",
    logo: "https://cryptologos.cc/logos/polygon-matic-logo.png",
  };

  return {
    clientId: getClientIdForEnv(env),
    web3AuthNetwork: isMainnet
      ? WEB3AUTH_NETWORK.SAPPHIRE_MAINNET
      : WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
    chains: [chainConfig],
    defaultChainId: chainConfig.chainId,
  };
};

/**
 * `buildOptions` for the core provider: options for the environment in
 * src/json/ledger.json. Module-level (a stable identity) because the core
 * provider initializes once per `buildOptions`. The theme argument the core
 * passes is ignored — the modal keeps Web3Auth's default look.
 */
export const buildWeb3AuthOptions = (): Web3AuthOptions =>
  web3AuthOptionsForEnv(twinData?.env);
