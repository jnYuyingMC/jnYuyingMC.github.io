# jnYuyingMC.github.io

> 官网 2026 重制版 / Official website 2026 Remastered Edition

## 更新内容 / What's New

- **框架升级 / Framework**: MDUI v1 → MDUI v2（Material Design 3）
- **页面整合 / Single Page**: `index.html` 整合原三页内容，`photo.html` 独立保留 / Merged into single page, photo gallery kept as standalone
- **图片灯箱 / Lightbox**: GLightbox 替代新窗口打开 / GLightbox replaces new-tab image viewing
- **视频更新 / Videos**: Flash → Bilibili iframe + 本地视频，新增 60FPS 21:9 重制版 / Bilibili iframe + local video, added 60FPS 21:9 remastered
- **视觉重设计 / Visual Redesign**: 全屏 Hero、卡片布局、时间线、响应式 / Full-screen Hero, cards, timeline, responsive
- **图标方案 / Icons**: Material Icons（`<mdui-icon name="xxx">` + Google Fonts CSS）
- **VR 链接 / VR Links**: Hero 区添加 B 站正片与重制版直达按钮 / Bilibili video links in Hero section
- **自建 VR / Self-hosted VR**: VR 页保留自建源与 GitHub VR 入口，附弃用提示弹窗 / Self-hosted and GitHub VR options kept with deprecation dialogs
- **VR 模块移除 / VR Module Removed**: 删除 `vrview/` 目录（41 文件，~43 MB），VR 内容迁移至独立仓库维护 / Removed `vrview/` directory (41 files, ~43 MB), VR content moved to a separate repository
- **暗色模式 / Dark Mode**: 支持亮色/暗色/跟随系统三种模式，文字按钮切换，跨页面持久化 / Light, dark, and system mode with text-button toggle, persisted via localStorage
- **图片库独立页 / Photo Gallery**: `photo.html` 升级至 MDUI v2，GLightbox 灯箱 + 暗色模式 / Upgraded with lightbox and dark mode support
- **视频切换 / Video Switcher**: 分段按钮选择视频源，关闭自动播放 / Segmented button to switch video sources, autoplay disabled
- **导航 FAB / Navigation FABs**: 三个页面右下角固定导航按钮（首页/图片库/VR全景）/ Fixed navigation buttons on all pages
- **旧框架清理 / Legacy Cleanup**: 删除 `lib/`、`css/`、`js/`、`fonts/`、`icons/` 等旧版资源，全部改用 CDN 加载 / Removed legacy local resources, now fully CDN-based
- **团队架构 / Team Structure**: 新增团队分组板块（核心组/建筑组/美术组/渲染组）+ 群二维码 / Structured team groups with QR code
- **外链标识 / External Link Icons**: 所有外部链接添加 `open_in_new` 图标 / Open-in-new icon on all external links
- **GitHub Logo**: Footer GitHub 链接旁显示 GitHub 图标 / GitHub icon next to footer link
- **旧版 VR 美化 / Legacy VR Page**: 曾为 `vrview/examples/yuying/index.html` 引入主站配色、主题切换、导航按钮、Footer，现已随 VR 模块移除 / Legacy VR page was styled with main-site theme; now removed with VR module
- **YouTube 视频 / YouTube Video**: 视频板块新增 YouTube 嵌入版本 / Added YouTube embed to video section
- **视频自动暂停 / Video Auto-pause**: 本地视频切换选项卡或离开屏幕时自动暂停 / Local video auto-pauses on tab switch or scroll out of view
- **浏览器兼容检测 / Browser Compatibility**: IE、旧版 Edge、低版本 Chrome/Firefox/Opera/Safari 及未知浏览器自动跳转至不支持提示页 (`unsupported.html`)；Chromium 系（含 Samsung Internet、Android WebView 等）统一按 Chrome 版本判定；受支持浏览器在提示页显示"受支持"并提供前往主站按钮 / IE, old Edge, outdated Chrome/Firefox/Opera/Safari, and unknown browsers auto-redirect; Chromium variants checked via Chrome version; supported browsers see "supported" card with link to main site
- **旧版页面入口 / Legacy Site Link**: 全站 footer 新增旧版页面链接，附确认弹窗；不支持提示页亦提供旧版入口 / Old site link added to footer with confirmation dialog and to unsupported page
- **正片下拉 / Video Dropdown**: Hero 区"正片"按钮改为悬停下拉，含 Bilibili / YouTube 两项 / Hero "正片" button changed to hover dropdown with Bilibili / YouTube
- **移动端适配 / Mobile Responsive**: 全站 5 页移动端布局优化——主题切换仅图标、栅格列宽缩小、字号与内边距适配、380px 极窄断点 / All 5 pages optimized: icon-only theme toggle, smaller grid columns, scaled typography, 380px breakpoint
- **双语支持 / Bilingual Support**: 全站 5 页支持中英文切换（地球图标下拉 / 原生 select），浏览器语言自动检测，localStorage 跨页面持久化 / All 5 pages support Chinese/English switching with browser language auto-detection and localStorage persistence
- **前端重构与可访问性 / Frontend Refactoring & Accessibility**: 将 4 页约 954 行重复 CSS/JS 提取为共享模块（`css/`、`js/`），HTML 体积缩减 64–69%；新增跳至内容链接、`rel="noopener noreferrer"`、`aria-hidden`、`lang` 属性、键盘导航等 WCAG 可访问性改进；背景图预加载、`font-display=swap`、移除未使用的 GLightbox 加载等性能优化 / Extracted ~954 lines of duplicated CSS/JS into shared modules, HTML sizes reduced 64–69%; added skip-to-content, rel="noopener noreferrer", aria-hidden, lang attrs, keyboard navigation for WCAG; background preload, font-display=swap, removed unused GLightbox for performance

