# GameDev News

游戏开发资讯聚合站 -- 覆盖中英日三语 140+ 数据源，纯静态零运维。

GB 经典四色绿风格，系统字体栈确保中日英混排一致。

## 数据源一览

| 类型 | 源数 | 说明 |
|------|------|------|
| 新闻 RSS | ~140 | 游戏开发/设计/引擎/行业新闻源，每天自动抓取 |
| 网址链接 | ~230 | 开发工具/引擎/社区/博客/资源链接，按 12 类分组 |

完整列表见 `scripts/sources/` 目录。

## 布局

| 标签 | 布局 |
|------|------|
| 新闻 | 左侧语言筛选栏 + 右侧单列列表。语言：全部/中文/English/日本語。全部显示 150 条，单语言显示 50 条。仅显示 1 月内内容 |
| 网址 | 左侧分类导航栏 + 右侧按 12 个分类分组的链接列表，每项含名称/描述/域名 |

导航栏右侧随机显示游戏开发/设计名言，切换标签时刷新。

## 网址链接分类

| 分类 | 数量 | 说明 |
|------|------|------|
| 社区 | 52 | 论坛、社区平台、Q&A（Reddit/GameDev.net/itch.io/Zenn/Qiita） |
| 博客 | 34 | 个人开发者博客（Raph Koster/Dan Felder/Necromanov 等） |
| 游戏框架/引擎 | 30 | 引擎项目链接（Godot/Unity/Unreal/MonoGame 等） |
| 游戏设计 | 25 | 游戏设计分析/理论/教程 |
| 编程开发 | 20 | 游戏编程/渲染/AI/公司技术博客 |
| 叙事/关卡/UI | 16 | 叙事/关卡/UIUX 设计资源与工具 |
| 新闻 | 14 | 游戏行业新闻媒体（4Gamer/GameLook/触乐/80 Level 等） |
| 开发工具 | 14 | 工具合集、CI/CD、编辑器、开发者博客 |
| 美术工具 | 14 | Spite/Blender/Krita/Aseprite 等美术工具及官方博客 |
| 素材资源 | 7 | 免费游戏素材站 |
| 音频工具 | 5 | BGM/SFX 工具与素材 |
| 其他 | 2 | GDC、GDC Vault |

侧边栏约 12 个分类，无需滚动条。

## 本地化

站点 UI 根据浏览器语言自动切换（中文 / English / 日本語），无需手动选择。

| 组件 | 中文 | English | 日本語 |
|------|------|---------|--------|
| 导航标题 | 游戏新闻 | Game News | ゲームニュース |
| 新闻标签 | 新闻 | News | ニュース |
| 网址标签 | 网址 | Links | URL |
| "更新于" 前缀 | 更新于 | Updated | 更新 |

UI 字符串集中在 `src/i18n/index.ts`，修改文案只需改动这一个文件。

## 架构

- **数据抓取**：GitHub Actions 每天运行 TypeScript RSS/API 抓取（8 并发）
- **前端**：Vite + React + TypeScript，系统字体栈
- **部署**：GitHub Pages，`actions/deploy-pages` 官方部署
- **配色**：Game Boy 经典四色绿 `#0F380F #306230 #8BAC0F #9BBC0F`
- **字体**：`-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans SC", "Microsoft YaHei", "Hiragino Sans GB", "Noto Sans JP", sans-serif`
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

| 类型 | 说明 | 配置位置 |
|------|------|---------|
| RSS 信息源 | 有 RSS 的新闻/博客，自动抓取进新闻页 | `scripts/sources/*.ts`（除 link-sources.ts） |
| 网址链接 | 无 RSS 的网站/工具/社区，只出现在网址页 | `scripts/sources/link-sources.ts` |
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
