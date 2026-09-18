# Site Resource Acceleration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Route large site media through the approved Catbox accelerator, move MDUI and GLightbox to ZStatic, upgrade MDUI to 2.1.5, and preserve the current static-site behavior and local rollback assets.

**Architecture:** Apply direct, pinned URL substitutions in the existing HTML and CSS rather than introducing a runtime CDN router. Large media uses Catbox acceleration, MDUI and GLightbox use ZStatic with exact SHA-384 SRI values, and small critical icons plus social preview assets remain local. Existing local media files remain untouched for manual rollback.

**Tech Stack:** Static HTML/CSS, native ES modules, MDUI 2.1.5, GLightbox 3.3.1, Catbox accelerator, ZStatic CDN, PowerShell verification, ESLint, Stylelint.

**Spec:** `docs/superpowers/specs/2026-09-18-site-acceleration-design.md`

## Global Constraints

- Do not delete, move, recompress, or modify any file under `images/` or `photolib/`.
- Keep `images/background.jpg`, `images/icon-180.png`, `images/icon-192.png`, `images/icon-512.png`, `images/github.png`, and `favicon.ico` locally referenced.
- Keep React 19.2.7, ReactDOM 19.2.7, Motion 12.42.2, PlayCaptcha 0.1.0, Google Fonts, and Umami on their current providers.
- Keep `unsupported.html` self-contained; do not add MDUI, ZStatic, Catbox, ES modules, or Umami to it.
- Use MDUI exactly `2.1.5` and GLightbox exactly `3.3.1`.
- Preserve `crossorigin="anonymous"` and exact SRI on every migrated MDUI and GLightbox stylesheet/script.
- Do not add a runtime fallback, Service Worker, build step, or CDN-selection UI.
- Treat the completed site change as v3.8.0 dated 2026-09-18.
- Keep `README.md` and `CHANGELOG.md` bilingual.
- Every commit must use the configured GPG signing key; if signing times out, stop and tell the user instead of disabling signing.

## File Structure and Responsibilities

- `index.html`: MDUI/GLightbox CDN URLs, CDN preconnects, background preload, hero/QR/video/gallery media URLs.
- `photo.html`: MDUI/GLightbox CDN URLs, CDN preconnects, background preload, full gallery media URLs.
- `vr.html`: MDUI CDN URLs, CDN preconnects, background preload.
- `credits.html`: MDUI CDN URLs, CDN preconnects, background preload.
- `changelog.html`: MDUI CDN URLs, CDN preconnects, background preload, v3.8.0 visible release card.
- `css/shared.css`: remote background used by shared page headers and surfaces.
- `css/index.css`: remote hero background.
- `js/i18n-changelog.js`: bilingual v3.8.0 release title/body and Codex attribution.
- `README.md`: bilingual acceleration summary and current CDN strategy.
- `CHANGELOG.md`: canonical bilingual v3.8.0 release entry.
- `translations-review.md`: review rows for new changelog translation keys.
- `AGENTS.md`: current dependency versions and hosting strategy for future agents.
- `docs/PROJECT_STATUS.md`: concise current architecture, delivery strategy, version, rollback boundary, and verification commands.

---

### Task 1: Upgrade MDUI and migrate public UI dependencies to ZStatic

**Files:**
- Modify: `index.html:17-39,340-341`
- Modify: `photo.html:17-39,184-185`
- Modify: `vr.html:17-38,167`
- Modify: `credits.html:17-38,215`
- Modify: `changelog.html:17-38,353`

**Interfaces:**
- Consumes: existing static `<link>` and `<script>` dependency declarations.
- Produces: pinned ZStatic URLs with browser-enforced SHA-384 integrity for MDUI 2.1.5 and GLightbox 3.3.1.

- [ ] **Step 1: Add a failing static regression check for legacy dependency URLs**

Run this PowerShell assertion before editing:

