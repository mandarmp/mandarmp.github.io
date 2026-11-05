---
title: "CoRLEGO: Modelling How Humans Reach"
order: 2
featured: true
year: 2025
category: Research
role: First author · modelling & analysis
context: Univ. of Birmingham · PeerJ 13 (2025)
summary: A neurobiologically plausible cognitive-robotics model that mimics how humans reach for a target among distractors, with a first-author paper in PeerJ.
cover: /assets/img/work/attention.svg
cover_alt: Target and distractor objects joined by a reach trajectory
stack: [Python, Computational modelling, Robotics, Parameter optimisation]
metrics:
  - { value: "1st author", label: "Peer-reviewed, PeerJ 2025" }
  - { value: "2 factors", label: "Proximity & similarity, separated in time" }
  - { value: "Open access", label: "CC BY · full text on PMC" }
links:
  - { label: Read the paper, url: "https://peerj.com/articles/18953/" }
  - { label: PDF, url: "https://peerj.com/articles/18953.pdf" }
---

## The question

How do humans reach for one target object in a cluttered scene? In a
*choice reaching task*, people reach for a single target among non-target
objects. Both **proximity** and **similarity** between objects (perceptual
grouping) are known to affect reach quality, but not *when* during the
movement each factor acts.

## What I did

- **Re-analysed the human reaching data** from an earlier empirical study.
- **Built CoRLEGO** (Choice Reaching with a LEGO arm robot): a
  neurobiologically plausible cognitive-robotics model that reproduces human
  reaches.
- **Optimised the model's parameters** against the human data so model and
  people can be compared directly.

## What we found

- Proximity and similarity both affected **movement onset**, but the **reach
  trajectory** was affected only by proximity. This suggests the brain applies
  these factors *serially*.
- The model architecture and fitted parameters suggest that **object proximity
  directly drives movement onset**.
- The model also suggests that the link between the two factors depends on
  how each participant **trades speed against accuracy**. That prediction is
  open for future experiments to test.

> Patil, M., Heinke, D. & Zhang, F. (2025). Computational modelling reveals the
> influence of object similarity and proximity on visually guided movements.
> *PeerJ*, 13.
