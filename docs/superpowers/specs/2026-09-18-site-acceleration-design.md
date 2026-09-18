# 网站资源加速设计 / Site Resource Acceleration Design

## 目标 / Goal

在不引入构建系统、运行时 CDN 切换器或删除本地资源的前提下，改善中国内地与海外访问者加载图片、视频和前端公共依赖时的延迟，同时保持当前静态 GitHub Pages 架构、功能和视觉表现不变。

Improve image, video, and public frontend dependency latency for visitors in mainland China and overseas without adding a build system or runtime CDN switcher, deleting local assets, or changing the current static GitHub Pages architecture, behavior, or visual design.

## 已确认决策 / Confirmed Decisions

1. 采用混合托管：大体积媒体走 Catbox 加速域名，小型关键图标和社交分享资源继续本地托管。
2. MDUI 由 2.1.4 升级至 2.1.5，并从 ZStatic npm 镜像加载。
3. GLightbox 维持 3.3.1，并从 ZStatic cdnjs 镜像加载。
4. React、ReactDOM、Motion、PlayCaptcha、Google Fonts 和 Umami 保持现有来源。
5. 所有本地媒体文件均保留作为人工回滚副本，不实现运行时自动回退。
6. 本次发布版本为 v3.8.0。

## 托管边界 / Hosting Boundary

### 迁移到 Catbox 加速域名

| 本地资源 | 远程资源 |
| --- | --- |
| `photolib/4K-3.webp` | `https://catbox.pengcyril.dpdns.org/lhe353.webp` |
| `photolib/4K-4.webp` | `https://catbox.pengcyril.dpdns.org/xj6zxn.webp` |
| `photolib/4K-garden.webp` | `https://catbox.pengcyril.dpdns.org/k2c1a5.webp` |
| `photolib/2017-07-11.webp` | `https://catbox.pengcyril.dpdns.org/y3jnex.webp` |
| `photolib/2017-07-13 (2).webp` | `https://catbox.pengcyril.dpdns.org/qui6j1.webp` |
| `photolib/2017-07-13 (3).webp` | `https://catbox.pengcyril.dpdns.org/ppjilq.webp` |
| `photolib/2017-07-13.webp` | `https://catbox.pengcyril.dpdns.org/lg0u51.webp` |
| `photolib/2017-07-14 (2).webp` | `https://catbox.pengcyril.dpdns.org/70m0vj.webp` |
| `photolib/2017-07-14.webp` | `https://catbox.pengcyril.dpdns.org/qrg7jc.webp` |
| `photolib/2017-07-19.webp` | `https://catbox.pengcyril.dpdns.org/qmzidr.webp` |
| `photolib/2017-07-21.webp` | `https://catbox.pengcyril.dpdns.org/bvdz6u.webp` |
| `photolib/2017-07-27.webp` | `https://catbox.pengcyril.dpdns.org/1cyqon.webp` |
| `photolib/2017-07-31.webp` | `https://catbox.pengcyril.dpdns.org/8gsplv.webp` |
| `photolib/snow.webp` | `https://catbox.pengcyril.dpdns.org/q8577m.webp` |
| `photolib/yuying.webp` | `https://catbox.pengcyril.dpdns.org/3eqqol.webp` |
| `photolib/2017-7-13-video.mp4` | `https://catbox.pengcyril.dpdns.org/uoi1tz.mp4` |
| `images/background.webp` | `https://catbox.pengcyril.dpdns.org/klplcm.webp` |
| `images/logo.webp` | `https://catbox.pengcyril.dpdns.org/bakvem.webp` |
| `images/qrcode.webp` | `https://catbox.pengcyril.dpdns.org/z3ulih.webp` |

### 继续本地托管

- `images/background.jpg`：供 Open Graph 和 Twitter Card 使用，避免社交爬虫依赖第三方图床。
- `images/icon-180.png`、`images/icon-192.png`、`images/icon-512.png`：favicon、Apple Touch Icon 和 PWA manifest 关键资源。
- `images/github.png`：文件很小，迁移收益不足以抵消额外故障点。
- `favicon.ico`：保留传统浏览器兼容入口。

