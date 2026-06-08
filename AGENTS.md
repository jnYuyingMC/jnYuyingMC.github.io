# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Project Overview

Static HTML website for "大育英帝国 Minecraft 计划" (Da Yuying Empire Minecraft Project), hosted on GitHub Pages at `jnYuyingMC.github.io`. No build system, no bundler — pure HTML/CSS/JS served directly.

## Development

- **No build step.** Open `index.html` directly or use VS Code Live Server (port 5501, configured in `.vscode/settings.json`).
- All dependencies are CDN-loaded — no `npm install`, no local libraries.
- To preview changes locally, use any static file server (Live Server, `python -m http.server`, etc.).

## Architecture

### Pages (4 main)

| File | Role |
|------|------|
| `index.html` | Main page: Hero, About, Team, Timeline, Videos, Photos (single-page scroll) |
| `photo.html` | Photo gallery with GLightbox lightbox |
| `vr.html` | VR panorama hub (external links) |
| `credits.html` | Open-source dependency attribution |

### Dependencies (all CDN)

- **MDUI v2** (`unpkg.com/mdui@2`) — Material Design 3 Web Components (`<mdui-button>`, `<mdui-dialog>`, `<mdui-dropdown>`, etc.)
- **GLightbox** (`cdn.jsdelivr.net/npm/glightbox/`) — Image lightbox (index.html, photo.html)
- **Material Icons** — via Google Fonts CSS, used as `<mdui-icon name="xxx">`
- **Noto Sans SC** — Chinese font via Google Fonts

### Key Patterns

- **Dark mode**: Toggle `mdui-theme-dark` class on `<html>`. Persisted via `localStorage` key `theme-mode` (`light`/`dark`/`system`). The theme toggle script is duplicated independently in each of the 4 main HTML pages (not a shared module).
- **Navigation**: Fixed FAB bar (bottom-right) on all pages with Home/Photos/VR buttons. Fixed theme toggle dropdown (top-right).
- **Color scheme**: Primary teal `#00897b`, container `#a7f3d0`. Dark mode backgrounds `#121212`/`#1e1e1e`, footer `#0d1117`.
- **Responsive**: Media query at `max-width: 600px`. Grid layouts use `auto-fit`/`auto-fill` with `minmax()`.

## Editing Guidelines

- When adding features that span multiple pages, note that theme toggle, FAB navigation, and footer code are copy-pasted across all 4 main pages — update each one.
- CSS is inline in `<style>` tags per page. JS is inline in `<script>` tags per page.
- Icon names must match Material Icons `name` values (requires the Google Fonts CSS link).
- MDUI v2 components are Web Components — use `<mdui-*>` custom elements, not plain HTML.
- External links should include `open_in_new` icon for visual consistency.