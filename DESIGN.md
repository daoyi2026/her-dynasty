# Design continuity

- Visual system: Astra, with a continuous painted handscroll.
- Layout: broad horizontal masthead, left-aligned large title, right introductory note, continuous handscroll on two spindles, timeline, three-column biography archive, a collapsible identity index, three story paths, closing editorial panel.
- Color: paper `#eeece2`, light paper `#f5f2e9`, ink `#344035`, muted olive `#757967`, vermilion `#9d5141`, rule `#d0d0bf`.
- Typography: Noto Serif SC with installed Chinese serif fallbacks. Preserve Astra proportions and spacing; use slightly larger readable body text in expanded research sections.
- Images: unmodified museum images in detail views; transparent source-based AI-assisted figure redraws in the handscroll, with multiply blending and no rectangular masks. Redraws are explicitly distinguished from museum images and are not used as evidence for artifact details.
- Components: narrow outlined seals, vertical era annotations, light rules, no independent boxed cards in the handscroll.
- Seal correction: explicit two-line flex layout, fixed line height and no inherited writing mode; short secondary seals never wrap.

- Editorial hierarchy: era → people → actions and turning points → references. Images serve as evidence or era illustration. Identity filters are nonexclusive.
- Remove the redundant progress row; preserve the existing timeline and continuous scroll gestures.

## Responsive edition

- Keep desktop Astra composition, transparent figures, feathered edges and continuous landscape. The Song illustration now follows the central standing woman in the Palace Museum's Song painting *Women Admiring the Moon on a Terrace*. It remains an anonymous era illustration.
- Card display titles must be six Chinese characters or fewer. Use an explicit `cardTitle` for longer group labels; retain the complete `name` in the reader, accessible labels, references and search. Do not truncate a historical person's name automatically.
- All biography cards share fixed title, headline and reading-link rows: 384 px tall on desktop/tablet and 360 px on phones. Headlines preview two lines and summaries preview three; the reader retains the complete text.
- At 700 px and below, use a two-row masthead, a continuous touch scroll initially centered on the first era, a horizontally scrollable timeline and single-column stories. The identity index starts collapsed on phones and can be expanded.
- Phone readers use the full dynamic viewport with safe-area padding, 16 px body text, 44 px primary controls and a persistent close/save bar. Milestones start collapsed inside the phone reader and remain available on demand.
- Image zoom supports native single-finger scrolling plus two-finger scaling. Keep reduced-motion behavior and keyboard browsing.
- `responsive.css` owns these layout refinements; preserve the original `style.css` baseline.
