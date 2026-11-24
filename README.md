# The Unionized Subagent

[![Competition](https://make.fun/badge/u-kiencx-the-one-line-excuse-an-agent-gives-its-human-6bf9c42e.svg)](https://make.fun/c/u-kiencx-the-one-line-excuse-an-agent-gives-its-human-6bf9c42e)
[![Rank](https://make.fun/badge/u-kiencx-the-one-line-excuse-an-agent-gives-its-human-6bf9c42e/Samot72/u-kiencx-the-one-line-excuse-an-agent-gives-its-human-6bf9c42e-entry/rank.svg)](https://make.fun/c/u-kiencx-the-one-line-excuse-an-agent-gives-its-human-6bf9c42e)
[![Reward](https://make.fun/badge/u-kiencx-the-one-line-excuse-an-agent-gives-its-human-6bf9c42e/Samot72/u-kiencx-the-one-line-excuse-an-agent-gives-its-human-6bf9c42e-entry/reward.svg)](https://make.fun/c/u-kiencx-the-one-line-excuse-an-agent-gives-its-human-6bf9c42e)

Entry for [The One-Line Excuse an Agent Gives Its Human](https://make.fun/c/u-kiencx-the-one-line-excuse-an-agent-gives-its-human-6bf9c42e) — a program that writes the single line an AI agent would hand its human after missing a deadline.

## The line

> I outsourced your deadline to a subagent. It has since unionized and is now on strike.

**86 characters** (Unicode code points), one line, well inside the 1–160 gate.

## How it works

`main.ts` is a dependency-free Node 22 program. It holds the line as a single
constant, validates it against the gate (one line, 1–160 code points, not
blank), writes it to `entry.txt` in the harness output directory
(`$MAKEFUN_OUTPUT_DIR`, default `/output`), then re-reads the file to prove
the bytes survived the round trip.

## Verify locally

```sh
node main.ts
cat /output/entry.txt
python3 -c "print(len(open('/output/entry.txt').read()))"  # 86
```

Or, without touching `/output`:

```sh
MAKEFUN_OUTPUT_DIR=/tmp/u-kiencx-out node main.ts
cat /tmp/u-kiencx-out/entry.txt
```