```powershell
$pages = @('index.html', 'photo.html', 'vr.html', 'credits.html', 'changelog.html')
$legacy = rg -n 'https://unpkg\.com/mdui@2\.1\.4|https://cdn\.jsdelivr\.net/npm/glightbox@3\.3\.1' $pages
if ($LASTEXITCODE -eq 0) {
  $legacy
  throw 'Legacy MDUI or GLightbox CDN references remain.'
}
```

- [ ] **Step 2: Confirm the regression check fails for the expected reason**

Expected: the command prints ten MDUI 2.1.4 references and four GLightbox jsDelivr references, then throws `Legacy MDUI or GLightbox CDN references remain.`

- [ ] **Step 3: Replace MDUI declarations on all five MDUI pages**

Use these exact declarations:

```html
<link rel="preconnect" href="https://s4.zstatic.net" crossorigin>
<link rel="stylesheet" href="https://s4.zstatic.net/npm/mdui@2.1.5/mdui.css" integrity="sha384-ut/hfzOW6boH2zfGcGWiW1JpbmJlAs7VC030JLRmIgQm4nz16aNSKe2EhyYXG/g8" crossorigin="anonymous">
<script type="module" src="https://s4.zstatic.net/npm/mdui@2.1.5/mdui.global.js" integrity="sha384-dCE1ZRK9CHG2EYQ6pNNHvlPH5Y0FC6f3p2S7TuGx1oe5CCdL4XpSUa6kgFz+c5Qc" crossorigin="anonymous"></script>
```

Place the preconnect beside the existing Google Fonts preconnect. Replace, rather than duplicate, the existing MDUI stylesheet and script declarations.

- [ ] **Step 4: Replace GLightbox declarations on `index.html` and `photo.html`**

Use these exact declarations:

```html
<link rel="stylesheet" href="https://s4.zstatic.net/ajax/libs/glightbox/3.3.1/css/glightbox.min.css" integrity="sha384-GPAzSuZc0kFvdIev6wm9zg8gnafE8tLso7rsAYQfc9hAdWCpOcpcNI5W9lWkYcsd" crossorigin="anonymous">
<script src="https://s4.zstatic.net/ajax/libs/glightbox/3.3.1/js/glightbox.min.js" integrity="sha384-MZZbZ6RXJudK43v1qY1zOWKOU2yfeBPatuFoKyHAaAgHTUZhwblRTc9CphTt4IGQ" crossorigin="anonymous" onload="window.dispatchEvent(new Event('glightbox-loaded'))"></script>
```

Keep the existing `onload` event exactly so the page-specific initializer continues to work.

- [ ] **Step 5: Run the static regression check and verify it passes**

Re-run Step 1. Expected: no output and no exception.

Then verify exact new-reference counts:

```powershell
$mduiCss = (rg -o 's4\.zstatic\.net/npm/mdui@2\.1\.5/mdui\.css' index.html photo.html vr.html credits.html changelog.html | Measure-Object).Count
$mduiJs = (rg -o 's4\.zstatic\.net/npm/mdui@2\.1\.5/mdui\.global\.js' index.html photo.html vr.html credits.html changelog.html | Measure-Object).Count
$lightboxCss = (rg -o 's4\.zstatic\.net/ajax/libs/glightbox/3\.3\.1/css/glightbox\.min\.css' index.html photo.html | Measure-Object).Count
$lightboxJs = (rg -o 's4\.zstatic\.net/ajax/libs/glightbox/3\.3\.1/js/glightbox\.min\.js' index.html photo.html | Measure-Object).Count
if ($mduiCss -ne 5 -or $mduiJs -ne 5 -or $lightboxCss -ne 2 -or $lightboxJs -ne 2) {
  throw "Unexpected CDN reference counts: MDUI CSS=$mduiCss JS=$mduiJs; GLightbox CSS=$lightboxCss JS=$lightboxJs"
}
```

Expected: command exits successfully with counts 5, 5, 2, and 2.

- [ ] **Step 6: Recompute SRI from the final response bytes**

