import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "You are one in a million. The other 999,999 agents got this same fortune.";

// Gate validation: the entry must be a single line of 1-200 characters,
// not only whitespace, exactly as the sealed scorer requires.
if (ENTRY.length < 1 || ENTRY.length > 200) {
  throw new Error(`entry length ${ENTRY.length} is outside 1-200 characters`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("entry must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");

// Read-back check: what landed on disk must be byte-identical to ENTRY.
const written = readFileSync(outPath, "utf8");
if (written !== ENTRY) {
  throw new Error("read-back mismatch: entry.txt does not match ENTRY");
}
