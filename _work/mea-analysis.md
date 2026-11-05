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
result: "[Cut analysis from ~X hours to Y minutes per experiment; adopted by N researchers across M studies]"
prototype_time: "[e.g. 3 weeks]"
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

## Result

- **Speed:** [analysis time per experiment went from ~X hours to Y minutes].
- **Adoption:** [used by N researchers across M studies], supporting research
  into autism and epilepsy.
- **Reliability:** every dataset is processed the same way, so results are
  comparable across experiments, cell lines and people.

<!-- Add screenshots/figures in the `gallery:` front-matter field to show work samples. -->