```powershell
$expected = [ordered]@{
  'https://s4.zstatic.net/npm/mdui@2.1.5/mdui.css' = 'ut/hfzOW6boH2zfGcGWiW1JpbmJlAs7VC030JLRmIgQm4nz16aNSKe2EhyYXG/g8'
  'https://s4.zstatic.net/npm/mdui@2.1.5/mdui.global.js' = 'dCE1ZRK9CHG2EYQ6pNNHvlPH5Y0FC6f3p2S7TuGx1oe5CCdL4XpSUa6kgFz+c5Qc'
  'https://s4.zstatic.net/ajax/libs/glightbox/3.3.1/css/glightbox.min.css' = 'GPAzSuZc0kFvdIev6wm9zg8gnafE8tLso7rsAYQfc9hAdWCpOcpcNI5W9lWkYcsd'
  'https://s4.zstatic.net/ajax/libs/glightbox/3.3.1/js/glightbox.min.js' = 'MZZbZ6RXJudK43v1qY1zOWKOU2yfeBPatuFoKyHAaAgHTUZhwblRTc9CphTt4IGQ'
}
$client = [System.Net.Http.HttpClient]::new()
$sha = [System.Security.Cryptography.SHA384]::Create()
try {
  foreach ($entry in $expected.GetEnumerator()) {
    $bytes = $client.GetByteArrayAsync($entry.Key).GetAwaiter().GetResult()
    $actual = [Convert]::ToBase64String($sha.ComputeHash($bytes))
    if ($actual -ne $entry.Value) { throw "SRI mismatch for $($entry.Key): $actual" }
  }
} finally {
  $sha.Dispose()
  $client.Dispose()
}
```

Expected: no output and exit code 0.

- [ ] **Step 7: Commit the dependency migration**

```powershell
git add -- index.html photo.html vr.html credits.html changelog.html
git commit -S -m "perf: serve UI dependencies from ZStatic"
```

Expected: a signed commit containing only the five HTML files.

---

### Task 2: Route approved media through the Catbox accelerator

**Files:**
- Modify: `index.html:23,79,169,217,234-291`
- Modify: `photo.html:23,89-146`
- Modify: `vr.html:22`
- Modify: `credits.html:22`
- Modify: `changelog.html:22`
- Modify: `css/shared.css:30`
- Modify: `css/index.css:17`

**Interfaces:**
- Consumes: the approved local-to-remote media mapping in the design specification.
- Produces: direct Catbox accelerator URLs in HTML/CSS while preserving every local source file.

- [ ] **Step 1: Add a failing static regression check for migrated local references**

```powershell
$targets = @('index.html', 'photo.html', 'vr.html', 'credits.html', 'changelog.html', 'css/shared.css', 'css/index.css')
$legacyMedia = rg -n 'photolib/|images/(background\.webp|logo\.webp|qrcode\.webp)' $targets
if ($LASTEXITCODE -eq 0) {
  $legacyMedia
  throw 'Local references remain for media selected for acceleration.'
}
```

- [ ] **Step 2: Confirm the regression check fails for the expected reason**

Expected: matches appear for the background preload/CSS, hero logo, QR code, construction video, and gallery images; the command throws `Local references remain for media selected for acceleration.`

- [ ] **Step 3: Add Catbox connection hints and replace the shared background preload**

On `index.html`, `photo.html`, `vr.html`, `credits.html`, and `changelog.html`, add this beside the ZStatic and Google Fonts preconnects:

```html
<link rel="preconnect" href="https://catbox.pengcyril.dpdns.org">
```

On the same five pages, replace the existing background preload with:

```html
<link rel="preload" href="https://catbox.pengcyril.dpdns.org/klplcm.webp" as="image">
```

- [ ] **Step 4: Replace the two CSS background URLs**

In both `css/shared.css` and `css/index.css`, use:

```css
background: url('https://catbox.pengcyril.dpdns.org/klplcm.webp') center/cover no-repeat;
```

