import { describe, expect, it } from "vitest";
import { formatDate } from "./dateFormatter";

describe("formatDate", () => {
  it("renders a long US-English date", () => {
    expect(formatDate(new Date(2025, 0, 15))).toBe("January 15, 2025");
  });

  it("renders an empty value as an empty string", () => {
    expect(formatDate("")).toBe("");
  });

  it("formats API timestamps", () => {
    expect(formatDate("2025-06-01T12:00:00")).toMatch(
      /^(May 31|June 1), 2025$/
    );
  });
});
