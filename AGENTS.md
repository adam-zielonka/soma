# Soma — atlas emocji

Workspace: `/root/projekty/soma`. Public repository: `adam-zielonka/soma`.

## Development

- React, TypeScript, Vite, pnpm. `pnpm dev`, `pnpm check`.
- Polish and English interfaces. Saved manual language choice takes priority over the browser’s first supported language; unsupported preferences fall back to English. Keep translations complete, including body-region examples, map descriptions and accessible labels. Preserve keyboard support, textual map equivalents, reduced motion and mobile layouts.
- Body silhouettes and heatmaps are original SVG illustrations. No image-generation step is needed.
- Font files are bundled locally; avoid external runtime services and collecting personal health information.

## Scientific content

- Primary source: Nummenmaa et al. (2014), DOI `10.1073/pnas.1321664111`, especially Figure 2.
- Supporting context and the "other feelings" maps: Nummenmaa et al. (2018), DOI `10.1073/pnas.1807390115`, Figure 3. These maps recorded only where a feeling is felt; show them as "felt", never as increase or decrease.
- Maps "from later studies" (same increase/decrease method): Vik et al. (2026), DOI `10.1073/pnas.2534895123`, Figure 1A (hope); Zhang, Zerwas & Keltner (2025), DOI `10.1080/02699931.2024.2430400`, Figure 2 (amusement, interest, compassion; an area counts when clear in at least two of three groups). Replications cited on the page: Volynets et al. (2020), Herman et al. (2022).
- Every map names its source study (`source` in `src/emotions.ts`) and is cited next to its description.
- Maps are qualitative editorial interpretations, not digitized empirical data. Keep this distinction visible. Do not invent intensity scores or physiological measurements.
- Self-report patterns cannot diagnose emotions, illnesses or organ function. Avoid deterministic claims about where an emotion must appear.
- Any new factual interpretation needs verification against a primary source and an on-page citation.

## Publication

The user authorized commits, pushes to `main`, and production deployment to public GitHub Pages. Ordinary changes within this application may be committed and deployed directly after `pnpm check` passes.

GitHub Actions builds, tests, then deploys `dist`. Vite base path is `/soma/`. Verify the deployed page after changes. No server service or DNS change is needed.
