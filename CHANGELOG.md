# Changelog

## 2026-05-28 — Frontend Refactoring & Accessibility / 前端重构与可访问性改进

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

## 2026-05-27 — Bilingual Support (Chinese/English) / 双语支持

Assisted by Claude Code (Xiaomi MiMo V2.5 Pro). 由 Claude Code (Xiaomi MiMo V2.5 Pro) 辅助完成。

- All 5 pages now support Chinese and English with a language toggle (globe icon dropdown on MDUI pages, plain `<select>` on `unsupported.html`) / 全站 5 页支持中英文切换，MDUI 页面使用地球图标下拉菜单，不支持页使用原生 `<select>`
- Browser language auto-detection: checks `localStorage('site-lang')` first, falls back to `navigator.language` (zh prefix → Chinese, else → English) / 浏览器语言自动检测：优先 localStorage，回退至 navigator.language
- Language choice persisted across pages via `localStorage('site-lang')` / 语言选择通过 localStorage 跨页面持久化
- `data-i18n` attribute pattern: each translatable element marked with `data-i18n="key"`, inline `i18nDict` per page provides zh/en translations / 使用 data-i18n 属性标记可翻译元素，每页内嵌翻译字典
- Dynamic strings in `unsupported.html` (browser names, OS names) translated via dictionary keys / 不支持页的动态字符串（浏览器名、操作系统名）通过字典键翻译
- `<html lang>` set dynamically to `zh-CN` or `en` / `<html lang>` 动态设置
- `<title>` updated on language switch / 页面标题随语言切换更新
- Language toggle icon-only (globe icon, no text label) to prevent overlap with theme toggle on desktop and ensure mobile compatibility / 语言切换仅显示地球图标，避免与主题切换重叠并确保移动端兼容

## 2026-05-11 — Enhanced Browser Compatibility Detection / 增强浏览器兼容检测

Assisted by Claude Code (Xiaomi MiMo V2 Pro). 由 Claude Code (Xiaomi MiMo V2 Pro) 辅助完成。

- `unsupported.html`: Added supported browser detection — browsers meeting version requirements now see a "your browser is supported, go to main site" card with link to `index.html` / 达到版本要求的浏览器显示"受支持"提示卡片，附前往主站按钮
- `unsupported.html`: Comprehensive browser identification — IE (all versions), old Edge (EdgeHTML), Chromium variants (Samsung Internet, Android WebView, UC Browser, QQ, Baidu, Liebao, Sogou), Firefox, Safari, Opera / 全面的浏览器识别：IE、旧版 Edge、Chromium 系（Samsung / WebView / UC / QQ / 百度 / 猎豹 / 搜狗）、Firefox、Safari、Opera
- `unsupported.html`: Chromium-based browsers (including Samsung Internet, Android WebView, UC, etc.) unified under Chrome minimum version check (>= 102) via `Chrome/` UA token / Chromium 系浏览器统一按 `Chrome/` 版本号 >= 102 判定
- All 4 main pages (`index.html`, `photo.html`, `vr.html`, `credits.html`): Replaced IE-only detection with full browser version check — unsupported browsers redirect to `unsupported.html` before page renders / 全站 4 页替换 IE 检测为完整版本判定，不兼容浏览器在渲染前跳转
- Main site detection covers: IE (MSIE/document.documentMode), old Edge (EdgeHTML), Chrome/Chromium < 102, Firefox < 106, Opera < 88, Safari < 16.4, unknown browsers / 检测覆盖：IE、旧版 Edge、Chrome/Chromium < 102、Firefox < 106、Opera < 88、Safari < 16.4、未知浏览器
- `unsupported.html`: File structure entry added to CHANGELOG root listing / 文件结构中补充 `unsupported.html`

## 2026-05-09 — Remove VR Module / 移除 VR 模块

Assisted by Claude Code (Xiaomi MiMo V2 Pro). 由 Claude Code (Xiaomi MiMo V2 Pro) 辅助完成。

- Deleted entire `vrview/` directory (41 files, ~43 MB): Google VR View framework, Three.js, panoramic images (.webp), and related assets / 删除 `vrview/` 目录全部 41 个文件（约 43 MB），包括 Google VR View 框架、Three.js、全景图片等
- VR content has been moved to a separate dedicated repository / VR 内容已迁移至独立仓库维护

## 2026-05-09 — Mobile Responsive / 移动端适配

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

## 2026-05-09 — Browser Compatibility & Video / 浏览器兼容 & 视频更新

Assisted by Claude Code (Xiaomi MiMo V2 Pro). 由 Claude Code (Xiaomi MiMo V2 Pro) 辅助完成。

