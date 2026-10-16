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

## Responsive refinement checked on 2026-10-16

- Started from published `main` at `4de5c32`. The Astra base `style.css` retains the SHA-256 recorded above.
- Replaced the Song era's spinning-worker display illustration with a transparent source-based redraw of the central standing woman in the Palace Museum's *Women Admiring the Moon on a Terrace*. The museum source identifies the painting as Song. The original artwork record and the spinning women's biography remain available.
- Compared parsed records with the preceding commit: all 32 complete biographies and all 30 artwork records are unchanged. Two groups have explicit short display titles; the maximum card title is six Chinese characters. Full names remain in the reader and accessible labels, and the short titles participate in search.
- In Chrome 155 at 320×740, 360×800, 390×844, 430×932, 768×1024, 1024×768 and 1440×900, the page had no horizontal overflow and no clipped card names. Every biography card measured 360 px tall on phones and 384 px tall on larger screens. Reading-link positions matched within each layout. Desktop and phone screenshots were visually inspected.
- Checked the Song chapter's three-column desktop cards and single-column phone cards. All four cards had matching dimensions and reading-link positions. The complete eight-character group name fit inside the 320 px phone reader.
- The phone identity index and biography milestones start collapsed and expand on demand. The full-screen reader and its 44 px close/save controls were checked at 320 px; the artwork tabs remain directly below the 65 px sticky bar while scrolling. At 844×390, the reader fits the landscape viewport without horizontal overflow.
- Followed era → biography → original image → zoom and closed nested readers back to the underlying content. Zoom controls reached 150%. A two-touch event sequence with doubled separation reached 200% and prevented native gesture handling; this checks the gesture listener, not a physical device's touch stack.
- Dragged the continuous scroll by 200 px from Song toward Yuan: the era changed, the drag state cleared and no detail dialog opened accidentally. The left arrow key returned to Song. The original-image switch selected `dpm-228755.jpg` and restored `song-moon.webp` correctly.
- Favorites survived reload; the test favorite was removed and the removal persisted. Searching the new six-character group label returned the full group biography. The mobile sources page rendered 62 entries without horizontal overflow.
- Checked JavaScript syntax, unique IDs, local HTML/image references, all eight figure-manifest hashes, and the new 1024×1536 PNG's transparent corners. No page errors were recorded in the checked flows. Reviewed the final changes for private local paths and machine-specific identifiers.
- These are local Chrome browser checks. Physical iPhone/Android devices, Safari-specific rendering and real two-finger input were not available for direct verification.
- A first deployment screenshot was taken before the PNG had fully downloaded; `naturalWidth > 0` was insufficient to establish readiness. Final image checks wait for `complete`, successful `decode()` and paint before capturing the page.
- Encoded eight lossless WebP display copies. Their dimensions, every alpha value and every visible RGB pixel match the retained PNGs. Total figure transfer size fell from 14,528,338 to 6,638,200 bytes (54.3%). Both source and display hashes are recorded. This is a format conversion, with no additional figure redraw.
