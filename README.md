# PrivCon Exhibit

A hosted, interactive exhibit of [PrivCon](https://github.com/0xDaruby/Priv-Con), the local-first document toolbox. Open the deployed site to explore the current interface without installing the conversion backend.

This repository contains a standalone copy of the current PrivCon frontend, including the toolbox, theme toggle, document options, and watermark workspace. It was extracted on October 30, 2026 from the working frontend, including local changes newer than the original repository's published commit. It has its own history and deployment; changes here do not automatically sync to the original app.

## Try it

Choose a tool and use its built-in sample, or select a file on your device to explore staging and applicable previews. Follow the simulated progress and result screens. All conversion results are demonstrations: this exhibit does not convert your selected document.

Selected files and generated samples stay in browser memory. The exhibit has no conversion server, account, document storage, analytics, or file-upload transport. Local PDF rendering uses bundled PDF.js assets. The browser still requests the website's HTML, scripts, styles, fonts, and assets from its host.

For real conversion, follow the setup instructions in the [original PrivCon repository](https://github.com/0xDaruby/Priv-Con).

## Develop locally

Use Node.js 22.18 or later and npm:

```sh
npm ci
npm run dev
```

Open the local address printed by Next.js. No environment variables or Python dependencies are needed.

```sh
npm run lint
npm run typecheck
npm test
npm run build
```

## Deploy on Vercel

Import this repository into Vercel with the repository root as the project root. The configuration builds and serves a static frontend. No API URL, credentials, conversion backend, or document storage is required.

Deployments are snapshots of this repository. To update from the main app, copy and review the intended frontend changes, retain this repository's demo adapter and privacy restrictions, and run the checks above before deploying.

## License and source

Copyright (c) 2026 David. PrivCon-authored code is licensed under **AGPL-3.0-only**, inherited from the original project. See [LICENSE](LICENSE), [third-party notices](THIRD_PARTY_NOTICES.md), and [collected notices](LICENSES/README.md). The earlier MIT notice is preserved for code originally released under those terms. Third-party code and fonts retain their respective licenses.

The exhibit interface links to its source repository. Vercel deployments identify the Git commit used to build the site; that commit contains the preferred source and build configuration for the corresponding exhibit.

This software is provided without warranty. The AGPL permits use, modification, and redistribution subject to its terms.
