# Changelog

## 2026-04-01 — 网页重制 / Site Remaster

由 Claude Code (Xiaomi MiMo V2 Pro) 辅助完成。

### 框架迁移 / Framework Migration

- MDUI v1 → MDUI v2（Material Design 3，Web Components）
- 所有依赖改为 CDN 加载（unpkg.com/mdui@2, jsdelivr GLightbox, Google Fonts Material Icons）
- 删除本地 `lib/`、`css/`、`js/`、`fonts/`、`icons/` 目录

### 页面结构 / Page Structure

- `index.html`：主页面，整合了原 About、Team、Timeline、Videos、Photos 等内容为单页滚动布局
- `photo.html`：图片库独立页（GLightbox 灯箱 + 暗色模式）
- `vr.html`：VR 全景页（外部链接跳转，原自建 VR 已下线）

### 自建 VR 下线 / Self-hosted VR Removed

- 删除 `vrview/` 目录和 `vr.js`（Google VR View 框架已停止维护）
- 替换为 YouTube VR 和 720yun VR 的外部链接按钮

### UI 功能 / UI Features

- 全屏 Hero 区（背景图 + 遮罩）
- 卡片布局（项目简介、成员卡片）
- 项目时间线（2017.7 — 2026.4）
- 视频源切换（`<mdui-segmented-button-group>`，两个 Bilibili 视频源，无自动播放）
- GLightbox 图片灯箱（`photo.html` 和 `index.html` 图片区）
- 团队架构板块（核心组、建筑组、美术组、渲染组）+ 群二维码
- GitHub Logo + 链接（Footer）

### 主题切换 / Theme Toggle

- 右上角固定位置，`<mdui-dropdown>` + `<mdui-menu>` 单选
- 三种模式：亮色/暗色/跟随系统
- `localStorage` 键名 `theme-mode`，跨页面持久化
- 系统暗色模式监听：`window.matchMedia('(prefers-color-scheme: dark)')`

### 导航 / Navigation

- 右下角固定 `<div class="fab-nav">`，三个 `<mdui-button-icon>`（首页/图片库/VR 全景）
- 半透明背景 + 阴影，亮色/暗色模式自适应

### 图标 / Icons

- 使用 `<mdui-icon name="xxx">` + Google Fonts Material Icons CSS
- 不使用 MDUI v2 自带图标模块

### 文件结构 / File Structure

```
├── index.html          # 主页面
├── photo.html          # 图片库
├── vr.html             # VR 全景（外部链接）
├── README.md           # 项目说明
├── CHANGELOG.md        # 变更日志（本文件）
├── favicon.ico         # 网站图标
├── images/             # 背景图、Logo、二维码、GitHub 图标等
└── photolib/           # 图片库资源
```

### 注意事项 / Notes for Future Agents

- 所有 CSS/JS 依赖通过 CDN 加载，无需安装 npm 或下载本地库
- MDUI v2 组件通过 Web Components 使用（`<mdui-*>` 自定义元素）
- 暗色模式通过在 `<html>` 上切换 `mdui-theme-dark` class 实现
- 主题切换脚本在三个 HTML 页面中各自独立存在（非共享模块）
- 图标名使用 Material Icons 的 name 值，需同时引入 Google Fonts CSS