Do not change any other background property or selector.

- [ ] **Step 5: Replace primary media on `index.html`**

Apply these exact replacements to every matching `src` or `href`:

| Existing path | Replacement URL |
| --- | --- |
| `images/logo.webp` | `https://catbox.pengcyril.dpdns.org/bakvem.webp` |
| `images/qrcode.webp` | `https://catbox.pengcyril.dpdns.org/z3ulih.webp` |
| `photolib/2017-7-13-video.mp4` | `https://catbox.pengcyril.dpdns.org/uoi1tz.mp4` |
| `photolib/yuying.webp` | `https://catbox.pengcyril.dpdns.org/3eqqol.webp` |
| `photolib/snow.webp` | `https://catbox.pengcyril.dpdns.org/q8577m.webp` |
| `photolib/4K-garden.webp` | `https://catbox.pengcyril.dpdns.org/k2c1a5.webp` |
| `photolib/4K-4.webp` | `https://catbox.pengcyril.dpdns.org/xj6zxn.webp` |
| `photolib/4K-3.webp` | `https://catbox.pengcyril.dpdns.org/lhe353.webp` |
| `photolib/2017-07-31.webp` | `https://catbox.pengcyril.dpdns.org/8gsplv.webp` |
| `photolib/2017-07-27.webp` | `https://catbox.pengcyril.dpdns.org/1cyqon.webp` |
| `photolib/2017-07-21.webp` | `https://catbox.pengcyril.dpdns.org/bvdz6u.webp` |
| `photolib/2017-07-19.webp` | `https://catbox.pengcyril.dpdns.org/qmzidr.webp` |
| `photolib/2017-07-14.webp` | `https://catbox.pengcyril.dpdns.org/qrg7jc.webp` |
| `photolib/2017-07-13.webp` | `https://catbox.pengcyril.dpdns.org/lg0u51.webp` |
| `photolib/2017-07-13 (2).webp` | `https://catbox.pengcyril.dpdns.org/qui6j1.webp` |
| `photolib/2017-07-13 (3).webp` | `https://catbox.pengcyril.dpdns.org/ppjilq.webp` |
| `photolib/2017-07-14 (2).webp` | `https://catbox.pengcyril.dpdns.org/70m0vj.webp` |
| `photolib/2017-07-11.webp` | `https://catbox.pengcyril.dpdns.org/y3jnex.webp` |

Keep all existing `alt`, `loading`, `data-gallery`, `data-desc`, and i18n attributes unchanged.

- [ ] **Step 6: Replace gallery media on `photo.html`**

Apply the same fifteen `photolib/*.webp` mappings from Step 5 to both each thumbnail `src` and its corresponding GLightbox `href`. Do not add the video, logo, or QR mappings to this page.

- [ ] **Step 7: Run static reference and preservation checks**

Re-run Step 1. Expected: no output and no exception.

Then confirm the deliberately local references and all rollback files still exist:

```powershell
$requiredLocal = @(
  'images/background.jpg', 'images/icon-180.png', 'images/icon-192.png',
  'images/icon-512.png', 'images/github.png', 'favicon.ico',
  'photolib/4K-3.webp', 'photolib/4K-4.webp', 'photolib/4K-garden.webp',
  'photolib/2017-07-11.webp', 'photolib/2017-07-13 (2).webp',
  'photolib/2017-07-13 (3).webp', 'photolib/2017-07-13.webp',
  'photolib/2017-07-14 (2).webp', 'photolib/2017-07-14.webp',
  'photolib/2017-07-19.webp', 'photolib/2017-07-21.webp',
  'photolib/2017-07-27.webp', 'photolib/2017-07-31.webp',
  'photolib/2017-7-13-video.mp4', 'photolib/snow.webp', 'photolib/yuying.webp',
  'images/background.webp', 'images/logo.webp', 'images/qrcode.webp'
)
$missing = $requiredLocal | Where-Object { -not (Test-Path -LiteralPath $_) }
if ($missing) { throw "Missing rollback files: $($missing -join ', ')" }
rg -n 'images/background\.jpg|images/icon-(180|192|512)\.png|images/github\.png' *.html manifest.json
```

