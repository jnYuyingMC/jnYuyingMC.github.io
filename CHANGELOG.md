# Changelog

## v3.7.0 — 2026-07-05 — Email Hiding & PlayCaptcha / 邮箱隐藏与抓娃娃验证

Assisted by OpenCode (GLM-5.2). 由 OpenCode (GLM-5.2) 辅助完成。

- All email addresses across the site are now hidden by default; replaced plaintext `mailto:` links with `.email-reveal` buttons storing Base64-encoded addresses in `data-email` (anti-crawler) / 全站邮箱默认隐藏，明文 mailto 链接替换为 .email-reveal 按钮，邮箱地址以 Base64 编码存入 data-email 属性（防爬虫）
- Clicking an email-reveal button opens an MDUI dialog with a PlayCaptcha claw-machine verification (React 19 + Motion 12 + playcaptcha@0.1.0, lazy-loaded via importmap only on first click) / 点击显示邮箱按钮弹出 MDUI 对话框，内嵌 PlayCaptcha 抓娃娃机人机验证（React 19 + Motion 12 + playcaptcha@0.1.0，通过 importmap 懒加载，仅首次点击时加载约 300KB）
- On successful verification, the button is replaced with a real `<a href="mailto:">` link revealing the decoded email / 验证通过后按钮替换为真实的 mailto 链接，显示解码后的邮箱
- Added `js/email-captcha.js` shared module (lazy-loads React/ReactDOM/Motion/playcaptcha, mounts React root into dialog, handles verify + reveal) / 新增 js/email-captcha.js 共享模块（懒加载 React/ReactDOM/Motion/playcaptcha，挂载 React root 到对话框，处理验证与揭示）
- Added `importmap` to all 5 MDUI pages' `<head>` mapping `react`, `react/jsx-runtime`, `react-dom`, `react-dom/client`, `motion/react` to jsDelivr CDN ESM URLs / 5 个 MDUI 页面 head 添加 importmap，映射 react 系列 + motion/react 到 jsDelivr CDN ESM URL
- Added i18n keys: `email.reveal`, `captcha.title/loading/cancel/error` (zh/en) / 新增 i18n 键
- Added `.email-reveal` button styles (dotted underline, teal color, footer variant) to `css/shared.css` / shared.css 添加 .email-reveal 按钮样式
- Captcha dialog responsive scaling: dynamic `zoom` calculated from `window.innerHeight`/`innerWidth` on the `.captcha-container` element, fitting the 708px-tall claw-machine into 75% of viewport height (mobile address bar safe) / 验证码对话框响应式缩放：根据 window.innerHeight/innerWidth 动态计算 zoom 并应用到 .captcha-container，将 708px 高的抓娃娃机适配到视口高度的 75%（兼容手机地址栏）
- Updated `js/i18n-changelog.js` v3.2.1 entry to mask plaintext email as `[邮箱已隐藏]` / i18n-changelog.js v3.2.1 条目的邮箱明文替换为 [邮箱已隐藏]
- Added 3 new dependency cards to `credits.html`: PlayCaptcha (MIT, github.com/mortspace/playcaptcha), React 19 (MIT, react.dev), Motion 12 (MIT, motion.dev); updated `js/i18n-credits.js` + `translations-review.md` with new keys / credits.html 新增 3 张依赖卡片：PlayCaptcha、React 19、Motion 12（均 MIT 协议）；i18n-credits.js + translations-review.md 同步

## v3.6.0 — 2026-07-03 — Refactoring, Bugfixes, SEO & Tooling / 重构、Bug 修复、SEO 与工程化

Assisted by OpenCode (GLM-5.2). 由 OpenCode (GLM-5.2) 辅助完成。

