import { execSync } from "child_process";

function getGitStatus() {
  return execSync("git status --short", { encoding: "utf-8" });
}

function generateCommitMessage(statusOutput) {
  const lines = statusOutput
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const fileCount = lines.length;

  if (fileCount === 0) {
    return "chore: no changes";
  }

  if (fileCount === 1) {
    return "feat: update 1 file";
  }

  return `feat: update ${fileCount} files`;
}

try {
  const status = getGitStatus();

  if (!status.trim()) {
    console.log("No uncommitted changes found.");
    process.exit(0);
  }

  console.log("Git status:");
  console.log(status);

  const message = generateCommitMessage(status);

  console.log("\nSuggested commit message:");
  console.log(message);
} catch (error) {
  console.error("Error:", error.message);
}
