---
# DRAFT OUTLINE (not published). Pair this with the real-time decoder project.
# To publish: fill in, then move to _posts/YYYY-MM-DD-realtime-decoder-latency.md
title: "A latency budget for a real-time EEG decoder"
description: Where the milliseconds go between electrode and action, measured on a public motor-imagery dataset streamed over Lab Streaming Layer.
tags: [bci, real-time, eeg]
---

Opening: why latency, not just accuracy, decides whether a BCI feels usable.

## Setup
- Dataset: [public motor-imagery dataset, e.g. BCI Competition IV 2a / PhysioNet].
- Streaming: Lab Streaming Layer (LSL) replay at the native sampling rate.
- Pipeline: filtering → windowing → features → classifier → output.

## The budget
| Stage | Time (ms) |
|---|---|
| Acquisition buffer | [ ] |
| Filtering | [ ] |
| Feature extraction | [ ] |
| Inference | [ ] |
| Output / display | [ ] |
| **Total** | **[ ]** |

## Accuracy vs. latency
[Plot: window length vs. accuracy and end-to-end latency.]

## What I would do next
Model compression, causal filters, GPU vs. CPU, closed-loop testing.

[Code + one-command setup: GitHub link]
