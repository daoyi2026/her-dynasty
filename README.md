# Her Thousand Years — Astra edition

A Chinese-language static archive centered on women's historical biographies, with era illustrations in the approved Astra continuous handscroll.

## Baseline and preservation

Baseline paths below identify the original authoring workspace; they are not directories in this repository.

Visual source: `work/baselines/hanfu-v2`, as matched to the user's screenshot. The original Astra `style.css` and all eight approved transparent figures are unchanged. This revision was compared with `work/baselines/women-astra-v2-before-expansion`. Do not continue from the Gemini variant or overwrite an earlier archive.

## Preview

```sh
python3 -m http.server 4184 --bind 127.0.0.1 --directory .
```

Open http://127.0.0.1:4184/. No build step is required. Direct file opening is also supported. Fonts fall back to installed Chinese serif fonts when Google Fonts is unavailable.

## Content model

- 32 story entries in eight era chapters: 28 named biographies, two explicitly qualified literary traditions, and two anonymous group stories.
- 24 nonexclusive identity/experience categories. The same person can appear in multiple categories; counts describe this collection, not a census of historical women.
- `stories-data.js`: people, identities, narrative sections, dated events, sources and related objects.
- `women-data.js`: 30 supporting artworks, original images and detailed readings. Original-image details remain accessible from story material links and `sources.html#images`.
- People are placed by their lives; artworks retain their own surviving-object dates. Shen Shou spans late Qing and the Republic.
- The scroll figures are era illustrations, not identified portraits of the named women.
- The redundant scroll progress row has been removed. Dragging, keyboard scrolling and the dynasty timeline remain.

## Interaction

Era and identity filtering, full-text search, native nested reading dialogs, original-image zoom/pan, and browser-local favorites. Favorites use `women-stories-saved-v1`; earlier painting and Hanfu collections are untouched. URLs support `?person=yuxuanji` and `?work=xiaojing` for direct reading.

## Scope

Coverage is curated and uneven across periods. The current selection does not exhaust the histories of every polity, region, class, ethnic group or occupation. Each story lists its sources; objects retain attribution and copying dates. Museum image previews vary in resolution.

See `SOURCES.md`, `women-provenance.json` and `VERIFICATION.md` for source and validation records.