- Removed region selection page (`region.html`), Mainland China CDN config, and unused `js/cdn-loader.js`; all pages now use the official CDN directly (unpkg / jsDelivr / Google Fonts) / 移除地区选择页、国内 CDN 配置及未使用的 cdn-loader.js，全部页面统一使用官方 CDN
- Replaced dynamic per-page CDN injection scripts with static `<link>`/`<script>` tags in `index.html` / `photo.html` / `vr.html` / `credits.html`, eliminating duplicated loader logic / 各页面动态 CDN 注入脚本替换为静态标签，消除重复加载逻辑
- Removed region toggle button from FAB navigation on all 4 pages and dropped `fab.region` i18n key / 4 页 FAB 移除地区切换按钮，删除 fab.region 翻译键
- Deleted `region.html`, `css/region.css`, `js/cdn-loader.js` / 删除相关文件
- Fixed video audio leak: switching video sources now clears Bilibili/YouTube iframe `src` to stop playback / 修复视频切换音频泄漏：切换视频源时清空 Bilibili/YouTube iframe src 停止播放
- Fixed `heading=` → `headline=` typo on the GitHub VR compatibility dialog in `vr.html` so i18n (`data-i18n-headline`) applies correctly; the card, dialog, and the GitHub VR link are kept as-is — the link is an absolute path `/vrview/examples/yuying/index.html` referencing the separate `jnYuyingMC/vrview` repository's GitHub Pages (cross-repo slash reference), not a relative path / 修复 vr.html GitHub VR 兼容性弹窗的 heading→headline 拼写错误使 i18n 生效；卡片、弹窗及 GitHub VR 链接保持原样——该链接为绝对路径 /vrview/examples/yuying/index.html，指向独立 jnYuyingMC/vrview 仓库的 GitHub Pages（跨仓库斜杠引用），非相对路径
- Added missing `class="theme-dropdown"` to credits.html theme dropdown so menu width matches other pages / credits.html 主题下拉补齐 theme-dropdown class，菜单宽度与其它页一致
- Removed orphaned `vr.github.*` and `dialog.github.*` i18n keys from `js/i18n-vr.js` / 清理 i18n-vr.js 中孤立的 github 翻译键
- Updated `README.md`: removed region selection What's New entry, refreshed file structure table (dropped `region.html`/`region.css`/`cdn-loader.js`/`CLAUDE.md`, added `AGENTS.md`/`translations-review.md`, updated line counts) / 更新 README：删除地区选择条目，刷新文件结构表
- Updated `AGENTS.md`: pages 4→5 (added `unsupported.html`), corrected dark-mode/CSS/JS descriptions to reflect shared modules, documented unified official CDN strategy (BootCDN/fonts.font.im removed) / 更新 AGENTS.md：页面 4→5，修正主题/CSS/JS 描述为共享模块，记录统一官方 CDN 策略
- Cleaned `translations-review.md`: deleted region.html section and orphaned `vr.github.*`/`dialog.github.*` rows / 清理 translations-review.md：删除 region.html 区块及孤立 github 翻译行
- Added GLM-5.2 to README development attribution alongside MiMo V2 Pro / V2.5 Pro / README 开发说明并列追加 GLM-5.2
- Pinned CDN versions: `mdui@2` → `mdui@2.1.4`, `glightbox` → `glightbox@3.3.1` across all 4 MDUI pages / 钉死 CDN 版本，所有页面统一
- Added SRI `integrity` hash + `crossorigin="anonymous"` to all CDN resources (`mdui.css`, `mdui.global.js`, `glightbox.min.css`, `glightbox.min.js`) for supply-chain integrity / 为所有 CDN 资源添加 SRI 完整性校验
- Appended GLM-5.2 to `footer.builtWith` model attribution (12 places: 4 i18n files × 2 langs + 4 HTML fallbacks); updated `translations-review.md` footer rows to include OpenCode + GLM-5.2 / 页脚技术栈模型署名追加 GLM-5.2（12 处），translations-review 页脚行同步补充 OpenCode + GLM-5.2

### SEO & Accessibility / SEO 与可访问性

- Added `<meta name="description">` + Open Graph + Twitter Card tags to all 5 pages (i18n-driven `data-i18n-content` on MDUI pages, static on `unsupported.html`) / 全站 5 页添加 meta description 与 OG/Twitter Card 标签
- Extended i18n engine (`js/i18n.js`): new `data-i18n-content` and `data-i18n-aria-label` attribute handlers; `data-i18n-title` now mirrors to `aria-label` so icon-only buttons are screen-reader friendly / i18n 引擎扩展：新增 content/aria-label 处理，title 自动镜像到 aria-label
- Added `lang.toggleTitle` key + `data-i18n-title` to language toggle button (was hardcoded "Language") / 语言切换按钮补 i18n
- GLightbox now stores instance to `window._lightbox` and rebuilds on language switch so image descriptions follow the active language / GLightbox 切语言时重建，图片描述跟随语言
- Generated 180/192/512px PNG icons from `logo.png` (center-cropped) + `manifest.json` + `apple-touch-icon` / `icon` / `manifest` link tags on all 5 pages / 从 logo 生成多尺寸图标与 manifest.json，5 页添加现代 favicon 标签
- Converted all 15 photos in `photolib/` to WebP (quality 85; PNG ~85–97% smaller, JPG ~46–89% smaller) and updated `index.html` / `photo.html` references; deleted originals. Total `photolib/` size dropped from ~43 MB to ~5.5 MB / 将 photolib 全部 15 张照片转为 WebP，体积缩减 85–97%，更新引用并删除原图，总大小从 ~43 MB 降至 ~5.5 MB