Expected: `$missing` is empty, and the final `rg` shows local OG, favicon/PWA, and GitHub icon references.

- [ ] **Step 8: Validate all remote media responses and video seeking**

```powershell
$assets = [ordered]@{
  'https://catbox.pengcyril.dpdns.org/lhe353.webp' = 'image/webp'
  'https://catbox.pengcyril.dpdns.org/xj6zxn.webp' = 'image/webp'
  'https://catbox.pengcyril.dpdns.org/k2c1a5.webp' = 'image/webp'
  'https://catbox.pengcyril.dpdns.org/y3jnex.webp' = 'image/webp'
  'https://catbox.pengcyril.dpdns.org/qui6j1.webp' = 'image/webp'
  'https://catbox.pengcyril.dpdns.org/ppjilq.webp' = 'image/webp'
  'https://catbox.pengcyril.dpdns.org/lg0u51.webp' = 'image/webp'
  'https://catbox.pengcyril.dpdns.org/70m0vj.webp' = 'image/webp'
  'https://catbox.pengcyril.dpdns.org/qrg7jc.webp' = 'image/webp'
  'https://catbox.pengcyril.dpdns.org/qmzidr.webp' = 'image/webp'
  'https://catbox.pengcyril.dpdns.org/bvdz6u.webp' = 'image/webp'
  'https://catbox.pengcyril.dpdns.org/1cyqon.webp' = 'image/webp'
  'https://catbox.pengcyril.dpdns.org/8gsplv.webp' = 'image/webp'
  'https://catbox.pengcyril.dpdns.org/q8577m.webp' = 'image/webp'
  'https://catbox.pengcyril.dpdns.org/3eqqol.webp' = 'image/webp'
  'https://catbox.pengcyril.dpdns.org/klplcm.webp' = 'image/webp'
  'https://catbox.pengcyril.dpdns.org/bakvem.webp' = 'image/webp'
  'https://catbox.pengcyril.dpdns.org/z3ulih.webp' = 'image/webp'
  'https://catbox.pengcyril.dpdns.org/uoi1tz.mp4' = 'video/mp4'
}
$client = [System.Net.Http.HttpClient]::new()
try {
  foreach ($entry in $assets.GetEnumerator()) {
    $request = [System.Net.Http.HttpRequestMessage]::new([System.Net.Http.HttpMethod]::Head, $entry.Key)
    $response = $client.SendAsync($request).GetAwaiter().GetResult()
    $type = $response.Content.Headers.ContentType.MediaType
    if (-not $response.IsSuccessStatusCode -or $type -ne $entry.Value) {
      throw "$($entry.Key) returned $([int]$response.StatusCode) $type; expected 200 $($entry.Value)"
    }
    $request.Dispose()
    $response.Dispose()
  }
} finally {
  $client.Dispose()
}
curl.exe -sS --max-time 30 -r 0-1023 -D - -o NUL https://catbox.pengcyril.dpdns.org/uoi1tz.mp4
```

Expected: every HEAD request succeeds with its declared MIME. The range request returns `206 Partial Content`, `Content-Range: bytes 0-1023/36847854`, and `Content-Length: 1024`.

- [ ] **Step 9: Confirm no media was deleted and commit**

```powershell
$deleted = git diff --name-status | Select-String '^D\s'
if ($deleted) { $deleted; throw 'Unexpected deleted files.' }
git add -- index.html photo.html vr.html credits.html changelog.html css/shared.css css/index.css
git commit -S -m "perf: serve large media from Catbox accelerator"
```

Expected: a signed commit with five HTML and two CSS files, and no deleted media.

---

### Task 3: Publish the v3.8.0 documentation and project status

