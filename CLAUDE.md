# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal website and blog (netoani.com) built with Gatsby 5 + React 19. It is based on the [Gatsby starter blog](https://github.com/gatsbyjs/gatsby-starter-blog). Package manager is Yarn (`.npmrc` disables `package-lock`, so don't create one). Use Node 24, which is pinned in `.node-version` and managed with fnm (`fnm use`). Gatsby 5 doesn't support Node 26 yet.

The site is deployed by Netlify, which builds every PR as a deploy preview. Netlify also reads `.node-version` to choose the Node version for the build.

## Commands

- `yarn`: install dependencies
- `yarn develop`: local dev server, with GraphiQL at `/___graphql`
- `yarn build`: production build into `public/`. It doesn't run Gatsby's development-mode lint check, so changes under `src/` should also be checked with `yarn develop`.
- `yarn serve`: serve the production build
- `yarn test`: runs `xo` (lint only; there are no unit tests). `npx xo --fix` auto-fixes. `npx xo <file>` lints a single file.

## Code style

xo 5 with `eslint-config-xo-react`, configured in `xo.config.mjs` (flat config). Use tabs (see `.editorconfig`), double quotes and trailing commas. The JSX runtime is automatic, so don't import React. Don't add `eslint-disable` comments for xo-specific rules in `src/` or `gatsby-browser.js`: `gatsby develop` lints them with its own ESLint setup, and comments naming rules it doesn't know fail the build. Add per-file overrides to `xo.config.mjs` instead.

## Architecture

- **Blog posts** are Markdown files at `content/blog/<slug>/index.md`, with frontmatter `title`, `date` (ISO timestamp) and `description`. Images go next to the post. Posts are processed by `gatsby-transformer-remark` and its remark plugins (images, prismjs highlighting, responsive iframes, smartypants), which are set up in `gatsby-config.js`.
- **Post page generation** happens in `gatsby-node.js`. `onCreateNode` adds a `slug` field from the file path. `createPages` creates a page at `/blog<slug>` for each post using `src/templates/blog-post.js`, and passes `previousPostId`/`nextPostId` for navigation. `createSchemaCustomization` defines the `SiteMetadata` and `Frontmatter` GraphQL types explicitly. A new frontmatter field must be added there before it can be queried.
- **Pages** in `src/pages/` (index, 404) are file-routed. Head tags are set with Gatsby's Head API: each page or template exports `Head`, which renders `src/components/seo.js`. The `<html lang>` is set in `gatsby-ssr.js`.
- **Styling** comes from typography.js (`src/utils/typography.js`, Fairy Gates theme; use `rhythm()` for spacing), inline style objects, and global CSS in `src/styles/main.css`. Fonts and the Prism theme are imported in `gatsby-browser.js`.
- **Site metadata** (title, social links) lives in `gatsby-config.js` and is read via GraphQL. The RSS feed (`/rss.xml`) is built from `allMarkdownRemark` in the same file.
- `static/` is copied as-is to the site root.
