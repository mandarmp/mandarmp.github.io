---
title: Biophysical Neuron Modelling
order: 3
featured: true
year: 2022–2024
category: Computational Modelling
role: "[Your role, e.g. model fitting & optimisation pipeline]"
context: Ben-Shalom Lab, UC Davis Health
summary: Fitting detailed in silico neuron models to in vitro recordings to infer ion-channel properties, aiming at personalised therapies for channelopathies.
cover: /assets/img/work/neuron.webp
cover_alt: 3D reconstruction of a cortical pyramidal neuron showing the axon (red), basal dendrites (navy) and apical dendrite (teal)
stack: [Python, "[NEURON simulator]", Optimisation, HPC]
links:
  - { label: Ben-Shalom Lab research, url: "https://benshalomlab.com/research.html" }
result: "[e.g. Fitted models for N recorded neurons; optimisation runs X× faster on HPC]"
prototype_time: "[e.g. 6 weeks]"
---

## The problem

A neuron's behaviour is set by which ion channels it expresses and where, but
those are nearly impossible to measure directly. Channelopathies such as
some forms of epilepsy and autism change exactly these properties, so being able
to *infer* them from a recording is valuable for diagnosis and therapy design.

## Approach

- **Model:** a detailed, morphologically realistic neuron is described as a
  set of electrical circuits, with ion-channel densities and kinetics as
  parameters.
- **Fit:** an optimisation algorithm searches thousands of parameter
  combinations so the simulated neuron reproduces the voltage responses
  recorded experimentally.
- **Scale:** simulations run in parallel on high-performance computing so
  large parameter searches finish in practical time.
- **My contribution:** [describe your part: optimisation pipeline, channel
  models, simulation infrastructure, analysis].

## Result

- [Key outcome or metric.]
- The approach underpins the lab's work toward personalised models of
  channelopathies.

> Background adapted from the
> [Ben-Shalom Lab research page](https://benshalomlab.com/research.html).
> Cover: rendered from a neuron morphology reconstruction (Neurolucida ASC)
> in the lab's website repository.
