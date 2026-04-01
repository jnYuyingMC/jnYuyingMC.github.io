# Changelog

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
├── photo.html          # Photo gallery / 图片库
├── vr.html             # VR panorama (external links) / VR 全景
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
