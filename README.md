# mandarmp.github.io

Personal site of Mandar Patil: portfolio, publications, career timeline and blog.
Design language: an electrophysiology "recording" (oscilloscope hero, channel labels, raster timeline). Dark by default, light chart-paper mode on toggle.
Built with Jekyll and deployed automatically by GitHub Pages. No build step is needed on your side.

## Structure

| What | Where | How to edit |
|---|---|---|
| Home page | `index.html` | Hero copy, stats, sections |
| Portfolio / work samples | `_work/*.md` | One Markdown file per project (see below) |
| Publications | `_data/publications.yml` | One entry per paper; wrap your name in `**` to highlight it |
| Timeline | `_data/timeline.yml` | One YAML entry per role, degree, paper or award |
| Blog posts | `_posts/YYYY-MM-DD-slug.md` | Copy `_drafts/post-template.md` |
| About + skills | `about/index.html`, `_data/skills.yml` | |
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

## TODO

- Upload `uploads/Mandar_CV.pdf` (the CV buttons link to it).
- Check the timeline dates marked `VERIFY` in `_data/timeline.yml`.
