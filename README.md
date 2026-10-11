# Her Dynasty · 她的千年

A Chinese-language interactive archive of women's stories across Chinese history. Follow their lives, decisions and works through a continuous painted handscroll, then explore biographies by era, identity or keyword.

The collection brings together rulers, poets, physicians, artists, merchants, maritime leaders, craftspeople, scholars and women whose names were not recorded. Paintings and objects support these stories with links to museum collections, historical texts and research.

## Explore the collection

- Eight era chapters, from early China through the Qing period.
- 32 story entries: 28 named biographies, two literary traditions and two anonymous group stories.
- 24 overlapping identity and experience categories, connecting politics, religion, science, arts, trade, labor, family and migration.
- 30 supporting artworks with original-image views, zoom controls, readings and references.
- Era and identity filters, full-text search, browser-local favorites and links to individual stories.
- A continuous handscroll with transparent figure illustrations, a paper palette, serif typography and vermilion accents.

## Download and preview

Download `her-dynasty-v1.0.0.zip` from the [v1.0.0 release](https://github.com/daoyi2026/her-dynasty/releases/tag/v1.0.0), extract it and open `index.html` in a modern browser. The release also includes a SHA-256 checksum for the download.

To serve a local preview from the extracted folder or a repository clone:

```sh
python3 -m http.server 4184 --bind 127.0.0.1 --directory .
```

Open http://127.0.0.1:4184/. No build step, account or backend is required. Favorites stay in the current browser. Reading the included material uses local assets; external references and the optional Google Fonts stylesheet require a connection. Installed Chinese serif fonts provide a fallback.

## Sources and interpretation

Each story lists references, and each artwork retains its attribution and surviving-object date. Biographies are organized by the women's lives; a later painting of an earlier subject keeps its own date. Shen Shou's life spans the late Qing and the Republic.

The handscroll uses source-based AI-assisted figure redraws as era illustrations. They are not identified portraits of the women in the biographies. Detail views retain the publicly available source images. Image resolution varies by institution.

This is a curated collection, not an exhaustive census. Category counts describe the stories included here. Historical women may have several identities, and coverage varies across eras, regions and social groups.

See [the source register](SOURCES.md) and open `sources.html` for further reading. Source links and attribution do not grant reuse rights; consult the relevant institution before redistributing its images.

## Repository guide

- `index.html`: the handscroll and biography archive.
- `stories-data.js`: biographies, identities, events, references and related objects.
- `women-data.js`: supporting artworks, source images and readings.
- `women.js`: browsing, search, dialogs, favorites and image controls.
- `style.css` and `women.css`: the Astra visual system and responsive layout.
- `sources.html`, `SOURCES.md` and `women-provenance.json`: source records.
- `DESIGN.md` and `VERIFICATION.md`: design principles and recorded checks.

Direct reading links include `index.html?person=yuxuanji` and `index.html?work=xiaojing`.
