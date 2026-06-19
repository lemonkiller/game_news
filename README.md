# GameDev News

游戏开发资讯聚合站 -- 覆盖中英日三语 **~100 个游戏开发/设计数据源**，纯静态零运维。

GB 经典四色绿像素风格，口袋妖怪红绿配色。

## 数据源一览

| 标签 | 源数 | 说明 |
|------|------|------|
| 全部 | ~90 | 全部非 Steam 源合并，按时间瀑布流展示 |
| English | ~56 | 行业媒体 / 设计博客 / 引擎 / 工作室 / AI 专题 / 开发工具 |
| 中文 | ~19 | 游戏媒体 / 独立博客 / 游戏公司技术博客 |
| 日本語 | ~17 | 游戏媒体 / Qiita / 公司技术博客 |
| Steam | 4 | 热销、新品、特惠、即将推出（CN 区） |
| 网址 | 38 | 无 RSS 的开发工具/资源站，按分类展示静态链接 |

> 聚焦 **游戏开发/游戏设计** 领域，所有源均经过人工审核确认与游戏开发直接相关。
> 已剔除消费级游戏新闻媒体（IGN、Kotaku、GameSpot、PC Gamer、RPS 等）。

完整列表见 `scripts/sources/` 目录。

### 新增工具/AI 专题源

| 源名 | 类别 | 说明 |
|------|------|------|
| AMD GPUOpen | 开发工具 | GPU 渲染/图形调试/性能分析工具资讯 |
| Blender Dev Blog | 开发工具 | Blender 开发进展，资产管线相关 |
| Blender News | 开发工具 | Blender 版本发布/路线图/行业合作 |
| Game Dev Digest | 开发工具 | Unity 开发工具每周摘要 |
| AI and Games | AI 专题 | Tommy Thompson 主持的游戏 AI 深度分析 |
| NVIDIA Game Dev | AI 专题 | NVIDIA GPU/AI 游戏开发技术文章 |
| Unreal Engine Blog | 引擎官方 | Epic 官方博客 |
| Grid Sage Games | 独立开发 | 作者 Josh Ge 游戏设计/开发博客（Cogmind） |

## 布局

| 标签 | 布局 |
|------|------|
| 全部 / 中文 / English / 日本語 | 时间线瀑布流：所有源合并按时间排序，每 5 条一卡，2 列排列 |
| Steam | 多列网格：每源一卡，每卡限 10 条 |
| 网址 | 单栏全宽链接列表，按分类（图形/音频/素材/学习/社区）分组展示 |

每行显示格式：

- **全部/中文/English/日本語**：**标题** | **来源站点** | **更新时间**
- **网址**：**名称** | **详细介绍** | **域名**

## 抓取方式

项目主要使用 **RSS/Atom 直连**（语法简洁，稳定可靠）：

1. **RSS/Atom 直连** -- 绝大部分源原生支持，`fetchText()` + `parseRSS()` 一行搞定
2. **cheerio HTML 抓取**（备用方案） -- 对完全没有 RSS/API 的网站，用 CSS 选择器提取内容（`scripts/utils/html-scraper.ts`，示例见 `scripts/examples/html-scraping-demo.ts`）

## 架构

- **数据抓取**：GitHub Actions 定时运行 TypeScript 脚本（`npm run fetch`）
- **增量保存**：每抓完一个源即写入磁盘，防止中途卡死丢失数据
- **前端**：Vite + React + TypeScript，VT323 / Press Start 2P 像素字体
- **部署**：GitHub Pages，`actions/deploy-pages` 官方部署
- **配色**：Game Boy 经典四色绿 `#0F380F #306230 #8BAC0F #9BBC0F`
- **Fetch 顺序执行**：单源 10s 超时，失败不影响其他源，每源完成后增量写入磁盘

## 本地开发

```bash
# 1. 安装依赖
npm install

# 2. 抓取数据（国内网络部分源不可达，GH Actions 上更完整）
npm run fetch

# 3. 启动开发服务器
npm run dev

# 4. 构建
npm run build
```

### 从中国网络抓取 Reddit

Reddit 被 GFW 屏蔽，本地抓取时会自动跳过。如需获取 Reddit 内容：

```bash
# 设置代理环境变量
export REDDIT_PROXY="http://your-proxy:port"
npm run fetch
```

## 如何贡献数据源

**欢迎提交 PR 增加优质的游戏开发/设计相关数据源！**

要求：

- 内容与**游戏开发、游戏设计、游戏行业、AI+游戏**直接相关
- 优先选择有稳定 RSS / Atom 输出的源
- 无 RSS 的站点可用 `scripts/utils/html-scraper.ts` 通过 HTML 抓取

添加步骤：

1. 在 `scripts/sources/` 下新建源文件，实现 `NewsSource` 接口
2. 在 `scripts/sources/index.ts` 中注册
3. 在 `src/App.tsx` 的 `LANG_MAP` 中添加语言分类映射
4. 运行 `npm run fetch` 验证数据能正常抓取
5. 运行 `npm run build` 确认构建通过
6. 提交 PR

## 许可

MIT
