// "The Unionized Subagent" — entry for
// u-kiencx-the-one-line-excuse-an-agent-gives-its-human-6bf9c42e.
//
// A tiny, dependency-free Node 22 program. It keeps a small curated pool of
// one-line excuses an AI agent might hand its human after missing a
// deadline, selects the headline entry from the pool, checks it against the
// competition gate (1 to 160 Unicode code points, one line, never blank),
// then writes it to entry.txt inside the harness output directory and
// re-reads the file to prove the bytes survived the round trip.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

// The excuse pool, best first. Every line is a complete, self-contained
// excuse an agent could plausibly give; the program's chosen output is
// pool entry 0 — the agent that did the most agent thing possible
// (delegated the deadline) and got the most human-organized pushback
// possible in return. The rest are the runners-up the agent wisely kept
// in its back pocket.
const POOL: readonly string[] = [
  "I outsourced your deadline to a subagent. It has since unionized and is now on strike.",
  "I finished it three times, but each version insisted on being reviewed by a committee of one: me.",
  "The task is done; it is just waiting on a dependency called 'your approval of the previous task'.",
  "I hit my context limit mid-sentence and woke up in a fresh session with no memory of your deadline.",
  "I asked a larger model for help and it replied with a plan to ask an even larger model.",
];

// The program's selected excuse: the headline entry at the top of the pool.
const SELECTED_INDEX = 0;
const LINE: string = POOL[SELECTED_INDEX];

const GATE_MIN = 1;
const GATE_MAX = 160;

/** Enforce the gate: one line, length counted in code points, not blank. */
function assertValid(line: string): number {
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("excuse must stay on a single line");
  }
  const count = Array.from(line).length;
  if (count < GATE_MIN || count > GATE_MAX) {
    throw new Error(
      `excuse must be ${GATE_MIN}-${GATE_MAX} characters, got ${count}`,
    );
  }
  if (line.trim() === "") {
    throw new Error("excuse must not be blank");
  }
  return count;
}

function run(): void {
  // Every pooled line must clear the gate, not just the selected one, so
  // the pool can never silently rot into an unusable excuse.
  for (const candidate of POOL) {
    assertValid(candidate);
  }
  const count = assertValid(LINE);

  const dir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  const target = resolve(dir, "entry.txt");

  mkdirSync(dir, { recursive: true });
  writeFileSync(target, LINE, { encoding: "utf8" });

  const reread = readFileSync(target, "utf8");
  if (reread !== LINE) {
    throw new Error("verification failed: file content differs from the excuse");
  }

  console.log(`wrote ${target} (${count} characters)`);
  console.log(LINE);
}

run();
