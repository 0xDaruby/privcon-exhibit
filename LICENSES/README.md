# Collected third-party notices

These notices were copied from PrivCon's frontend dependency notice collection on October 30, 2026. They preserve upstream notices rather than replacing them with the application license.

- `Geist-OFL-1.1.txt`: the local Geist variable font, SIL Open Font License 1.1.
- `PrivCon-legacy-MIT.txt`: PrivCon's historical MIT grant.
- `GPL-3.0.txt`: full GPL text retained for applicable bundled resource notices.
- `npm/`: collected notices for the frontend packages and their bundled code, including PDF.js and Motion. Some packages are build dependencies or platform-specific optional dependencies; their presence in this notice collection does not mean their binaries are delivered to site visitors.

The application AGPL-3.0-only text is in `../LICENSE`. The lockfile records the exact npm dependency resolution. PDF.js runtime assets are prepared from that package by `scripts/prepare-pdfjs.mjs`; its packaged notices are retained.

No Python, LibreOffice, or backend conversion engine is part of this exhibit.
