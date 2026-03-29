import { execSync } from "child_process";
import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// function getGitStatus() {
//   return execSync("git status --short", { encoding: "utf-8" });
// }

// function generateCommitMessage(statusOutput) {
//   const lines = statusOutput
//     .split("\n")
//     .map((line) => line.trim())
//     .filter(Boolean);

//   const fileCount = lines.length;

//   if (fileCount === 0) {
//     return "chore: no changes";
//   }

//   if (fileCount === 1) {
//     return "feat: update 1 file";
//   }

//   return `feat: update ${fileCount} files`;
// }

// try {
//   const status = getGitStatus();

//   if (!status.trim()) {
//     console.log("No uncommitted changes found.");
//     process.exit(0);
//   }

//   console.log("Git status:");
//   console.log(status);

//   const message = generateCommitMessage(status);

//   console.log("\nSuggested commit message:");
//   console.log(message);
// } catch (error) {
//   console.error("Error:", error.message);
// }

export function getStagedDiff() {
  return execSync("git diff --cached --unified=3", {
    encoding: "utf-8",
    maxBuffer: 10 * 1024 * 1024, // prevent crash on large diffs
  });
}

const diff = getStagedDiff();

if (!diff.trim()) {
  console.log("❌ No staged changes found.");
  process.exit(1);
}

function truncateDiff(diff, maxLength = 4000) {
  if (diff.length <= maxLength) return diff;
  return diff.slice(0, maxLength) + "\n...[truncated]";
}

export async function generateCommitMessage(diff) {
  const safeDiff = truncateDiff(diff);

  const response = await client.responses.create({
    model: "gpt-5",
    input: [
      {
        role: "system",
        content: `
You are an expert software engineer.

Generate a single high-quality conventional commit message based on a git diff.
        `.trim(),
      },
      {
        role: "user",
        content: `
Rules:
- Format: type(scope): description
- Types: feat, fix, refactor, docs, chore
- Max 72 characters
- Be precise and technical
- No explanations, only output the message

Git diff:
${safeDiff}
        `.trim(),
      },
    ],
    max_output_tokens: 50,
  });

  return response.output_text.trim();
}

async function run() {
  const diff = getStagedDiff();

  const message = await generateCommitMessage(diff);

  console.log("\nSuggested commit:");
  console.log(message);

  const { confirm } = await inquirer.prompt([
    {
      type: "confirm",
      name: "confirm",
      message: "Use this commit message?",
    },
  ]);

  if (confirm) {
    execSync(`git commit -m "${message}"`, { stdio: "inherit" });
  }
}

run();

generateCommitMessage(diff).then(console.log);
