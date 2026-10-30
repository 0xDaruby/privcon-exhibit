# Third-party notices

PrivCon Exhibit includes third-party software and a font. Their copyrights and licenses remain with the respective owners. See [LICENSES](LICENSES/README.md) for the collected notices and `package-lock.json` for exact package resolutions.

The copied frontend uses Next.js 16.3.3, React and React DOM 19.2.8, Motion 14.7.1, and PDF.js (`pdfjs-dist`) 6.4.299. Next.js, React, and Motion retain their MIT notices. PDF.js is Apache-2.0 and includes resources with their own notices, including the Liberation font GPL exception. Preserve the package's bundled font, CMap, ICC, and WASM notices when preparing runtime assets.

The Geist variable font is licensed under SIL OFL 1.1; its copyright and full license are in [LICENSES/Geist-OFL-1.1.txt](LICENSES/Geist-OFL-1.1.txt).

This is a static frontend exhibit. It does not include or distribute the Python, LibreOffice, PyMuPDF, or pdf2docx conversion engines from the full application. Build-time and optional npm packages are recorded in the lockfile and notice collection separately from the browser assets delivered to visitors.
