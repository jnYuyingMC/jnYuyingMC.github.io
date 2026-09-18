# Project Status / 项目状态

## Current Release / 当前版本
v3.8.0 — 2026-09-18

## Architecture / 架构
Static GitHub Pages site with six HTML pages, shared CSS, and native ES modules. No build step or runtime backend.
纯静态 GitHub Pages 站点，包含六个 HTML 页面、共享 CSS 与原生 ES 模块，无构建步骤或运行时后端。

## Resource Delivery / 资源分发
- Catbox accelerator: gallery images, shared WebP background, hero logo, QR code, and construction-record video.
- ZStatic: MDUI 2.1.5 and GLightbox 3.3.1 with pinned URLs and SHA-384 SRI.
- Existing providers: Google Fonts, Umami, React, ReactDOM, Motion, and PlayCaptcha.
- Local: Open Graph JPG, favicon/PWA icons, GitHub icon, traditional favicon, and all rollback media copies.

## Verification / 验证
- `npm run check`
- Verify remote status/MIME, video byte ranges, and CDN SRI before release.
- Check all five MDUI pages in Chinese/English, light/dark themes, and desktop/mobile widths.

## Maintenance Notes / 维护说明
- Do not delete local media copies unless the owner explicitly changes the rollback policy.
- Do not mechanically replace jsDelivr `+esm` URLs with ZStatic; the URL semantics differ.
- Keep `unsupported.html` self-contained and dependency-free.
