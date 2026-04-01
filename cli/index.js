import dotenv from "dotenv";
import { execSync } from "child_process";
import inquirer from "inquirer";
import { GoogleGenAI } from "@google/genai";
import ora from "ora";

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

function getStagedDiff() {
  return execSync("git diff --cached --unified=3", {
    encoding: "utf-8",
    maxBuffer: 10 * 1024 * 1024,
  });
}

function truncateDiff(diff, maxLength = 4000) {
  if (diff.length <= maxLength) return diff;
  return diff.slice(0, maxLength) + "\n...[truncated]";
}

async function generateCommitMessage(diff) {
  const safeDiff = truncateDiff(diff);

  const prompt = `
Generate exactly one conventional commit message.

Rules:
- Format: type(scope): description
- Allowed types: feat, fix, refactor, docs, chore
- Maximum 72 characters
- Be specific to the actual code change
- Output ONLY the commit message
- No quotes, no bullets, no explanations

Git diff:
${safeDiff}
  `.trim();

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response.text.trim();
}

async function run() {
  const spinner = ora("Analyzing staged changes...").start();

  const diff = getStagedDiff();

  if (!diff.trim()) {
    console.log("❌ No staged changes found.");
    process.exit(1);
  }

  spinner.text = "Generating commit message...";

  try {
    const message = await generateCommitMessage(diff);

    spinner.text = "Finalizing result...";
    spinner.succeed("Commit message generated.");

    console.log("\n✨ Suggested commit:");
    console.log(message);

    spinner.stop();

    const { action } = await inquirer.prompt([
      {
        type: "select",
        name: "action",
        message: "Use this commit message?",
        choices: [
          { name: "Accept and commit", value: "accept" },
          { name: "Edit message", value: "edit" },
          { name: "Cancel", value: "cancel" },
        ],
      },
    ]);

    let finalMessage = message;

    if (action === "edit") {
      const { edited } = await inquirer.prompt([
        {
          type: "input",
          name: "edited",
          message: "Edit commit message:",
          default: message,
        },
      ]);

      finalMessage = edited;
    }

    // create commit
    if (action === "accept") {
      const commitSpinner = ora("Creating git commit...").start();

      execSync(`git commit -m ${JSON.stringify(message)}`, {
        stdio: "ignore",
      });

      commitSpinner.succeed("Commit created successfully.");
    } else {
      console.log("Commit cancelled.");
    }
  } catch (error) {
    spinner.fail("Failed to generate commit message.");
    console.error("\n❌ Gemini error:");
    console.error(error.message);
    process.exit(1);
  }
}

run();
