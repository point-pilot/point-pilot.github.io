# PointPilot project-page draft

Local project website for **PointPilot: Unified Robotic Manipulation via Object-Centric 3D Point Flow Prediction**.

The page is a static, responsive HTML/CSS/JavaScript site. It uses the September 25 manuscript (`Formatting_Instructions_for_ICLR_2027_Conference_Submissions (5).pdf`) as the content source. No frontend build or package installation is required.

## Preview

```sh
cd /NAS-NFS/yihanfang/point-pilot.github.io
python -m http.server 8765 --bind 127.0.0.1
```

Visit `http://localhost:8765`. For a remote IDE, forward port 8765 to your machine. Opening `index.html` directly also works for the page and its embedded result data.

## Contents

- Original transparent six-trajectories-per-stage conceptual illustration.
- Overview, architecture, real-world sequences, and geometric-ablation figures extracted directly from manuscript pages 2, 4, and 9. Inline images use optimized WebP; figure enlargement opens the original PNG.
- ARX and Piper simulation clips selected from successful local evaluation episodes (same seed, 100000). Original GIFs had no timing metadata; these are exported at 10 fps for visualization, not real-time playback.
- Interactive ALOHA / ARX / Piper comparison, retaining the seven-task Piper denominator and eight-task ALOHA / ARX denominator.
- LIBERO and RoboTwin tables, baseline-source qualifications, real-world trial counts, memory ablation, and scope limitations.
- Figure enlargement, accessible mobile menu, native video controls, and citation copying.

## Editing

| File | Purpose |
| --- | --- |
| `index.html` | Page copy, tables, links, citation, and embedded transfer data |
| `static/css/pointpilot.css` | Responsive layout and visual style |
| `static/js/pointpilot.js` | Result switching, menu, figure dialog, and citation copy |
| `static/data/transfer.json` | Editable copy of the Table 4 values; keep the `transfer-data` JSON in `index.html` in sync |
| `static/images/pointpilot/` | Paper figures, conceptual illustration, posters, and new favicon |
| `static/videos/pointpilot/` | The two simulation clips |
| `static/pdfs/pointpilot.pdf` | Current manuscript PDF |
| `ASSETS.json` | Local asset provenance, source pages, and rollout metadata |
| `preview/` | Ignored local review screenshots and browser-check report |

The original template's other CSS, JavaScript, images, and sample media remain in the repository but are not referenced by the new page.

## Items to finalize

1. Replace **Anonymous authors** with the confirmed author list, affiliations, and author links when appropriate. Current authorship reflects the provided anonymous draft.
2. Replace the bundled draft PDF with the intended public manuscript. It currently includes the draft's template disclosure sections.
3. Add the final arXiv/OpenReview URL and research-code repository when available. The code-release label currently has no fake destination; this website repository is not presented as the model-code release.
4. Confirm the two selected simulation clips for public presentation; higher-resolution exports and real-world videos can replace or supplement them.
5. Replace the provisional citation once publication metadata is finalized. No acceptance, DOI, or arXiv identifier is invented.
6. Recheck reported numbers and baseline settings if the manuscript changes. The page reproduces the draft and does not claim overall LIBERO state-of-the-art.

## GitHub Pages

Intended repository: `point-pilot/point-pilot.github.io`.
Intended URL: `https://point-pilot.github.io/`.

The current local work is on `draft/pointpilot-project-page`. Publish the reviewed changes to the configured publishing branch (currently the repository's default branch is `master`), then use **Settings → Pages → Deploy from a branch → master → /(root)**. `.nojekyll` is already present. All runtime assets use relative paths, so local previews and project-path hosting also work.

## Attribution

The repository originates from [Academic Project Page Template](https://github.com/eliahuhorwitz/Academic-project-page-template), which credits [Nerfies](https://nerfies.github.io/). Template attribution remains in the page footer. The website template is licensed under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). This attribution does not assert a license for the research paper, datasets, robot meshes, or model code.

## Validation

The draft was checked in Chromium at desktop and mobile sizes, including 320, 390, 768, and 1440 px widths. Checks cover local image/PDF loading, all embodiment averages and task denominators, benchmark switching, figure enlargement and Escape, clipboard copying, decoding/playback of both simulation clips, and opening the site directly from a local file. Review screenshots and the detailed check report are in `preview/`.
