# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Project Overview

Static HTML website for "大育英帝国 Minecraft 计划" (Da Yuying Empire Minecraft Project), hosted on GitHub Pages at `jnYuyingMC.github.io`. No build system, no bundler — pure HTML/CSS/JS served directly.

## Development

- **No build step.** Open `index.html` directly or use VS Code Live Server (port 5501, configured in `.vscode/settings.json`).
- All runtime dependencies are CDN-loaded — no `npm install` needed to view the site. (Optional `package.json` provides lint/format devDependencies only.)
- To preview changes locally, use any static file server (Live Server, `python -m http.server`, etc.).
- **Lint/format**: `npm install` then `npm run check` (ESLint + Stylelint) or `npm run format` (Prettier). CI runs the same via `.github/workflows/check.yml`.
- **Tooling history**: iterations assisted by Claude Code / OpenCode (Xiaomi MiMo V2 Pro / V2.5 Pro, GLM-5.2).
- **Versioning**: Era-based SemVer. Original era (2017–2020) reached v2.1; the 2026 Remaster starts at v3.0.0. Rules: **major** = framework-level change (e.g. MDUI v1→v2), **minor** = new feature/page (e.g. bilingual support, new page), **patch** = bug fix, style tweak, content update. Version history is documented in `CHANGELOG.md` and displayed on `changelog.html`.

## Architecture

### Pages (5 main)

| File | Role |
|------|------|
| `index.html` | Main page: Hero, About, Team, Timeline, Videos, Photos (single-page scroll) |
| `photo.html` | Photo gallery with GLightbox lightbox |
| `vr.html` | VR panorama hub (external links) |
| `credits.html` | Open-source dependency attribution |
| `changelog.html` | Bilingual version history (legacy milestones + new-era SemVer entries) |
| `unsupported.html` | Browser compatibility warning (IE8+ self-contained, no ES Modules, no MDUI) |

### Dependencies (all CDN)

- **MDUI v2** (`unpkg.com/mdui@2`) — Material Design 3 Web Components (`<mdui-button>`, `<mdui-dialog>`, `<mdui-dropdown>`, etc.)
- **GLightbox** (`cdn.jsdelivr.net/npm/glightbox/`) — Image lightbox (index.html, photo.html)
- **Material Icons** — via Google Fonts CSS, used as `<mdui-icon name="xxx">`
- **Noto Sans SC** — Chinese font via Google Fonts
- **CDN strategy**: All pages use official CDNs (unpkg / jsDelivr / Google Fonts) loaded via static `<link>`/`<script>` tags in each page's `<head>`. No region switching. (Earlier `region.html` + BootCDN/fonts.font.im setup was removed.) CDN versions are pinned (`mdui@2.1.4`, `glightbox@3.3.1`) with SRI integrity hashes.

### Key Patterns

- **Dark mode**: Toggle `mdui-theme-dark` class on `<html>`. Persisted via `localStorage` key `theme-mode` (`light`/`dark`/`system`). Logic lives in the shared `js/theme.js` ES Module (imported by all 5 MDUI pages via `js/app.js`).
- **Navigation**: Fixed FAB bar (bottom-right) on all pages with Home/Photos/VR buttons. Fixed theme toggle and language toggle dropdowns (top-right).
- **Color scheme**: Primary teal `#00897b`, container `#a7f3d0`. Dark mode backgrounds `#121212`/`#1e1e1e`, footer `#0d1117`.
- **Responsive**: Media query at `max-width: 600px`. Grid layouts use `auto-fit`/`auto-fill` with `minmax()`.
- **Email hiding**: All emails are Base64-encoded in `data-email` attributes on `.email-reveal` buttons (anti-crawler). Clicking opens a PlayCaptcha claw-machine verification dialog (React 19 + Motion 12, lazy-loaded via importmap). On verify, the button is replaced with a real `mailto:` link. Logic in `js/email-captcha.js`.
- **Analytics**: Umami cookieless tracker on 5 MDUI pages via `defer` script in `<head>`. `unsupported.html` is not tracked.

## Editing Guidelines

- Theme toggle, language toggle (i18n), and footer are shared via `js/i18n.js` + `js/theme.js` + `js/site-ui.js` + `css/shared.css` — edit once, applies to all pages. Page-specific i18n dictionaries live in `js/i18n-<page>.js`.
- CSS is split into `css/shared.css` (common) + `css/<page>.css` (page-specific). JS is split into `js/` ES Modules + per-page inline `<script type="module">` for page-specific wiring.
- `unsupported.html` is intentionally self-contained (no ES Modules, no MDUI, IE8+ compatible) — do not convert it to the shared module pattern, and do not add Umami/email-captcha there.
- Icon names must match Material Icons `name` values (requires the Google Fonts CSS link).
- MDUI v2 components are Web Components — use `<mdui-*>` custom elements, not plain HTML.
- External links should include `open_in_new` icon for visual consistency.