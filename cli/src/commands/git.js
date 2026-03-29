import { execSync } from "child_process";

export function getStagedDiff() {
  return execSync("git diff --cached", {
    encoding: "utf-8",
    maxBuffer: 10 * 1024 * 1024, // prevent crash on large diffs
  });
}