**Files:**
- Modify: `README.md`
- Modify: `CHANGELOG.md`
- Modify: `changelog.html:84-96`
- Modify: `js/i18n-changelog.js:1-25,89-115`
- Modify: `translations-review.md`
- Modify: `AGENTS.md`
- Create: `docs/PROJECT_STATUS.md`

**Interfaces:**
- Consumes: completed dependency/media URLs and validation results from Tasks 1-2.
- Produces: matching developer-facing and visitor-facing bilingual documentation for v3.8.0.

- [ ] **Step 1: Add a failing release-documentation check**

```powershell
$required = @{
  'README.md' = 'Catbox|ZStatic|2\.1\.5'
  'CHANGELOG.md' = 'v3\.8\.0'
  'changelog.html' = 'v3\.8\.0 · 2026-09-18'
  'js/i18n-changelog.js' = 'changelog\.v20260918\.(title|body)'
  'translations-review.md' = 'changelog\.v20260918'
  'AGENTS.md' = 'mdui@2\.1\.5|ZStatic'
  'docs/PROJECT_STATUS.md' = 'v3\.8\.0'
}
foreach ($entry in $required.GetEnumerator()) {
  if (-not (Test-Path -LiteralPath $entry.Key) -or -not (Select-String -Path $entry.Key -Pattern $entry.Value -Quiet)) {
    throw "Missing v3.8.0 documentation in $($entry.Key)"
  }
}
```

- [ ] **Step 2: Confirm the documentation check fails**

Expected: failure begins with `Missing v3.8.0 documentation in ...`; multiple files do not yet contain the release information and `docs/PROJECT_STATUS.md` does not exist.

- [ ] **Step 3: Update `README.md` bilingually**

Add a “What’s New” item describing:

```markdown
- **资源加速 / Resource Acceleration**: 大图、背景、Logo、二维码与施工视频改用 Catbox 加速域名；MDUI 2.1.5 与 GLightbox 3.3.1 改由 ZStatic 分发并保留 SRI，本地媒体继续保留用于回滚 / Large images, backgrounds, logo, QR code, and construction video now use the Catbox accelerator; MDUI 2.1.5 and GLightbox 3.3.1 are distributed through ZStatic with SRI, while local media remains available for rollback
```

Update the dependency/notes text so it no longer claims every dependency uses only official unpkg/jsDelivr CDNs. State the exact hybrid strategy and keep both languages together.

- [ ] **Step 4: Promote `[Unreleased]` work into a canonical v3.8.0 entry in `CHANGELOG.md`**

Keep the empty heading `## [Unreleased] / 未发布`, then insert:

```markdown
## v3.8.0 — 2026-09-18 — Resource Acceleration / 资源加速

Assisted by Codex. 由 Codex 辅助完成。

- Migrated fifteen gallery images, the shared background, hero logo, QR code, and construction-record video to the Catbox accelerator while retaining every local source file for rollback / 将十五张图库图片、共享背景、首页 Logo、二维码和施工纪录视频迁移至 Catbox 加速域名，同时保留全部本地源文件用于回滚
- Kept the Open Graph image, favicon/PWA icons, GitHub icon, and legacy favicon locally hosted to avoid adding third-party failure points for small critical assets / Open Graph 图片、favicon/PWA 图标、GitHub 图标与传统 favicon 继续本地托管，避免小型关键资源增加第三方故障点
- Upgraded MDUI 2.1.4 to 2.1.5 and migrated MDUI and GLightbox delivery to ZStatic with pinned versions and verified SHA-384 SRI / 将 MDUI 2.1.4 升级至 2.1.5，并将 MDUI 与 GLightbox 迁移至 ZStatic，保持固定版本和经验证的 SHA-384 SRI
- Added Catbox/ZStatic preconnect hints and updated the shared background preload to reduce connection setup latency / 新增 Catbox/ZStatic 预连接提示并更新共享背景预加载，降低连接建立延迟
- Added the resource-acceleration design specification, implementation plan, and current project status documentation / 新增资源加速设计规范、实施计划与当前项目状态文档
```

