# jnYuyingMC.github.io

> 官网 2026 重制版 / Official website 2026 Remastered Edition

## 更新内容 / What's New

- **框架升级 / Framework**: MDUI v1 → MDUI v2（Material Design 3）
- **页面整合 / Single Page**: `index.html` 整合原三页内容，`photo.html` 独立保留 / Merged into single page, photo gallery kept as standalone
- **图片灯箱 / Lightbox**: GLightbox 替代新窗口打开 / GLightbox replaces new-tab image viewing
- **视频更新 / Videos**: Flash → Bilibili iframe，新增 60FPS 21:9 重制版 / Added 60FPS 21:9 remastered edition
- **视觉重设计 / Visual Redesign**: 全屏 Hero、卡片布局、时间线、响应式 / Full-screen Hero, cards, timeline, responsive
- **图标方案 / Icons**: Material Icons（`<mdui-icon name="xxx">` + Google Fonts CSS）
- **VR 链接 / VR Links**: Hero 区添加 B 站正片与重制版直达按钮 / Bilibili video links in Hero section
- **自建 VR / Self-hosted VR**: VR 页保留自建源与 GitHub VR 入口，附弃用提示弹窗 / Self-hosted and GitHub VR options kept with deprecation dialogs
- **暗色模式 / Dark Mode**: 支持亮色/暗色/跟随系统三种模式，文字按钮切换，跨页面持久化 / Light, dark, and system mode with text-button toggle, persisted via localStorage
- **图片库独立页 / Photo Gallery**: `photo.html` 升级至 MDUI v2，GLightbox 灯箱 + 暗色模式 / Upgraded with lightbox and dark mode support
- **视频切换 / Video Switcher**: 分段按钮选择视频源，关闭自动播放 / Segmented button to switch video sources, autoplay disabled
- **导航 FAB / Navigation FABs**: 三个页面右下角固定导航按钮（首页/图片库/VR全景）/ Fixed navigation buttons on all pages
- **旧框架清理 / Legacy Cleanup**: 删除 `lib/`、`css/`、`js/`、`fonts/`、`icons/` 等旧版资源，全部改用 CDN 加载 / Removed legacy local resources, now fully CDN-based
- **团队架构 / Team Structure**: 新增团队分组板块（核心组/建筑组/美术组/渲染组）+ 群二维码 / Structured team groups with QR code
- **外链标识 / External Link Icons**: 所有外部链接添加 `open_in_new` 图标 / Open-in-new icon on all external links
- **GitHub Logo**: Footer GitHub 链接旁显示 GitHub 图标 / GitHub icon next to footer link

## 技术栈 / Tech Stack

- [MDUI v2](https://www.mdui.org) — Material Design 3 前端框架（Web Components）
- [GLightbox](https://biati-digital.github.io/glightbox/) — 图片灯箱
- [Material Icons](https://fonts.google.com/icons) — 图标（Google Fonts CSS）

## 开发方式 / Development

本次重制及后续迭代优化由 [Claude Code](https://claude.ai/code)（AI Agent）辅助完成，底层模型为小米 MiMo V2 Pro。

The 2026 remaster and subsequent iterations were assisted by [Claude Code](https://claude.ai/code) (AI Agent), powered by Xiaomi MiMo V2 Pro.
