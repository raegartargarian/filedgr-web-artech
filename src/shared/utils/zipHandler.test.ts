import JSZip from "jszip";
import { describe, expect, it } from "vitest";
import { buildFileStructure, processZipFile } from "./zipHandler";

const zipOf = async (files: Record<string, string>) => {
  const zip = new JSZip();
  for (const [path, content] of Object.entries(files)) {
    zip.file(path, content);
  }
  return zip.generateAsync({ type: "arraybuffer" });
};

describe("buildFileStructure", () => {
  it("nests files under folders and skips hidden entries", () => {
    const tree = buildFileStructure([
      "src/index.ts",
      "README.md",
      ".env",
      ".git/config",
      "src/.cache/tmp",
      ".gitignore",
    ]);

    expect(tree).toEqual([
      {
        name: "src",
        type: "folder",
        children: [{ name: "index.ts", type: "file" }],
      },
      { name: ".gitignore", type: "file" },
      { name: "README.md", type: "file" },
    ]);
  });

  it("drops folders that end up empty", () => {
    expect(buildFileStructure(["empty/", "a.txt"])).toEqual([
      { name: "a.txt", type: "file" },
    ]);
  });
});

describe("processZipFile", () => {
  it("reads a GitHub-style repo zip as code, stripping the root folder", async () => {
    const result = await processZipFile(
      await zipOf({
        "repo-main/src/app.ts": "export const x = 1;",
        "repo-main/logo.png": "binary",
      })
    );

    expect(result.type).toBe("code");
    expect(result.content).toEqual([
      {
        name: "src",
        type: "folder",
        children: [
          {
            name: "app.ts",
            type: "file",
            code: "export const x = 1;",
            language: "typescript",
          },
        ],
      },
      { name: "logo.png", type: "file", code: "[Binary file not displayed]" },
    ]);
  });

  it("recognizes a model-documentation bundle by its root model.json", async () => {
    const result = await processZipFile(
      await zipOf({
        "model.json": JSON.stringify({ name: "Masterpiece" }),
        "notes/statement.md": "# Statement",
        "readme.txt": "hello",
        "image.png": "ignored",
      })
    );

    expect(result.type).toBe("model-documentation");
    expect(result.content).toEqual({
      modelDetails: { name: "Masterpiece" },
      textFiles: expect.arrayContaining([
        { name: "statement.md", content: "# Statement" },
        { name: "readme.txt", content: "hello" },
      ]),
    });
  });
});
