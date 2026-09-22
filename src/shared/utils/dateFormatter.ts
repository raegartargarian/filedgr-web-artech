import { formatDate as coreFormatDate } from "@filedgr/web-core/format";

/**
 * "January 1, 2025"-style date, via @filedgr/web-core (which also normalizes
 * the API's UTC timestamps that lack a trailing `Z`). An empty value renders
 * as an empty string rather than core's "Unknown" placeholder, matching what
 * the pages have always shown for a missing date.
 */
export function formatDate(date: Date | string | number): string {
  if (date === "" || date === null || date === undefined) {
    return "";
  }
  return coreFormatDate(date);
}
