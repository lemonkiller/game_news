# GameDev News

游戏开发资讯聚合站 -- 覆盖中英日三语 140+ 数据源，纯静态零运维。

GB 经典四色绿像素风格，口袋妖怪红绿配色。

## 数据源一览

| 标签 | 源数 | 说明 |
|------|------|------|
| 全部 | ~141 | 全部源合并，按时间瀑布流展示 |
| English | ~80 | 游戏引擎/设计/开发新闻、红迪、博客、AI/PCG、厂商博客等 |
| 中文 | ~25 | 国内游戏媒体、独立开发者博客、NGA 版块、知乎等 |
| 日本語 | ~30 | 日本游戏资讯、Qiita/Zenn 技术博客、公司技术博客、游戏媒体 |
| 网址 | ~130 | 开发工具/引擎/资源/学习/社区链接，按 15 类分组 |

完整列表见 `scripts/sources/` 目录。

## 布局

| 标签 | 布局 |
|------|------|
| 全部 / 中文 / English / 日本語 | 时间线瀑布流：所有源合并按时间排序，每 5 条一卡，2 列排列 |
| 网址 | 按 15 个分类分组的静态链接列表 |

每行显示格式：**标题** | **来源站点** | **更新时间**

导航栏右侧随机显示游戏开发/设计名言，切换标签时刷新。

## 引擎与设计技术 RSS 源

新增源文件：

| 文件 | 内容 |
|------|------|
| `engine-tech.ts` | 16 个引擎技术 RSS 源：Orfeas/Ogre3D/NVIDIA/Zenn(5标签)/Dev.to(8标签) |
| `design-tech.ts` | 7 个游戏设计/叙事/世界观 RSS 源：IndieDevGames/Chaotican/New to Narrative/Zenn(4标签) |

包括 Dev.to（游戏引擎/Godot/Unreal/Unity/渲染/Vulkan/WebGPU/OpenGL）和 Zenn（游戏设计/创作/UIUX/写作）等多个高技术密度标签。

## 架构

- **数据抓取**：GitHub Actions 每天运行 TypeScript RSS/API 抓取
- **前端**：Vite + React + TypeScript，VT323 / Press Start 2P 像素字体
- **部署**：GitHub Pages，`actions/deploy-pages` 官方部署
- **配色**：Game Boy 经典四色绿 `#0F380F #306230 #8BAC0F #9BBC0F`
- **Fetch 顺序执行**：单源 10s 超时，失败不影响其他源；抓取失败时自动保留旧数据

## 本地开发

```bash
# 1. 安装依赖
npm install

# 2. 抓取数据
npm run fetch

# 3. 启动开发服务器
npm run dev

# 4. 构建
npm run build

# 5. 类型检查
npx tsc --noEmit
```

## 来源类型说明

源按功能分为三类：

| 类型 | 说明 | 配置位置 |
|------|------|---------|
| RSS 信息源 | 有 RSS 的新闻/博客，自动抓取进信息流 | `scripts/sources/*.ts`（除 link-sources.ts） |
| 网址链接 | 无 RSS 的网站/工具/社区，只出现在网址标签 | `scripts/sources/link-sources.ts` |
| 名言 | 游戏开发/设计名言，显示在导航栏 | `scripts/utils/quotes.ts` |

## 许可

MIT