### Engineering / 工程化

- Added lint/format config: `.eslintrc.json`, `.prettierrc`, `.stylelintrc.json`, and `package.json` with `lint` / `lint:css` / `format` / `check` scripts / 添加 lint/格式化配置与 package.json 脚本
- Added `.github/workflows/check.yml`: ESLint + Stylelint on `js/` and `css/`, plus lychee link check across HTML/JS/MD (non-blocking) / 添加 GitHub Actions 校验工作流
- Updated `AGENTS.md` Development section with lint instructions and tooling history / AGENTS.md 开发段补充 lint 说明与工具链历史
- Converted `images/background.jpg` (1562 KB) to WebP (123 KB) for CSS `background` + `<link rel="preload">` on all 5 pages; kept `.jpg` original for `og:image` / `twitter:image` meta tags (social platform WebP compatibility) / 将 images/background.jpg 转 WebP 供 CSS 和 preload 使用，保留 .jpg 原图供 og:image/twitter:image（社交平台兼容性）
- Converted `images/logo.png` (857 KB → 105 KB WebP, deleted original) and `images/qrcode.jpg` (48 KB → 24 KB WebP, deleted original); updated index.html references; `icon-*.png` and `github.png` kept as PNG (apple-touch-icon/manifest compatibility, brand icon) / 将 logo.png 和 qrcode.jpg 转 WebP 并删除原文件，更新引用；icon-*.png 和 github.png 保留 PNG 不转
- Added Umami privacy-friendly analytics tracker (`cloud.umami.is`) to 5 MDUI pages via `defer` script in `<head>` after `browser-check.js`; `unsupported.html` kept self-contained / 5 个 MDUI 页面 head 添加 Umami 无 cookie 隐私分析追踪器（defer 脚本，browser-check.js 之后），unsupported.html 保持自包含
- Created `changelog.html` page with bilingual (zh/en) version history: 7 legacy milestones (2017–2020, summarized from Original branch commits) + 12 new-era entries (2026-04-01 ~ 2026-07-03, from CHANGELOG.md); card-based layout styled after credits.html, legacy cards distinguished by left teal border; new files `css/changelog.css` + `js/i18n-changelog.js`; updated `translations-review.md` with changelog section / 新建 changelog.html 更新日志页，双语，旧版 7 里程碑（2017–2020，从 Original 分支 commit 归纳）+ 新版 12 条目（2026-04-01 ~ 2026-07-03，取自 CHANGELOG.md）；仿 credits.html 卡片布局，旧版卡片左侧 teal 竖线区分；新增 css/changelog.css 与 js/i18n-changelog.js；translations-review.md 同步

## v3.5.0 — 2026-06-08 — Region Selection & CDN Switching (deprecated) / 地区选择与 CDN 切换 (deprecated)

Assisted by OpenCode (Xiaomi MiMo V2.5 Pro). 由 OpenCode (Xiaomi MiMo V2.5 Pro) 辅助完成。

- Created `region.html` region selection page with two options: Global and Mainland China / 新建地区选择页面，支持"国际"和"中国内地"两个选项
- Region selection supports bilingual (Chinese/English) with language auto-detection / 地区选择支持双语，自动检测浏览器语言
- Global mode uses unpkg, jsDelivr, Google Fonts CDN / 国际模式使用 unpkg、jsDelivr、Google Fonts CDN
- Mainland China mode uses BootCDN and fonts.font.im for better accessibility / 中国内地模式使用 BootCDN 和 fonts.font.im 加速
- Image preload (`images/background.jpg`) disabled in China mode to improve load speed / 中国内地模式禁用图片预加载以提升加载速度
- Region choice persisted via `localStorage('site-region')` / 地区选择通过 localStorage 持久化
- First-time visitors without region setting auto-redirect to region.html / 首次访问无地区设置时自动跳转至地区选择页
- Added region toggle button (globe icon) to FAB navigation on all pages / 所有页面 FAB 导航添加地区切换按钮
- Created `css/region.css` for region page styling / 新建地区选择页样式文件
- Updated `translations-review.md` with region page translations / 更新翻译审校表

## v3.4.1 — 2026-05-28 — Translation Corrections / 翻译修正

Assisted by Claude Code (Xiaomi MiMo V2.5 Pro). 由 Claude Code (Xiaomi MiMo V2.5 Pro) 辅助完成。

