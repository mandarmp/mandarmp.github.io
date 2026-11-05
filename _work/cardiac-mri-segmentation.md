---
title: Cardiac MRI Image Segmentation
order: 4
featured: false
year: 2021
category: Medical Imaging
role: Developer
context: MSc project
summary: Segmentation workflows for cardiac MRI data, enabling structured quantitative analysis and downstream automation.
cover: /assets/img/work/cardiac.svg
cover_alt: Concentric contours with a highlighted segmentation boundary
stack: [Python, Image processing, NumPy]
links:
  - { label: View repository, url: "https://github.com/mandarmp/Cardiac-MRI-IMAGESEG" }
gallery:
  - { src: /uploads/Labelled_Sinus_of_Valsalva_aneurysm.jpg, caption: "Labelled cardiac MRI slice (aorta, right atrium, left ventricle)" }
result: "[e.g. Dice score of X on held-out scans; Y× faster than manual delineation]"
prototype_time: "[e.g. 4 weeks]"
---

## Overview

Manual delineation of cardiac structures is slow and varies between people.
This project built a segmentation workflow that extracts anatomical regions from
MRI slices so they can be measured consistently.

## Approach

- Pre-processing and intensity normalisation of MRI slices.
- Segmentation of key structures, with masks exported for quantitative analysis.
- Visual QA overlays to check results against the anatomy.
