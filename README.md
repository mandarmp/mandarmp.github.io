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

## Still to add (optional)

- **Résumé / CV:** add `uploads/Mandar_Resume.pdf` and `uploads/Mandar_CV.pdf`. The Résumé and CV
  buttons appear automatically once the files exist.
- **Booking link:** set `booking:` in `_config.yml` (e.g. a Calendly URL). "Get in touch" then becomes
  "Book a 20-min call".
- **Real figures:** replace the illustrative covers in `assets/img/work/` with real figures or
  screenshots (`cover:` / `gallery:` in `_work/*.md`). With your PI's OK, the Ben-Shalom Lab figures are at:
  - `https://benshalomlab.com/images/research/meapipeline.png` (HD-MEA case study)
  - `https://benshalomlab.com/images/neuron11_cropped.gif` (HD-MEA case study)
  - `https://benshalomlab.com/images/research/stim.png` (stimulation case study)
- **Stimulation results:** update `_work/hdmea-stimulation.md` when results are published.
- **Testimonials / talks:** add to `_data/testimonials.yml` and `_data/talks.yml`. The sections appear automatically.
- **Writing samples:** finish the outlines in `_drafts/` and move them to `_posts/`.

Placeholders written in `[square brackets]` are highlighted in amber on the site.