- Corrected English translations in i18n dictionaries / 修正 i18n 字典中的英文翻译

## v3.4.0 — 2026-05-28 — Frontend Refactoring & Accessibility / 前端重构与可访问性改进

Assisted by Claude Code (Xiaomi MiMo V2.5 Pro). 由 Claude Code (Xiaomi MiMo V2.5 Pro) 辅助完成。

### Code Deduplication / 代码去重

- Extracted ~954 lines of duplicated CSS/JS across 4 HTML pages into shared modules / 将 4 个 HTML 页面中约 954 行重复的 CSS/JS 代码提取为共享模块
- Created `css/` directory with `shared.css` (common styles) + 4 page-specific CSS files / 创建 `css/` 目录，含 `shared.css` 公共样式及 4 个页面专属样式文件
- Created `js/` directory with ES Modules: `browser-check.js`, `i18n.js` (engine + shared dict), `theme.js`, `site-ui.js`, `app.js`, and 4 page-specific i18n dictionaries / 创建 `js/` 目录，使用 ES Modules：浏览器检测、i18n 引擎与共享字典、主题切换、共享 UI、入口编排器及 4 个页面翻译文件
- Each page's inline `<script>` reduced from ~330 lines to ~30 lines (page-specific logic only) / 各页面内联脚本从约 330 行降至约 30 行
- HTML file sizes reduced by 64–69%: `index.html` 1077→385, `photo.html` 516→170, `vr.html` 516→159, `credits.html` 538→164 / HTML 文件体积缩减 64–69%
- i18n `applyLanguage` function consolidated: now uniformly handles all 6 `data-i18n-*` attribute types across all pages (previously inconsistent) / i18n applyLanguage 函数统一：现在所有页面一致处理全部 6 种 data-i18n 属性类型

### Accessibility / 可访问性

- Added skip-to-content links on all 4 main pages (WCAG 2.4.1) / 全站 4 页添加"跳至主要内容"链接
- Added `rel="noopener noreferrer"` to all `target="_blank"` links (35 occurrences across 8 files) / 所有外链添加 noopener noreferrer（35 处）
- Added `aria-hidden="true"` to photo overlay divs to prevent duplicate screen reader announcements (30 occurrences) / 图片遮罩添加 aria-hidden 防止屏幕阅读器重复朗读（30 处）
- Added `lang="zh"` / `lang="en"` to language menu items for correct screen reader pronunciation / 语言菜单项添加 lang 属性确保屏幕阅读器正确发音
- Added `role="button"`, `tabindex="0"`, and keyboard handler (Enter/Space) to QR code image / QR 码图片添加按钮角色、tab 索引和键盘事件
- Added meaningful `title` attributes to video iframes / 视频 iframe 添加有意义的 title 属性

### Performance / 性能

