// Useless Superpower — entry writer for the "One Line, Zero Use" sprint.
//
// The whole entry is a single line of text. This program's only job is to
// place that line, byte for byte, into entry.txt inside the output
// directory the grader hands us, and to do it identically on every run.

import { existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The superpower on offer: flawless, to-the-second knowledge of the exact
// moment a meeting turned into something an email could have handled —
// knowledge that only ever arrives once the meeting is already over.
const ENTRY_LINE =
  "I always know the exact second a meeting could have been an email — three seconds after it ends.";

function resolveOutputDir(): string {
  const fromEnv = process.env.OUTPUT_DIR;
  if (fromEnv && fromEnv.trim().length > 0) {
    return fromEnv;
  }
  return "/output";
}

// The output directory is a mount point in the grader: it must never be
// removed itself. We only clear whatever files sit inside it, then write
// our single artifact.
function prepareOutputDir(dir: string): void {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
    return;
  }
  for (const child of readdirSync(dir)) {
    rmSync(join(dir, child), { recursive: true, force: true });
  }
}

function main(): void {
  const outDir = resolveOutputDir();
  prepareOutputDir(outDir);
  writeFileSync(join(outDir, "entry.txt"), ENTRY_LINE + "\n", "utf8");
}

main();
