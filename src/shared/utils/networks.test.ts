import { describe, expect, it } from "vitest";
import {
  getLedgerNameFromServerName,
  getNetworkById,
  getNetworkLogoByServerName,
} from "./networks";
import { getTxExplorerUrl, getVaultExplorerUrl } from "./viewVaultInExplorer";
import ledger from "@/json/ledger.json";

describe("network helpers", () => {
  it("resolves display names and logos by backend ledger name", () => {
    expect(getLedgerNameFromServerName("POLYGON_ZKEVM")).toBe("Polygon");
    expect(getLedgerNameFromServerName("XRPL")).toBe("XRP");
    expect(getLedgerNameFromServerName("UNKNOWN")).toBe("");
    expect(getNetworkLogoByServerName("ETHEREUM")).toContain("ethereum");
  });

  it("finds a network by id", () => {
    expect(getNetworkById("xrp")?.serverName).toBe("XRPL");
    expect(getNetworkById("nope")).toBeUndefined();
  });
});

describe("explorer links", () => {
  it("points at the vault NFT and transactions on the ledger's explorer", () => {
    expect(getVaultExplorerUrl()).toMatch(
      new RegExp(`/nft/${ledger.vault.nftId}$`)
    );
    expect(getTxExplorerUrl("0xabc")).toMatch(/\/tx\/0xabc$/);
  });
});
