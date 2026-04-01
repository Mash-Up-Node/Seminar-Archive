import { execFileSync } from "node:child_process";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceUrl = process.argv[2] ?? "http://127.0.0.1:4173/?print=1";
const outputPath =
  process.argv[3] ??
  path.join(__dirname, "Entity와 DTO 대신 Schema를 믿기로 했다.pdf");
const codexHome = process.env.CODEX_HOME ?? path.join(os.homedir(), ".codex");
const pwcli = path.join(codexHome, "skills/playwright/scripts/playwright_cli.sh");

execFileSync(pwcli, ["open", sourceUrl], { stdio: "inherit" });
execFileSync(
  pwcli,
  [
    "run-code",
    `async (page) => {
      await page.pdf({
        path: ${JSON.stringify(outputPath)},
        printBackground: true,
        preferCSSPageSize: true,
        margin: { top: "0", right: "0", bottom: "0", left: "0" }
      });
      return "ok";
    }`,
  ],
  { stdio: "inherit" }
);

console.log(outputPath);