- Added `<link rel="preload" href="images/background.jpg" as="image">` on all pages for LCP optimization / 全站添加背景图预加载优化 LCP
- Added `font-display=swap` to Material Icons Google Fonts URL / Material Icons 添加 font-display=swap
- Removed unused GLightbox CSS/JS from `credits.html` and `vr.html` (they don't use it) / 从 credits.html 和 vr.html 移除未使用的 GLightbox 加载
- Changed legacy site link from `http://` to `https://` / 旧版页面链接从 http 升级为 https

### File Structure / 文件结构

```
├── index.html              # Main page (385 lines, was 1077) / 主页面
├── photo.html              # Photo gallery (170 lines, was 516) / 图片库
├── vr.html                 # VR panorama (159 lines, was 516) / VR 全景
├── credits.html            # Open source credits (164 lines, was 538) / 开源引用
├── unsupported.html        # Browser compat warning (unchanged) / 浏览器不支持提示
├── css/
│   ├── shared.css          # Common styles (145 lines) / 公共样式
│   ├── index.css           # Index-specific (297 lines) / 首页样式
│   ├── photo.css           # Photo-specific (55 lines) / 图片库样式
│   ├── vr.css              # VR-specific (50 lines) / VR 样式
│   └── credits.css         # Credits-specific (85 lines) / 引用页样式
├── js/
│   ├── browser-check.js    # Browser compat redirect (20 lines) / 浏览器检测
│   ├── i18n.js             # i18n engine + shared dict (83 lines) / i18n 引擎
│   ├── i18n-index.js       # Index translations (141 lines) / 首页翻译
│   ├── i18n-photo.js       # Photo translations (29 lines) / 图片库翻译
│   ├── i18n-vr.js          # VR translations (53 lines) / VR 翻译
│   ├── i18n-credits.js     # Credits translations (37 lines) / 引用页翻译
│   ├── theme.js            # Theme toggle (40 lines) / 主题切换
│   ├── site-ui.js          # Shared UI wiring (19 lines) / 共享 UI
│   └── app.js              # Orchestrator (32 lines) / 入口编排
├── images/
├── photolib/
├── favicon.ico
├── README.md
├── CHANGELOG.md
└── CLAUDE.md
```

## v3.3.0 — 2026-05-27 — Bilingual Support (Chinese/English) / 双语支持

Assisted by Claude Code (Xiaomi MiMo V2.5 Pro). 由 Claude Code (Xiaomi MiMo V2.5 Pro) 辅助完成。

- All 5 pages now support Chinese and English with a language toggle (globe icon dropdown on MDUI pages, plain `<select>` on `unsupported.html`) / 全站 5 页支持中英文切换，MDUI 页面使用地球图标下拉菜单，不支持页使用原生 `<select>`
- Browser language auto-detection: checks `localStorage('site-lang')` first, falls back to `navigator.language` (zh prefix → Chinese, else → English) / 浏览器语言自动检测：优先 localStorage，回退至 navigator.language
- Language choice persisted across pages via `localStorage('site-lang')` / 语言选择通过 localStorage 跨页面持久化
- `data-i18n` attribute pattern: each translatable element marked with `data-i18n="key"`, inline `i18nDict` per page provides zh/en translations / 使用 data-i18n 属性标记可翻译元素，每页内嵌翻译字典
- Dynamic strings in `unsupported.html` (browser names, OS names) translated via dictionary keys / 不支持页的动态字符串（浏览器名、操作系统名）通过字典键翻译
- `<html lang>` set dynamically to `zh-CN` or `en` / `<html lang>` 动态设置
- `<title>` updated on language switch / 页面标题随语言切换更新
- Language toggle icon-only (globe icon, no text label) to prevent overlap with theme toggle on desktop and ensure mobile compatibility / 语言切换仅显示地球图标，避免与主题切换重叠并确保移动端兼容

## v3.2.0 — 2026-05-11 — Enhanced Browser Compatibility Detection / 增强浏览器兼容检测

Assisted by Claude Code (Xiaomi MiMo V2 Pro). 由 Claude Code (Xiaomi MiMo V2 Pro) 辅助完成。

- `unsupported.html`: Added supported browser detection — browsers meeting version requirements now see a "your browser is supported, go to main site" card with link to `index.html` / 达到版本要求的浏览器显示"受支持"提示卡片，附前往主站按钮
- `unsupported.html`: Comprehensive browser identification — IE (all versions), old Edge (EdgeHTML), Chromium variants (Samsung Internet, Android WebView, UC Browser, QQ, Baidu, Liebao, Sogou), Firefox, Safari, Opera / 全面的浏览器识别：IE、旧版 Edge、Chromium 系（Samsung / WebView / UC / QQ / 百度 / 猎豹 / 搜狗）、Firefox、Safari、Opera
- `unsupported.html`: Chromium-based browsers (including Samsung Internet, Android WebView, UC, etc.) unified under Chrome minimum version check (>= 102) via `Chrome/` UA token / Chromium 系浏览器统一按 `Chrome/` 版本号 >= 102 判定
- All 4 main pages (`index.html`, `photo.html`, `vr.html`, `credits.html`): Replaced IE-only detection with full browser version check — unsupported browsers redirect to `unsupported.html` before page renders / 全站 4 页替换 IE 检测为完整版本判定，不兼容浏览器在渲染前跳转
- Main site detection covers: IE (MSIE/document.documentMode), old Edge (EdgeHTML), Chrome/Chromium < 102, Firefox < 106, Opera < 88, Safari < 16.4, unknown browsers / 检测覆盖：IE、旧版 Edge、Chrome/Chromium < 102、Firefox < 106、Opera < 88、Safari < 16.4、未知浏览器
- `unsupported.html`: File structure entry added to CHANGELOG root listing / 文件结构中补充 `unsupported.html`

## v3.1.2 — 2026-05-09 — Remove VR Module / 移除 VR 模块

Assisted by Claude Code (Xiaomi MiMo V2 Pro). 由 Claude Code (Xiaomi MiMo V2 Pro) 辅助完成。

- Deleted entire `vrview/` directory (41 files, ~43 MB): Google VR View framework, Three.js, panoramic images (.webp), and related assets / 删除 `vrview/` 目录全部 41 个文件（约 43 MB），包括 Google VR View 框架、Three.js、全景图片等
- VR content has been moved to a separate dedicated repository / VR 内容已迁移至独立仓库维护

## v3.1.1 — 2026-05-09 — Mobile Responsive / 移动端适配

Assisted by Claude Code (Xiaomi MiMo V2 Pro). 由 Claude Code (Xiaomi MiMo V2 Pro) 辅助完成。

- Theme toggle hides label text on mobile, icon-only saves horizontal space / 移动端主题切换隐藏文字，仅显示图标
- `index.html`: hero logo/text, section titles, description cards, timeline, photo grid, video selector all scaled down / 首页各板块字号与间距缩小
- `index.html`: team member grid and team structure grid switch to single column on mobile / 团队成员与架构改为单列
- `index.html`: segmented video buttons shrink font + horizontal scroll / 视频分段按钮缩小字号并可横滑
- `photo.html`: photo grid column min-width reduced from 260px to 140px / 图片库列宽从 260px 缩至 140px
- `vr.html`: VR card padding and text sizes reduced / VR 卡片内边距与字号缩小
- `credits.html`: credit card padding and text sizes reduced / 引用卡片内边距与字号缩小
- `unsupported.html`: card/browser-grid adapts to 2-column on small screens / 不支持提示页浏览器网格改为两列
- Added 380px breakpoint for very narrow devices (index.html, photo.html) / 新增 380px 断点适配极窄设备
- FAB navigation tightened spacing on mobile / FAB 导航移动端间距收紧
- Fixed horizontal scroll overflow on mobile: `overflow-x: hidden` on html/body + all pages / 修复移动端横向溢出：html/body 添加 overflow-x: hidden
- Vertical spacing reduced across all pages (hero, sections, cards, timeline, footer) / 全站纵向间距精简
- Video segmented buttons wrapped in scrollable container to fix mobile overflow / 视频分段按钮包裹滚动容器修复移动端溢出
- Video button order: YouTube moved next to Bilibili (same video, different platform) / YouTube 移至 Bilibili 旁（同一视频不同平台）
- Added IPv6 support notice in footer of all 4 pages / 全站 4 页 footer 新增 IPv6 支持提醒

## v3.1.0 — 2026-05-09 — Browser Compatibility & Video / 浏览器兼容 & 视频更新

Assisted by Claude Code (Xiaomi MiMo V2 Pro). 由 Claude Code (Xiaomi MiMo V2 Pro) 辅助完成。

- Added YouTube video embed to video section in `index.html` (segmented button switching) / 视频板块新增 YouTube 版本，分段按钮切换
- Local video (施工纪录) now auto-pauses when switching tabs or scrolling out of view / 本地视频切换选项卡或滚出屏幕时自动暂停
- Created `unsupported.html` standalone browser compatibility warning page / 新建浏览器不支持提示页
- IE11 detection via `document.documentMode` in `<head>`, redirects to `unsupported.html` / 通过 `document.documentMode` 检测 IE11 并跳转
- IE10 and below detection via conditional comments `<!--[if IE]>` / IE10 及以下通过条件注释检测
- Minimum supported browsers: Chrome 102+, Edge 102+, Firefox 106+, Opera 88+, Safari 16.4+ / 最低支持浏览器版本
- Added "旧版页面" link to footer of all 4 pages with confirmation dialog / 全站 4 个页面 footer 添加旧版页面链接，附确认弹窗
- Added old site link to `unsupported.html` for IE users / `unsupported.html` 新增旧版页面入口

## v3.0.4 — 2026-04-02 — Credits Page / 开源引用页

Assisted by Claude Code (Xiaomi MiMo V2 Pro). 由 Claude Code (Xiaomi MiMo V2 Pro) 辅助完成。

- Created `credits.html` listing all open source dependencies with license info and links / 新建独立开源引用页，列出所有依赖项目及许可证
- Added "开源引用" link to footer of all 4 pages / 全站 4 个页面 footer 添加开源引用链接
- Also fixed legacy VR footer to link directly to Google VR View archive repo / 旧版 VR 页 footer 修正为直接链接至 archive 仓库

## v3.0.3 — 2026-04-02 — Local Video & Legacy VR / 本地视频 & 旧版 VR 页面

Assisted by Claude Code (Xiaomi MiMo V2 Pro). 由 Claude Code (Xiaomi MiMo V2 Pro) 辅助完成。

- Added local video (`photolib/2017-7-13-video.mp4`) to video section via native `<video>` with `nodownload` / 视频板块新增本地施工纪录视频，禁用下载
- Video section now supports Bilibili iframe + local video switching via segmented buttons / 视频板块支持 B 站 iframe 与本地视频切换

## v3.0.3 — 2026-04-02 — Legacy VR Page Redesign / 旧版 VR 页面重构

Assisted by Claude Code (Xiaomi MiMo V2 Pro). 由 Claude Code (Xiaomi MiMo V2 Pro) 辅助完成。

- Redesigned `vrview/examples/yuying/index.html` with full main-site theming (deprecated) / 旧版 VR 页面引入主站配色与整体设计 (deprecated)
- Added project logo, info card with usage instructions and Google VR View docs link (deprecated) / 添加 Logo、使用说明卡片及官方文档链接 (deprecated)
- Added theme toggle (light/dark), persisted via localStorage (deprecated) / 添加暗色模式切换按钮，localStorage 持久化 (deprecated)
- Added FAB navigation (Home / VR) matching main site (deprecated) / 添加与主站一致的 FAB 导航 (deprecated)
- Added footer consistent with main site (org name, copyright, GitHub logo, tech stack) (deprecated) / Footer 与主站统一 (deprecated)
- Navigation buttons upgraded to `variant="tonal"` with Material Icons (deprecated) / 导航按钮改为 tonal 风格 + 图标 (deprecated)
- All external links marked with `open_in_new` icon (deprecated) / 所有外链添加新窗口图标 (deprecated)
- Preserved Google VR View dependencies (`../style.css`, `vrview.js`, `index.js`) untouched (deprecated) / 未改动 VR View 框架文件 (deprecated)

## v3.0.2 — 2026-04-01 (Evening) — UI Refinements / UI 迭代优化

Assisted by Claude Code (Xiaomi MiMo V2 Pro). 由 Claude Code (Xiaomi MiMo V2 Pro) 辅助完成。

- Added team structure section (核心组 / 建筑组 / 美术组 / 渲染组) with structured card layout / 新增团队架构板块
- Added group QR code in team section with dialog popup / 群二维码 + 弹窗
- Added GitHub logo icon next to footer GitHub link / Footer GitHub 链接旁添加图标
- Hero section: replaced VR links with Bilibili video links (正片 + 重制版) / Hero 区链接替换为 B 站正片与重制版
- VR page: restored self-hosted source and GitHub VR options with deprecation dialogs (deprecated) / VR 页恢复自建源与 GitHub VR，附弃用提示弹窗 (deprecated)
- Added Google VR View official reference and link in GitHub VR card / GitHub VR 卡片引用 Google 官方说明
- Unified all VR card buttons to `variant="tonal"` style / 统一 VR 卡片按钮风格
- Added `open_in_new` icon to all external links across three pages / 所有外链添加新窗口图标
- Added timeline entry: 2017.11.5 正片发布 / Timeline 新增正片发布条目
- Created `CHANGELOG.md` for future AI agent reference / 创建变更日志
- Updated `README.md` with VR removal and legacy cleanup notes / 更新 README

## v3.0.1 — 2026-04-01 (Afternoon) — AI Agent Site Overhaul / AI Agent 网页革新

Led by Claude Code (Xiaomi MiMo V2 Pro). 由 Claude Code (Xiaomi MiMo V2 Pro) 主导完成。

- Rewrote `index.html` with MDUI v2 single-page layout, integrating About / Team / Timeline / Videos / Photos / 完整重写 `index.html`：MDUI v2 单页布局
- Rewrote `photo.html` with MDUI v2 + GLightbox lightbox + dark mode / 重写 `photo.html`：MDUI v2 + GLightbox 灯箱 + 暗色模式
- Created `vr.html` standalone VR panorama page (720yun + YouTube external links) / 创建 `vr.html`：VR 全景独立页
- Dark mode implementation: system preference auto-detection + manual toggle via `mdui-theme-dark` class / 实现暗色模式：系统偏好自动检测 + 手动切换
- Team member email hyperlinks, timeline entry for 2026.4.1 AI Agent renovation / 团队成员邮箱超链接、时间线新增 AI Agent 条目
- Hero section VR direct buttons, photo gallery hyperlink navigation / Hero 区 VR 直达按钮、图片库超链接跳转
- Footer tech stack attribution: "Built with MDUI v2 · GLightbox · Assisted by Claude Code" / Footer 技术栈引用
- Localization attempt: downloaded MDUI v2 CSS/JS + GLightbox to `lib/`, tried `importmap` to redirect icon dependencies → reverted to CDN due to compatibility issues / 本地化尝试后因兼容性回退为 CDN
- Fixed CSS syntax error (extra `}` after `.theme-toggle` broke subsequent styles) / 修复 CSS 语法错误
- Fixed `.hero-logo` vertical rectangle aspect ratio (`height: auto; border-radius: 12px`) / 修复 logo 竖长方形比例
- Navigation link optimization: VR/photo buttons navigate to standalone pages / 导航链接优化

## v3.0.0 — 2026-04-01 — Site Remaster / 网页重制

Assisted by Claude Code (Xiaomi MiMo V2 Pro). 由 Claude Code (Xiaomi MiMo V2 Pro) 辅助完成。

### Framework Migration / 框架迁移

- MDUI v1 → MDUI v2 (Material Design 3, Web Components)
- All dependencies loaded via CDN (unpkg.com/mdui@2, jsdelivr GLightbox, Google Fonts Material Icons)
- Removed local `lib/`, `css/`, `js/`, `fonts/`, `icons/` directories
- 所有依赖改为 CDN 加载，删除本地库目录

### Page Structure / 页面结构

- `index.html`: Main page, merged original About / Team / Timeline / Videos / Photos into single-page scroll layout / 主页面，整合为单页滚动布局
- `photo.html`: Photo gallery standalone page (GLightbox lightbox + dark mode) / 图片库独立页
- `vr.html`: VR panorama page (external link navigation, original self-hosted VR taken offline) / VR 全景页

### Self-hosted VR Removed / 自建 VR 下线

- Deleted `vrview/` directory and `vr.js` (Google VR View framework discontinued) / 删除 vrview 和 vr.js
- Replaced with YouTube VR and 720yun VR external link buttons / 替换为外部链接按钮

### UI Features / UI 功能

- Full-screen Hero section (background image + overlay) / 全屏 Hero 区
- Card layout (project intro, member cards) / 卡片布局
- Project timeline (2017.7 — 2026.4) / 项目时间线
- Video source switch (`<mdui-segmented-button-group>`, two Bilibili sources, no autoplay) / 视频源切换
- GLightbox image lightbox (`photo.html` and `index.html` photo section) / 图片灯箱
- Team structure section (Core / Building / Art / Rendering) + group QR code / 团队架构板块
- GitHub logo + link (Footer) / GitHub Logo 链接

### Theme Toggle / 主题切换

- Fixed position top-right, `<mdui-dropdown>` + `<mdui-menu>` single select / 右上角下拉菜单
- Three modes: Light / Dark / Follow System / 三种模式：亮色/暗色/跟随系统
- `localStorage` key `theme-mode`, cross-page persistence / 跨页面持久化
- System dark mode listener: `window.matchMedia('(prefers-color-scheme: dark)')`

### Navigation / 导航

- Fixed bottom-right `<div class="fab-nav">`, three `<mdui-button-icon>` (Home / Photos / VR) / 右下角固定导航按钮
- Semi-transparent background + shadow, adaptive to light/dark mode / 半透明背景 + 暗色模式自适应

### Icons / 图标

- Using `<mdui-icon name="xxx">` + Google Fonts Material Icons CSS
- Not using MDUI v2 built-in icon module / 不使用 MDUI v2 自带图标模块

### File Structure / 文件结构

```
├── index.html          # Main page / 主页面
├── credits.html        # Open source credits / 开源引用
├── photo.html          # Photo gallery / 图片库
├── vr.html             # VR panorama (external links) / VR 全景
├── unsupported.html    # Browser compatibility warning / 浏览器不支持提示
├── README.md           # Project description / 项目说明
├── CHANGELOG.md        # Changelog (this file) / 变更日志
├── favicon.ico         # Site icon / 网站图标
├── images/             # Background, logo, QR code, GitHub icon, etc. / 背景图、Logo 等
└── photolib/           # Photo gallery resources / 图片库资源
```

### Notes for Future Agents / 注意事项

- All CSS/JS dependencies loaded via CDN, no npm or local library download required / 所有依赖通过 CDN 加载
- MDUI v2 components used as Web Components (`<mdui-*>` custom elements) / Web Components 自定义元素
- Dark mode implemented by toggling `mdui-theme-dark` class on `<html>` / 暗色模式 class 方案
- Theme toggle script independently exists in each of the four HTML pages (not shared module) / 各页面独立实现
- Browser compatibility detection script independently exists in each of the four HTML pages and `unsupported.html` / 浏览器兼容检测脚本在各页面独立实现
- Icon names use Material Icons `name` values, requires Google Fonts CSS / 需引入 Google Fonts CSS