本地 `images/` 与 `photolib/` 中的所有现有文件均不删除。若远程服务出现故障，可通过恢复静态引用完成回滚。

## CDN 设计 / CDN Design

五个 MDUI 页面中的资源改为：

```text
https://s4.zstatic.net/npm/mdui@2.1.5/mdui.css
https://s4.zstatic.net/npm/mdui@2.1.5/mdui.global.js
```

首页和图片页中的 GLightbox 改为：

```text
https://s4.zstatic.net/ajax/libs/glightbox/3.3.1/css/glightbox.min.css
https://s4.zstatic.net/ajax/libs/glightbox/3.3.1/js/glightbox.min.js
```

这些静态 CSS/JS 必须使用根据实际响应内容重新计算的 SHA-384 SRI，并继续设置 `crossorigin="anonymous"`。React 和 Motion 依赖 jsDelivr 的 `+esm` 转换；PlayCaptcha 在 ZStatic 的候选 npm 路径不可用，因此三者不迁移。

## 加载路径 / Loading Path

- 五个 MDUI 页面预连接 `https://s4.zstatic.net`。
- 使用远程背景的五个 MDUI 页面预连接 `https://catbox.pengcyril.dpdns.org`，并将现有背景 preload 指向远程 WebP。
- `css/shared.css` 和 `css/index.css` 的背景 URL 指向同一个远程 WebP，避免两个逻辑资源地址。
- `index.html` 和 `photo.html` 的缩略图 `src` 与 GLightbox 原图 `href` 使用相同的 Catbox URL。
- 视频继续只在用户选择“施工纪录”时呈现；不增加 autoplay，也不预加载完整视频。
- `unsupported.html` 不引入 MDUI、ZStatic 或 Catbox，继续保持自包含兼容页面。

## 失败策略 / Failure Strategy

不增加 JavaScript 自动切换 CDN 或 `onerror` 回退。运行时回退会扩大状态空间，使 CSS 背景、预加载、灯箱链接和视频源产生不一致，并削弱静态站点的简单性。

故障恢复采用人工回滚：本地文件始终保留，发生第三方服务不可用时，将引用恢复为原路径即可。SRI 校验失败时浏览器会拒绝执行对应 CSS/JS，因此上线前必须验证哈希与响应字节完全一致。

## 文件影响 / Files Affected

- 页面：`index.html`、`photo.html`、`vr.html`、`credits.html`、`changelog.html`
- 样式：`css/shared.css`、`css/index.css`
- 站内版本记录：`js/i18n-changelog.js`
- 文档：`README.md`、`CHANGELOG.md`、`AGENTS.md`、`translations-review.md`
- 项目状态：新建或更新 `docs/PROJECT_STATUS.md`

`unsupported.html`、`manifest.json`、`js/email-captcha.js` 及本地媒体文件不改动。

## 验证 / Verification

1. 对全部 Catbox 目标执行 HTTP 检查：状态码为 200，MIME 与扩展名相符。
2. 对远程 MP4 验证字节范围请求，确认浏览器可播放和拖动进度。
3. 下载 MDUI 与 GLightbox 的最终响应字节，生成 SHA-384，并验证页面中的 SRI 值。
4. 静态搜索确认目标页面和 CSS 不再引用已迁移的本地大资源，同时确认本地图标和 OG 图仍保持原路径。
5. 运行 `npm run check`。
6. 浏览器检查首页、图片页、VR 页、引用页和更新日志页：中英文、亮暗主题、桌面与移动宽度。
7. 专项检查图片灯箱、二维码弹窗、视频切换与播放、主题/语言 dropdown、FAB 导航和旧站确认弹窗。
8. 确认所有本地文件仍存在，Git diff 中没有媒体删除。

## 非目标 / Non-goals

- 不删除本地媒体副本。
- 不新增 Service Worker、构建步骤或 JavaScript CDN 路由器。
- 不迁移 Google Fonts、Umami、React、ReactDOM、Motion 或 PlayCaptcha。
- 不改变页面布局、文字内容或交互设计。
- 不对图片重新编码或调整质量。