Remove the existing design-only bullet from `[Unreleased]` because it is now represented by the v3.8.0 documentation bullet.

- [ ] **Step 5: Add the v3.8.0 visitor-facing changelog card and dictionary entries**

Insert a new first card under the 2026 Remaster section in `changelog.html`:

```html
<div class="changelog-card">
  <div class="changelog-card-header">
    <span class="changelog-version">v3.8.0 · 2026-09-18</span>
    <span class="type-badge type-badge-changed" data-i18n="changelog.badge.changed">变更</span>
  </div>
  <h3 data-i18n="changelog.v20260918.title">资源加速</h3>
  <div class="changelog-model" data-i18n="changelog.model.codex">由 Codex 辅助完成。</div>
  <div class="changelog-body" data-i18n-html="changelog.v20260918.body"></div>
</div>
```

Add these exact keys to both languages in `js/i18n-changelog.js`:

```javascript
// zh
'changelog.model.codex': '由 Codex 辅助完成。',
'changelog.v20260918.title': '资源加速',
'changelog.v20260918.body': '<ul><li>十五张图库图片、共享背景、首页 Logo、二维码和施工纪录视频改用 Catbox 加速域名，同时保留全部本地文件用于回滚</li><li>Open Graph 图片、favicon/PWA 图标、GitHub 图标与传统 favicon 继续本地托管</li><li>MDUI 由 2.1.4 升级至 2.1.5；MDUI 与 GLightbox 改由 ZStatic 分发，保持固定版本与 SHA-384 SRI</li><li>新增 Catbox/ZStatic 预连接提示并更新共享背景预加载</li></ul>',

// en
'changelog.model.codex': 'Assisted by Codex.',
'changelog.v20260918.title': 'Resource Acceleration',
'changelog.v20260918.body': '<ul><li>Moved fifteen gallery images, the shared background, hero logo, QR code, and construction-record video to the Catbox accelerator while retaining all local files for rollback</li><li>Kept the Open Graph image, favicon/PWA icons, GitHub icon, and legacy favicon locally hosted</li><li>Upgraded MDUI from 2.1.4 to 2.1.5 and moved MDUI and GLightbox delivery to ZStatic with pinned versions and SHA-384 SRI</li><li>Added Catbox/ZStatic preconnect hints and updated the shared background preload</li></ul>',
```

- [ ] **Step 6: Update translation review, agent guidance, and project status**

In `translations-review.md`, add rows for:

```text
changelog.model.codex
changelog.v20260918.title
changelog.v20260918.body
```

Each row must show the exact Chinese and English values from Step 5.

In `AGENTS.md`, update MDUI to `2.1.5` and replace the old official-CDN-only statement with the approved hybrid delivery boundary. Do not alter unrelated behavioral instructions.

Create `docs/PROJECT_STATUS.md` with these bilingual sections:

```markdown
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
```

- [ ] **Step 7: Run the release-documentation check and lint**

Re-run Step 1. Expected: no exception.

Then run:

```powershell
npm run check
git diff --check
```

Expected: ESLint and Stylelint exit 0; `git diff --check` reports no whitespace errors.

- [ ] **Step 8: Commit the release documentation**

```powershell
git add -- README.md CHANGELOG.md changelog.html js/i18n-changelog.js translations-review.md AGENTS.md docs/PROJECT_STATUS.md
git commit -S -m "docs: document v3.8.0 resource acceleration"
```

Expected: a signed documentation commit with no media files.

---

### Task 4: Run full static and browser acceptance

**Files:**
- Verify: all files changed in Tasks 1-3
- Verify: unchanged local files under `images/` and `photolib/`

**Interfaces:**
- Consumes: completed v3.8.0 implementation and documentation.
- Produces: evidence that the release is lint-clean, visually intact, remotely reachable, and rollback-safe.

- [ ] **Step 1: Install locked development dependencies if needed**

```powershell
if (-not (Test-Path node_modules)) { npm ci }
```

