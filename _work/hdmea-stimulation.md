---
title: Controlling Neuronal Firing with HD-MEA Stimulation
order: 2
featured: true
year: 2025–present
category: Neurostimulation
role: Protocol design, closed-loop control, experiments & analysis
context: Ben-Shalom Lab, UC Davis
summary: Open- and closed-loop electrical stimulation on high-density microelectrode arrays to activate neurons at single-cell and network level, then measure how circuits respond.
cover: /assets/img/work/stim.svg
cover_alt: Stimulation electrode on an array with spreading activation, a pulse train, and evoked spikes aligned to each pulse (illustrative)
stack: [Python, MaxWell MaxOne / MaxTwo HD-MEA, MaxLab Python API, Signal processing]
links:
  - { label: Ben-Shalom Lab research, url: "https://benshalomlab.com/research.html" }
result: "Ongoing PhD project: open- and closed-loop stimulation protocols, experiments and analysis pipeline built end to end."
---

## Why it matters

Recording tells you what a neural circuit is doing. **Stimulation lets you ask
it questions.** Delivering precise electrical pulses through the same
high-density array used for recording makes it possible to activate chosen
neurons, drive or adjust network firing, and measure the response. It is the
same read–write loop at the core of brain–computer interfaces and
neuromodulation devices.

## Approach

- **Targeted activation:** controlled pulses or bursts delivered at single
  electrodes to evoke action potentials in specific neurons.
- **Network control:** stimulation patterns that raise or lower network
  firing rates.
- **Response analysis:** evoked spikes aligned to each pulse (raster and
  peri-stimulus histograms), with stimulation artefacts handled before spike
  detection.
- **Applications:** probing excitability, connectivity and plasticity in
  brain-derived cultures, including disease models.
- **Closed-loop control:** stimulation that adapts to ongoing neural activity
  in real time, the same principle used in responsive neuromodulation and BCIs.
- **My contribution:** end to end. I design the stimulation protocols, build
  the closed-loop control, run the recording and stimulation experiments, and
  develop the analysis pipeline (artefact removal, evoked-response detection,
  raster and PSTH analysis).

## Status

Ongoing PhD project. Results will be added here as they are published.

> Project background from the
> [Ben-Shalom Lab research page](https://benshalomlab.com/research.html).
> Cover figure is illustrative.
