# Verification — 2026-10-10 biography revision

## Browser checks recorded on 2026-10-10

- The site was served locally for browser validation.
- 32 story cards, 24 identity buttons and zero range sliders rendered.
- Religious-life filtering returns Yu Xuanji, Tang Sai'er and Wu Zetian after the final expansion. Earlier direct interaction confirmed Yu Xuanji's biography opens from this route.
- Art-patronage filtering and a combined Yuan/identity filter returned Sengge Lagi. Her three reference links rendered.
- Full-text query `月食` returned Wang Zhenyi. A nonexistent query displayed the empty state; reset restored all 32 entries.
- Ming chapter opened five stories; Tan Yunxian opened as a nested biography.
- Yu Xuanji's favorite persisted across reload. The test favorite was removed afterward.
- Yu Xuanji's related painting opened from her biography, zoom advanced to 150%, and closing nested dialogs returned to the underlying reader.
- The Female Classic of Filial Piety artwork has six substantive reading sections across its reading/research tabs.
- The original-image toggle changed the first scene to `assets/originals/qin.jpg`; the redraw mode restored `assets/figures/early.png`.
- At 390 x 844, the page and biography dialog had no horizontal overflow. Tan Yunxian and Yu Xuanji mobile layouts were visually inspected. Viewport override was reset.
- Desktop header seal text remained within its border. The identity index and longscroll were visually inspected.
- Sources page rendered 32 story entries, 30 image entries and 87 external reference links. A source-page biography deep link opened Yu Xuanji correctly.
- Browser warning/error log was empty during checked flows.

## File integrity and review

- Original Astra `style.css` SHA-256: `d52b924951ba45e39cc5fcecfb4d2c440726560c4d8f2a6e61ffaed358e19762`.
- Eight transparent figure files remained byte-identical to the preserved Astra illustration set.
- All 56 referenced local image files decoded successfully.
- Story data contains 98 narrative sections and 8,210 Chinese body characters, excluding summaries, event lists and image essays.
- Content counts: 28 named biographies, two qualified literary traditions and two group stories; 30 independent artworks.
- JavaScript syntax, record IDs, referenced works, local image hashes and source-register counts were checked.
- File-level differences were reviewed against the preserved baseline before the initial Git publication. Changes were limited to the biography layer, expanded supporting content, supplemental styles, source records and documentation.

## Scope and limits

- This is a curated first collection, not an exhaustive census. Coverage is uneven across eras; regional, occupational and unnamed-women histories remain expandable.
- Browser validation verifies rendered interactions and layout, not every external institution's current availability or scholarly consensus.
- Browser checks support the recorded interactions and layout, rather than every possible browser or device.

## Publication checks recorded on 2026-10-11

- The initial remote `main` commit was fetched and matched the local publication commit, with 73 tracked files.
- Website files and assets matched the delivered edition; the initial repository README adjusted local startup instructions.
- Publication documentation was revised to remove internal authoring paths and collaboration notes. The website's visual and interaction files were preserved.
- Tracked files, reachable commit content, commit metadata, image metadata and five preview captures were reviewed for credentials and private identifying data. No embedded credentials, private absolute paths or GPS metadata were found. An image certificate contact belongs to the public C2PA certificate authority and was retained.
- GitHub secret scanning and push protection were already enabled; the secret-scanning alert list was empty when checked.