- Added YouTube video embed to video section in `index.html` (segmented button switching) / 视频板块新增 YouTube 版本，分段按钮切换
- Local video (施工纪录) now auto-pauses when switching tabs or scrolling out of view / 本地视频切换选项卡或滚出屏幕时自动暂停
- Created `unsupported.html` standalone browser compatibility warning page / 新建浏览器不支持提示页
- IE11 detection via `document.documentMode` in `<head>`, redirects to `unsupported.html` / 通过 `document.documentMode` 检测 IE11 并跳转
- IE10 and below detection via conditional comments `<!--[if IE]>` / IE10 及以下通过条件注释检测
- Minimum supported browsers: Chrome 102+, Edge 102+, Firefox 106+, Opera 88+, Safari 16.4+ / 最低支持浏览器版本
- Added "旧版页面" link to footer of all 4 pages with confirmation dialog / 全站 4 个页面 footer 添加旧版页面链接，附确认弹窗
- Added old site link to `unsupported.html` for IE users / `unsupported.html` 新增旧版页面入口

## 2026-04-02 — Credits Page / 开源引用页

Assisted by Claude Code (Xiaomi MiMo V2 Pro). 由 Claude Code (Xiaomi MiMo V2 Pro) 辅助完成。

- Created `credits.html` listing all open source dependencies with license info and links / 新建独立开源引用页，列出所有依赖项目及许可证
- Added "开源引用" link to footer of all 4 pages / 全站 4 个页面 footer 添加开源引用链接
- Also fixed legacy VR footer to link directly to Google VR View archive repo / 旧版 VR 页 footer 修正为直接链接至 archive 仓库

## 2026-04-02 — Local Video & Legacy VR / 本地视频 & 旧版 VR 页面

Assisted by Claude Code (Xiaomi MiMo V2 Pro). 由 Claude Code (Xiaomi MiMo V2 Pro) 辅助完成。

- Added local video (`photolib/2017-7-13-video.mp4`) to video section via native `<video>` with `nodownload` / 视频板块新增本地施工纪录视频，禁用下载
- Video section now supports Bilibili iframe + local video switching via segmented buttons / 视频板块支持 B 站 iframe 与本地视频切换

## 2026-04-02 — Legacy VR Page Redesign / 旧版 VR 页面重构

Assisted by Claude Code (Xiaomi MiMo V2 Pro). 由 Claude Code (Xiaomi MiMo V2 Pro) 辅助完成。

- Redesigned `vrview/examples/yuying/index.html` with full main-site theming / 旧版 VR 页面引入主站配色与整体设计
- Added project logo, info card with usage instructions and Google VR View docs link / 添加 Logo、使用说明卡片及官方文档链接
- Added theme toggle (light/dark), persisted via localStorage / 添加暗色模式切换按钮，localStorage 持久化
- Added FAB navigation (Home / VR) matching main site / 添加与主站一致的 FAB 导航
- Added footer consistent with main site (org name, copyright, GitHub logo, tech stack) / Footer 与主站统一
- Navigation buttons upgraded to `variant="tonal"` with Material Icons / 导航按钮改为 tonal 风格 + 图标
- All external links marked with `open_in_new` icon / 所有外链添加新窗口图标
- Preserved Google VR View dependencies (`../style.css`, `vrview.js`, `index.js`) untouched / 未改动 VR View 框架文件

## 2026-04-01 (Evening) — UI Refinements / UI 迭代优化

Assisted by Claude Code (Xiaomi MiMo V2 Pro). 由 Claude Code (Xiaomi MiMo V2 Pro) 辅助完成。

- Added team structure section (核心组 / 建筑组 / 美术组 / 渲染组) with structured card layout / 新增团队架构板块
- Added group QR code in team section with dialog popup / 群二维码 + 弹窗
- Added GitHub logo icon next to footer GitHub link / Footer GitHub 链接旁添加图标
- Hero section: replaced VR links with Bilibili video links (正片 + 重制版) / Hero 区链接替换为 B 站正片与重制版
- VR page: restored self-hosted source and GitHub VR options with deprecation dialogs / VR 页恢复自建源与 GitHub VR，附弃用提示弹窗
- Added Google VR View official reference and link in GitHub VR card / GitHub VR 卡片引用 Google 官方说明
- Unified all VR card buttons to `variant="tonal"` style / 统一 VR 卡片按钮风格
- Added `open_in_new` icon to all external links across three pages / 所有外链添加新窗口图标
- Added timeline entry: 2017.11.5 正片发布 / Timeline 新增正片发布条目
- Created `CHANGELOG.md` for future AI agent reference / 创建变更日志
- Updated `README.md` with VR removal and legacy cleanup notes / 更新 README

## 2026-04-01 (Afternoon) — AI Agent Site Overhaul / AI Agent 网页革新

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

## 2026-04-01 — Site Remaster / 网页重制

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
