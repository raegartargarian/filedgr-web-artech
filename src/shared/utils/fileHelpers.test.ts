import { describe, expect, it } from "vitest";
import { getLanguageFromFileName, isBinaryFile } from "./fileHelpers";

describe("getLanguageFromFileName", () => {
  it("maps extensions to highlight languages", () => {
    expect(getLanguageFromFileName("App.tsx")).toBe("tsx");
    expect(getLanguageFromFileName("main.PY")).toBe("python");
    expect(getLanguageFromFileName("config.yml")).toBe("yaml");
  });

  it("recognizes well-known extensionless files", () => {
    expect(getLanguageFromFileName("Dockerfile")).toBe("dockerfile");
    expect(getLanguageFromFileName("Makefile")).toBe("makefile");
    expect(getLanguageFromFileName(".gitignore")).toBe("git");
  });

  it("falls back to plain text", () => {
    expect(getLanguageFromFileName("LICENSE")).toBe("text");
    expect(getLanguageFromFileName("data.unknownext")).toBe("text");
  });
});

describe("isBinaryFile", () => {
  it("flags media, documents and archives case-insensitively", () => {
    expect(isBinaryFile("certificate.PDF")).toBe(true);
    expect(isBinaryFile("turtle.png")).toBe(true);
    expect(isBinaryFile("bundle.zip")).toBe(true);
  });

  it("does not flag source or text files", () => {
    expect(isBinaryFile("index.ts")).toBe(false);
    expect(isBinaryFile("notes.md")).toBe(false);
  });
});
