---
title: ECoG Motor Imagery Classification
order: 3
featured: true
year: 2021
category: Machine Learning
role: ML engineer
context: Neuromatch Academy
summary: A complete ECoG motor-imagery ML pipeline, from preprocessing and feature engineering to robust model evaluation.
cover: /assets/img/work/ecog.svg
cover_alt: Stacked multichannel neural traces with a highlighted burst window
stack: [Python, scikit-learn, SciPy, Signal processing]
links:
  - { label: View repository, url: "https://github.com/mandarmp/nma_motor_imagery" }
result: "[Decoded imagined movements with X% held-out accuracy across N subjects]"
prototype_time: "[e.g. 2 weeks]"
---

## Goal

Decode imagined movements from electrocorticography (ECoG) recordings, a core
building block for brain–computer interfaces.

## Pipeline

1. **Preprocessing:** filtering, re-referencing and epoching around cues.
2. **Features:** band-power features in physiologically relevant frequency bands.
3. **Models:** linear and non-linear classifiers compared under cross-validation.
4. **Evaluation:** held-out validation designed to avoid optimistic leakage.

## Takeaways

Careful validation design matters as much as model choice. Leakage between
training and test epochs can easily inflate accuracy on neural data.