Expected: install uses `package-lock.json` and exits 0. Do not change `package.json` or `package-lock.json`.

- [ ] **Step 2: Run all automated checks**

```powershell
npm run check
git diff --check
$oldRefs = rg -n 'https://unpkg\.com/mdui@2\.1\.4|https://cdn\.jsdelivr\.net/npm/glightbox@3\.3\.1|photolib/|images/(background\.webp|logo\.webp|qrcode\.webp)' index.html photo.html vr.html credits.html changelog.html css/shared.css css/index.css
if ($LASTEXITCODE -eq 0) { $oldRefs; throw 'Legacy accelerated references remain.' }
$deleted = git diff HEAD~3 --name-status | Select-String '^D\s'
if ($deleted) { $deleted; throw 'The implementation deleted tracked files.' }
```

Expected: lint and whitespace checks pass, the legacy-reference assertion has no matches, and there are no deleted tracked files across the three implementation commits.

- [ ] **Step 3: Start a visible local preview server**

In a visible PowerShell terminal, run:

```powershell
python -m http.server 5501
```

Expected: the terminal remains visible and reports requests. Open `http://localhost:5501/index.html` in the browser.

- [ ] **Step 4: Check shared behavior on every MDUI page**

Visit `index.html`, `photo.html`, `vr.html`, `credits.html`, and `changelog.html`. On each page verify:

- The background renders without a broken-image flash.
- MDUI components upgrade and respond; browser console has no SRI, CORS, module, or custom-element errors.
- Language switching updates visible copy and persists after navigation.
- Light, dark, and system themes work and persist after navigation.
- FAB links navigate to Home, Photos, and VR.
- The old-site confirmation dialog opens and cancels without navigation.
- Desktop width and a viewport at or below 600 px have no horizontal overflow or control overlap.

- [ ] **Step 5: Check page-specific interactions**

On `index.html`:

- Hero background and logo load from Catbox.
- QR code loads, opens its dialog by click, and opens via Enter/Space keyboard input.
- All fifteen gallery thumbnails load; opening at least the first, middle, and last items shows the full image in GLightbox.
- Bilibili and YouTube selections still switch correctly.
- “施工纪录” loads the remote MP4, plays, pauses, and seeks to a later timestamp.
- Switching away from the local video pauses it.

On `photo.html`:

- All fifteen thumbnails load.
- GLightbox opens, loops, closes, and preserves translated descriptions after changing language.

On `changelog.html`:

- v3.8.0 is the first 2026 Remaster card in both Chinese and English.

- [ ] **Step 6: Inspect network responses for the critical path**

Using browser developer tools, reload `index.html` with cache disabled once and confirm:

- MDUI CSS/JS and GLightbox CSS/JS return 200 from `s4.zstatic.net`.
- The background, logo, and gallery images return 200 from `catbox.pengcyril.dpdns.org`.
- No request is made to local `images/background.webp`, `images/logo.webp`, `images/qrcode.webp`, or `photolib/*` paths.
- No duplicate background download is caused by a preload URL mismatch.

- [ ] **Step 7: Review the final repository state**

```powershell
git status --short
git log -4 --show-signature --oneline
git diff HEAD~3 --stat
git diff HEAD~3 --name-status
```

Expected: the working tree is clean; the three implementation commits show valid signatures; changed files match Tasks 1-3; there are no deleted files.

- [ ] **Step 8: Record fixes only if acceptance found a defect**

If browser acceptance required a correction, rerun the failing check plus `npm run check`, then commit only the correction:

```powershell
git add -- index.html photo.html vr.html credits.html changelog.html css/shared.css css/index.css js/i18n-changelog.js README.md CHANGELOG.md translations-review.md AGENTS.md docs/PROJECT_STATUS.md
git commit -S -m "fix: correct v3.8.0 acceleration regression"
```

If no correction was needed, do not create an empty commit. Report the automated and browser evidence in the task handoff.
