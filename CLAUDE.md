# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal website and blog (netoani.com) built with Astro 7 as a fully static site (no client-side JavaScript). Package manager is npm, with a committed `package-lock.json`. Use Node 24, which is pinned in `.node-version` and managed with fnm (`fnm use`).

The site is deployed by Netlify, which builds every PR as a deploy preview. The build command and publish directory are set in `netlify.toml`, and Netlify reads `.node-version` to choose the Node version for the build.

## Commands

- `npm install`: install dependencies (`npm ci` for a clean install from the lockfile)
- `npm run dev`: local dev server
- `npm run build`: production build into `dist/`
- `npm run preview`: serve the production build
- `npm test`: runs `xo` (lint only; there are no unit tests). `npx xo --fix` auto-fixes. `npx xo <file>` lints a single file.

## Code style

xo 5 with `eslint-plugin-astro`, configured in `xo.config.mjs` (flat config), which also lints `.astro` files. Use tabs (see `.editorconfig`), double quotes and trailing commas.

## Architecture

- **Blog posts** are Markdown files at `content/blog/<slug>/index.md`, with frontmatter `title`, `date` (ISO timestamp) and `description`. They're loaded as the `blog` content collection, whose schema is in `src/content.config.js`. Helpers for sorting posts, building their URLs (`/blog/<slug>/`) and formatting dates are in `src/posts.js`.
- **Code highlighting** is done by Shiki at build time (configured in `astro.config.mjs`). Lines are highlighted by listing them in the code fence's meta, with a space after the language: ```` ```python {1,3-4} ````.
- **Pages** in `src/pages/` are file-routed: the index, `blog/[id].astro` for posts (with previous/next links), 404 and the RSS feed (`rss.xml.js`). They all use `src/layouts/Layout.astro`, which sets the head tags and the site header.
- **Styling** is global CSS in `src/styles/global.css` (ported from the typography.js theme the site used under Gatsby, with a 1.8rem vertical rhythm) plus scoped `<style>` blocks in components.
- **Site metadata** (title, author, social links) lives in `src/site.js`.
- `public/` is copied as-is to the site root. `public/sw.js` unregisters the service worker that an older version of the site installed, so keep it.
