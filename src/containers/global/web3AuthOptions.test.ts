import { describe, expect, it, vi } from "vitest";
import { getClientIdForEnv } from "@/shared/utils/envHelper";
import { web3AuthOptionsForEnv } from "./web3AuthOptions";

// Only the enums are needed; loading the real SDK pulls in its whole wallet
// stack, which doesn't evaluate under jsdom.
const WEB3AUTH_NETWORK = vi.hoisted(() => ({
  SAPPHIRE_MAINNET: "sapphire_mainnet",
  SAPPHIRE_DEVNET: "sapphire_devnet",
}));
vi.mock("@web3auth/modal", () => ({
  CHAIN_NAMESPACES: { EIP155: "eip155" },
  WEB3AUTH_NETWORK,
}));

describe("web3AuthOptionsForEnv", () => {
  it("uses Polygon mainnet and the Sapphire mainnet network on MAINNET", () => {
    const options = web3AuthOptionsForEnv("MAINNET");
    expect(options.web3AuthNetwork).toBe(WEB3AUTH_NETWORK.SAPPHIRE_MAINNET);
    expect(options.clientId).toBe(getClientIdForEnv("MAINNET"));
    expect(options.defaultChainId).toBe("0x89");
    expect(options.chains?.[0]).toMatchObject({
      chainId: "0x89",
      displayName: "Polygon",
    });
  });

  it.each(["DEVELOPMENT", "TESTNET"] as const)(
    "uses Polygon Amoy and Sapphire devnet on %s",
    (env) => {
      const options = web3AuthOptionsForEnv(env);
      expect(options.web3AuthNetwork).toBe(WEB3AUTH_NETWORK.SAPPHIRE_DEVNET);
      expect(options.clientId).toBe(getClientIdForEnv(env));
      expect(options.defaultChainId).toBe("0x13882");
    }
  );

  it("has a distinct client id per environment", () => {
    const ids = new Set(
      (["DEVELOPMENT", "TESTNET", "MAINNET"] as const).map(getClientIdForEnv)
    );
    expect(ids.size).toBe(3);
  });

  it("refuses to build options without an environment", () => {
    expect(() => web3AuthOptionsForEnv(undefined)).toThrow(
      "Environment is required"
    );
  });
});
