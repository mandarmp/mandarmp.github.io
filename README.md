# mandarmp.github.io

Personal site of Mandar Patil: portfolio, publications, career timeline and blog.
Design: clean academic layout (Source Serif 4 + Source Sans 3, navy accent) with subtle motion: scroll fade-ins, hover effects and a quiet animated signal trace. Light by default; dark follows the system or the toggle.
Built with Jekyll and deployed automatically by GitHub Pages. No build step is needed on your side.

## Structure

| What | Where | How to edit |
|---|---|---|
| Home page | `index.html` | Hero copy, stats, sections |
| Portfolio / work samples | `_work/*.md` | One Markdown file per project (see below) |
| Publications | `_data/publications.yml` | One entry per paper; wrap your name in `**` to highlight it |
| Timeline | `_data/timeline.yml` | One YAML entry per role, degree, paper or award |
| Blog posts | `_posts/YYYY-MM-DD-slug.md` | Copy `_drafts/post-template.md` |
| News (home page) | `_data/news.yml` | Short dated updates, newest first |
| Bio + skills | `index.html`, `_data/skills.yml` | |
| Name, email, socials, CV path | `_config.yml` → `author:` | |
| Styles / scripts | `assets/css/site.css`, `assets/js/site.js` | |

### Adding a work sample

Create `_work/my-project.md`:

```yaml
---
title: My Project
order: 6              # sort order on /work/
featured: true        # show on the home page
year: 2026
category: Machine Learning   # becomes a filter button
role: Lead developer
context: UC Davis
summary: One-sentence pitch.
cover: /assets/img/work/my-cover.png
stack: [Python, PyTorch]
metrics:                     # optional headline numbers
  - { value: "10×", label: "faster processing" }
links:
  - { label: View repository, url: "https://github.com/..." }
gallery:                     # optional work samples, opens in a lightbox
  - { src: /uploads/figure1.png, caption: "Raster plot of network bursts" }
---
Write the case study in Markdown here.
```

### Local preview

```bash
bundle install
bundle exec jekyll serve --livereload
```

## TODO: fill in before going live

Placeholders are written in `[square brackets]` and show up highlighted in amber
on the site. Find them all with `grep -rn "\[" _config.yml _data _work`.

- [ ] `_config.yml`: `phd_expected`, `location` (remote/relocation), `booking` (Calendly link, optional)
- [ ] Upload `uploads/Mandar_Resume.pdf` (1-page industry résumé) and `uploads/Mandar_CV.pdf`
- [ ] `_data/stats.yml`: the "[X TB] neural data processed" stat
- [ ] `_data/timeline.yml`: Bosch metrics (build-time reduction %, releases owned), UC Davis Health adoption numbers, `VERIFY` dates
- [ ] `_work/*.md`: `result` and `prototype_time` for each project, plus real figures/screenshots (`cover`, `gallery`)
- [ ] `_data/skills.yml`: confirm or delete the bracketed tools
- [ ] `_data/testimonials.yml`, `_data/talks.yml`: add entries (sections appear automatically)
- [ ] Ben-Shalom Lab figures: the lab site was unreachable from the build environment, so these are not copied yet. With your PI's OK, save them into `uploads/` and point `cover:` / `gallery:` at them:
  - `https://benshalomlab.com/images/research/meapipeline.png` → KCNT1 case study (`_work/hdmea-kcnt1.md`)
  - `https://benshalomlab.com/images/neuron11_cropped.gif` → MEA case study (`_work/mea-analysis.md`)
  - `https://benshalomlab.com/images/research/stim.png` → MEA stimulation figure
  - `https://benshalomlab.com/images/team/mandar.jpg` → alternative headshot
- [ ] `_work/hdmea-kcnt1.md`, `_work/neuron-modelling.md`: fill in your role and contribution
- [ ] `_drafts/`: finish the BCI-landscape and real-time-decoder posts
