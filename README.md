# GameDev News

游戏开发资讯聚合站 -- 覆盖中英日三语 140+ 数据源，纯静态零运维。

GB 经典四色绿像素风格，口袋妖怪红绿配色。

## 数据源一览

| 标签 | 源数 | 说明 |
|------|------|------|
| 全部 | ~140 | 全部源合并，按时间瀑布流展示 |
| English | ~85 | 游戏引擎/设计/开发新闻、博客、AI/PCG、厂商博客等 |
| 中文 | ~15 | 国内游戏媒体、独立开发者博客、知乎等 |
| 日本語 | ~30 | 日本游戏资讯、Qiita/Zenn 技术博客、公司技术博客、游戏媒体 |
| 网址 | ~120 | 开发工具/引擎/资源/学习/社区链接，按 16 类分组 |

完整列表见 `scripts/sources/` 目录。

## 布局

| 标签 | 布局 |
|------|------|
| 全部 / 中文 / English / 日本語 | 时间线瀑布流：所有源合并按时间排序，每 5 条一卡，2 列排列 |
| 网址 | 按 16 个分类分组的静态链接列表 |

每行显示格式：**标题** | **来源站点** | **更新时间**

导航栏右侧随机显示游戏开发/设计名言，切换标签时刷新。

## 本地化

站点 UI 根据浏览器语言自动切换（中文 / English / 日本語），无需手动选择。

| 组件 | 中文 | English | 日本語 |
|------|------|---------|--------|
| 导航标题 | 游戏新闻 | Game News | ゲームニュース |
| 全部标签 | 全部 | All | 全て |
| 中文标签 | 中文 | Chinese | 中文 |
| English 标签 | English | English | English |
| 日本語标签 | 日本語 | 日本語 | 日本語 |
| 网址标签 | 网址 | Links | URL |
| "更新于" 前缀 | 更新于 | Updated | 更新 |
| 页脚 | 游戏开发资讯聚合 \| 数据每天自动更新 \| 开源 · 免费 | Game Dev News Aggregator \| Auto-updated daily \| Open Source · Free | ゲーム開発ニュース集約 \| 毎日自動更新 \| オープンソース · 無料 |
| 名言 | 显示 zh 字段 | 显示 en 字段 | 显示 ja 字段 |

UI 字符串集中在 `src/i18n/index.ts`，修改文案只需改动这一个文件。

## 架构

- **数据抓取**：GitHub Actions 每天运行 TypeScript RSS/API 抓取（8 并发）
- **前端**：Vite + React + TypeScript，VT323 / Press Start 2P 像素字体
- **部署**：GitHub Pages，`actions/deploy-pages` 官方部署
- **配色**：Game Boy 经典四色绿 `#0F380F #306230 #8BAC0F #9BBC0F`
- **并行抓取**：`Promise.allSettled` 8 并发，单源 10s 超时，失败不影响其他源；抓取失败时自动保留旧数据

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

注意：`npx tsc --noEmit` 需要 `data/news.json` 存在，因此必须在 `npm run fetch` 之后执行。

## 来源类型说明

源按功能分为三类：

| 类型 | 说明 | 配置位置 |
|------|------|---------|
| RSS 信息源 | 有 RSS 的新闻/博客，自动抓取进信息流 | `scripts/sources/*.ts`（除 link-sources.ts） |
| 网址链接 | 无 RSS 的网站/工具/社区，只出现在网址标签 | `scripts/sources/link-sources.ts` |
| 名言 | 游戏开发/设计名言，显示在导航栏 | `scripts/utils/quotes.ts` |

## 名言系统（三语版）

99 条游戏开发/设计名言，每条包含中英日三语：

```typescript
export interface Quote {
  zh: string;  // 中文翻译
  en: string;  // 英文原文
  ja: string;  // 日文翻译
  author: string;
  source?: string;
}
```

新增名言时须填写全部三个语言字段。

## 许可

MIT
