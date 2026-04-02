# Changelog

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
├── vrview/             # Google VR View framework (legacy, preserved) / 遗留 VR 框架
│   └── examples/yuying/index.html  # Legacy VR page / 旧版 VR 页面
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
- Theme toggle script independently exists in each of the three HTML pages (not shared module) / 各页面独立实现
- Icon names use Material Icons `name` values, requires Google Fonts CSS / 需引入 Google Fonts CSS
