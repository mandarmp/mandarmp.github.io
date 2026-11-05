---
title: Multielectrode Array Analysis
order: 1
featured: true
year: 2022–2024
category: Neural Data
role: Computational specialist
context: UC Davis Health
summary: Reusable HD-MEA analysis workflows for large neural datasets, improving the throughput and consistency of electrophysiology analysis.
cover: /assets/img/work/mea.svg
cover_alt: Abstract electrode grid with a hotspot of neural activity
stack: [Python, NumPy, HPC, Data visualisation]
metrics:
  - { value: "HD-MEA", label: "High-density array recordings" }
  - { value: "HPC", label: "Supercomputer-scale processing" }
  - { value: "Reusable", label: "Lab-wide analysis workflows" }
links:
  - { label: View repository, url: "https://github.com/roybens/MEA_Analysis" }
---

## The problem

High-density microelectrode arrays record thousands of channels at once. Each
recording session produces large, noisy datasets, and ad-hoc notebooks made
results hard to reproduce across experiments, cell lines and people.

## What I built

- **Ingestion & preprocessing:** a consistent path from raw recordings to
  filtered, quality-checked signals.
- **Feature extraction:** spike, burst and network-activity metrics computed the
  same way for every dataset.
- **Scale:** batch jobs on supercomputing resources so whole experiments run
  unattended.
- **Reporting:** standard figures and summary tables that researchers can compare
  across conditions.

## Why it matters

The pipelines supported research into neurodevelopmental disorders such as
autism and epilepsy, where consistent, comparable measurements across many
recordings are essential.

<!-- Add screenshots/figures in the `gallery:` front-matter field to show work samples. -->