## 文件结构 / File Structure

```
├── index.html              # 主页面（395 行，原 1077）/ Main page
├── photo.html              # 图片库（177 行，原 516）/ Photo gallery
├── vr.html                 # VR 全景（139 行，原 516）/ VR panorama
├── credits.html            # 开源引用（164 行，原 538）/ Credits
├── unsupported.html        # 浏览器不支持提示 / Browser compat warning
├── css/
│   ├── shared.css          # 公共样式 / Common styles
│   ├── index.css           # 首页样式 / Index-specific
│   ├── photo.css           # 图片库样式 / Photo-specific
│   ├── vr.css              # VR 样式 / VR-specific
│   └── credits.css         # 引用页样式 / Credits-specific
├── js/
│   ├── browser-check.js    # 浏览器检测跳转 / Browser compat redirect
│   ├── i18n.js             # i18n 引擎 + 共享字典 / i18n engine + shared dict
│   ├── i18n-index.js       # 首页翻译 / Index translations
│   ├── i18n-photo.js       # 图片库翻译 / Photo translations
│   ├── i18n-vr.js          # VR 翻译 / VR translations
│   ├── i18n-credits.js     # 引用页翻译 / Credits translations
│   ├── theme.js            # 主题切换 / Theme toggle
│   ├── site-ui.js          # 共享 UI 逻辑 / Shared UI wiring
│   └── app.js              # 入口编排 / Orchestrator
├── images/                 # 背景图、Logo、二维码等 / Background, logo, QR
├── photolib/               # 图片库资源 / Photo gallery assets
├── favicon.ico
├── README.md
├── CHANGELOG.md
├── AGENTS.md
└── translations-review.md
```

## 技术栈 / Tech Stack

- [MDUI v2](https://www.mdui.org) — Material Design 3 前端框架（Web Components）
- [GLightbox](https://biati-digital.github.io/glightbox/) — 图片灯箱
- [Material Icons](https://fonts.google.com/icons) — 图标（Google Fonts CSS）

## 开发方式 / Development

本次重制及后续迭代优化由 [Claude Code](https://claude.ai/code) 和 [OpenCode](https://opencode.ai)（AI Agent）辅助完成，底层模型包括小米 MiMo V2 Pro / V2.5 Pro 与 GLM-5.2。

The 2026 remaster and subsequent iterations were assisted by [Claude Code](https://claude.ai/code) and [OpenCode](https://opencode.ai) (AI Agent), powered by Xiaomi MiMo V2 Pro / V2.5 Pro and GLM-5.2.

## 注意事项 / Notes

- 所有依赖通过 CDN 加载，无需 npm 或本地库 / All dependencies loaded via CDN, no npm or local libraries needed
- CSS/JS 已提取为共享模块，各页面通过 `<link>` 和 ES Modules (`<script type="module">`) 引入 / CSS/JS extracted into shared modules, imported via `<link>` and ES Modules
- 浏览器兼容检测 (`browser-check.js`) 作为经典脚本同步加载，在页面渲染前执行 / Browser check loaded as classic script for synchronous execution before rendering
- MDUI v2 组件以 Web Components (`<mdui-*>`) 形式使用 / MDUI v2 components used as Web Components
- 暗色模式通过在 `<html>` 上切换 `mdui-theme-dark` 类实现 / Dark mode via toggling `mdui-theme-dark` class on `<html>`
- 图标使用 Material Icons `name` 值，需引入 Google Fonts CSS / Icon names use Material Icons `name` values, requires Google Fonts CSS
