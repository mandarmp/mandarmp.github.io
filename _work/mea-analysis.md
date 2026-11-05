---
title: HD-MEA Analysis Platform
order: 1
featured: true
year: 2022–present
category: Neural Data
role: Computational specialist → graduate student researcher
context: Ben-Shalom Lab, UC Davis
summary: A reusable analysis platform for high-density microelectrode array recordings, from raw voltage to spike-sorted units and network phenotypes, used across multiple disease models.
cover: /assets/img/work/raster.svg
cover_alt: Spike raster with synchronised network bursts and the population firing rate below (illustrative)
stack: [Python, NumPy, SpikeInterface, Kilosort, Phy, HPC]
metrics:
  - { value: "Thousands", label: "Of electrodes per chip, recorded in parallel" }
  - { value: "4 disease models", label: "CDKL5, KCNT1, prenatal folic acid, PPP2R5D" }
  - { value: "3 cell systems", label: "Mouse primary neurons, iPSC-derived neurons, organoids" }
links:
  - { label: View repository, url: "https://github.com/roybens/MEA_Analysis" }
  - { label: Ben-Shalom Lab research, url: "https://benshalomlab.com/research.html" }
result: "The lab's standard HD-MEA pipeline across 4 disease models (CDKL5, KCNT1, prenatal folic acid, PPP2R5D) and 3 cell systems."
gallery:
  - { src: /assets/img/work/mea.svg, caption: "Electrode-array activity map: a hotspot of neural activity across the chip (illustrative)" }
---

## The problem

High-density microelectrode arrays (HD-MEAs) record thousands of electrodes at
once from cultured neurons, organoids and brain slices. Every session produces
large, noisy datasets. With ad-hoc notebooks, results were hard to reproduce
and compare across experiments, cell lines, disease models and people.

## What I built

- **Ingestion & quality control:** a consistent path from raw recordings to
  filtered, quality-checked signals.
- **Spike sorting:** turning raw voltage into single-unit activity
  with SpikeInterface, Kilosort and Phy, plus custom methods.
- **Network phenotypes:** firing-rate, burst and synchrony metrics computed the
  same way for every dataset, so conditions can be compared directly.
- **Scale:** batch jobs on supercomputing resources so whole experiments run
  unattended.
- **Reporting:** standard figures and summary tables for comparing conditions.

## Where it has been used

The same pipeline runs across disease models and cell systems (mouse primary
neurons, human iPSC-derived neurons and cortical organoids):

- **CDKL5 deficiency disorder:** network activity in CDKL5 models.
- **KCNT1-related epilepsy:** network activity of gain-of-function mouse
  models ([preprint, 2025](https://doi.org/10.1101/2025.07.22.666003)).
- **Prenatal folic acid exposure:** cortical electrophysiology changes
  ([preprint, 2025](https://doi.org/10.1101/2025.05.07.652681)).
- **PPP2R5D intellectual disability:** cortical-like organoid models
  ([preprint, 2026](https://www.semanticscholar.org/paper/0b7e19b06aef3ee25ee4897791373bb39e1834b9)).

## Result

- **Standardised:** the lab's common analysis path for HD-MEA studies, from
  raw recordings to network phenotypes.
- **Breadth:** 4 disease models across 3 cell systems, contributing to 3
  preprints (2025–2026).
- **Reliability:** every dataset is processed the same way, so results are
  comparable across experiments, cell lines and disease models.
