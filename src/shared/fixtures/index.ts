// Demo attachments bundled with the app. The attachment list and detail sagas
// fall back to these when the template API (or the vault's IPFS content)
// can't be reached, so the documentation pages always have something to show.
import type { AttachmentModel } from "@/containers/attachments/types";
import artworkDocumentation from "./artwork-documentation.pdf?no-inline";
import artistStatement from "./artist-statement.pdf?no-inline";
import certificateOfAuthenticity from "./certificate-of-authenticity.pdf?no-inline";
import creationProcess from "./creation-process.pdf?no-inline";

/** Prefix marking a file `cid` as a bundled fixture rather than an IPFS CID. */
const FIXTURE_CID_PREFIX = "fixture:";

const fixtureFileUrls: Record<string, string> = {
  "certificate-of-authenticity.pdf": certificateOfAuthenticity,
  "artist-statement.pdf": artistStatement,
  "creation-process.pdf": creationProcess,
  "artwork-documentation.pdf": artworkDocumentation,
};

export const isFixtureCid = (cid: string) => cid.startsWith(FIXTURE_CID_PREFIX);

/** URL of a bundled fixture file, or undefined for a real IPFS CID. */
export const getFixtureFileUrl = (cid: string): string | undefined =>
  isFixtureCid(cid)
    ? fixtureFileUrls[cid.slice(FIXTURE_CID_PREFIX.length)]
    : undefined;

const fixtureAttachment = (
  index: number,
  name: string,
  description: string,
  filename: string,
  createdAt: string
): AttachmentModel => ({
  id: `fixture-${index}`,
  name,
  description,
  created_at: createdAt,
  ledger: "POLYGON_ZKEVM",
  status: "FILEDGR_DATA_ATTACHMENT_COMPLETED",
  tx_hash: null,
  file_count: 1,
  public_vault: true,
  stream: { asset_code: "FLDGR_bnePHi" },
  files: [
    {
      id: `fixture-${index}-file`,
      filename,
      mimetype: "application/pdf",
      created_at: createdAt,
      status: "FILEDGR_UPLOADED",
      cid: `${FIXTURE_CID_PREFIX}${filename}`,
    },
  ],
});

export const fixtureAttachments: AttachmentModel[] = [
  fixtureAttachment(
    1,
    "Certificate of Authenticity",
    "Confirms the originality of The Masterpiece and anchors its records in the Filedgr vault.",
    "certificate-of-authenticity.pdf",
    "2025-06-15T10:00:00Z"
  ),
  fixtureAttachment(
    2,
    "Artist Statement",
    "The artist's intent and the inclusive creativity programme behind the work.",
    "artist-statement.pdf",
    "2025-06-16T10:00:00Z"
  ),
  fixtureAttachment(
    3,
    "Creation Process",
    "From clay study to seven synchronised digital loops.",
    "creation-process.pdf",
    "2025-06-17T10:00:00Z"
  ),
  fixtureAttachment(
    4,
    "Artwork Documentation",
    "Installation, dimensions and condition of the seven-screen sculpture.",
    "artwork-documentation.pdf",
    "2025-06-18T10:00:00Z"
  ),
];

export const getFixtureAttachment = (id: string) =>
  fixtureAttachments.find((attachment) => attachment.id === id);
