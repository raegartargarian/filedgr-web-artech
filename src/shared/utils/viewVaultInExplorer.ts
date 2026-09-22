import { GlobalState } from "@/containers/global/types";
import JSONFile from "@/json/ledger.json";
import { chainTxUrl } from "@filedgr/web-core/explorer";
import { getNetworkExplorerUrlByServerName } from "./networks";

const getLedgerData = () => {
  const data = JSONFile as GlobalState["data"];
  if (!data) {
    throw new Error("No data found");
  }
  return data;
};

export const getVaultExplorerUrl = (): string => {
  const { vault } = getLedgerData();
  const explorer = getNetworkExplorerUrlByServerName(vault.ledger);
  return `${explorer}/nft/${vault.nftId}`;
};

export const getTxExplorerUrl = (tx: string): string => {
  const { vault } = getLedgerData();
  return chainTxUrl(getNetworkExplorerUrlByServerName(vault.ledger), tx);
};

export const openViewVaultExplorer = () => {
  window.open(getVaultExplorerUrl(), "_blank");
};

export const viewTXInExplorer = (tx: string) => {
  window.open(getTxExplorerUrl(tx), "_blank");
};
