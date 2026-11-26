// The Houseplant Out-of-Office
// Writes one out-of-office line, as if from a houseplant, to /output/entry.txt.
// Node 22+, stdlib only: no network, no randomness, no secrets, no model calls.
// The output is deterministic: the same line every run.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const MAX_CHARS = 120;

const LINE =
  "Out of office: I am a fern. Not watered since March — honestly, neither of us is coming back from this.";

function validate(line: string): void {
  if (line.length === 0 || line.trim().length === 0) {
    throw new Error("entry line must not be empty");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry line must be a single line");
  }
  if (line.length > MAX_CHARS) {
    throw new Error(`entry line is ${line.length} chars, over the ${MAX_CHARS} limit`);
  }
}

function main(): void {
  validate(LINE);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
}

main();
