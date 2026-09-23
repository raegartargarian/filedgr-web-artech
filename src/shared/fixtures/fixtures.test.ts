import { describe, expect, it } from "vitest";
import { getIPFSIMGAddr, getIPFSIMGAddrPrivate } from "../utils/getIPFSAddrs";
import {
  fixtureAttachments,
  getFixtureAttachment,
  getFixtureFileUrl,
  isFixtureCid,
} from ".";

describe("fixtures", () => {
  it("every fixture file resolves to a bundled URL", () => {
    for (const attachment of fixtureAttachments) {
      for (const file of attachment.files ?? []) {
        expect(isFixtureCid(file.cid ?? "")).toBe(true);
        expect(getFixtureFileUrl(file.cid ?? "")).toBeTruthy();
      }
    }
  });

  it("looks attachments up by id", () => {
    expect(getFixtureAttachment("fixture-1")?.name).toBe(
      "Certificate of Authenticity"
    );
    expect(getFixtureAttachment("real-id")).toBeUndefined();
  });

  it("IPFS helpers serve fixture files locally and leave real CIDs alone", () => {
    const cid = fixtureAttachments[0].files![0].cid!;
    expect(getIPFSIMGAddr(cid)).toBe(getFixtureFileUrl(cid));
    expect(getIPFSIMGAddrPrivate(cid)).toBe(getFixtureFileUrl(cid));
    expect(getIPFSIMGAddr("bafy123")).toMatch(
      /^https:\/\/bafy123\.ipfs\.pub\./
    );
    expect(getFixtureFileUrl("bafy123")).toBeUndefined();
  });
});
