# GameDev News

游戏开发资讯聚合站 -- 覆盖中英日三语 60+ 数据源，纯静态，零运维。

GB 经典四色绿像素风格，口袋妖怪红绿配色。

## 数据源一览

| 分类 | 标签 | 源数 | 说明 |
|------|------|------|------|
| 英文 | English | ~25 | 游戏开发新闻、博客、设计文章 |
| 中文 | 中文 | ~12 | 国内游戏媒体、开发者博客 |
| 日文 | 日本語 | ~14 | 日本游戏资讯、公司技术博客 |
| Steam | Steam | 7 | 热销、新品、特惠、即将推出、CN/US/JP 热销 |
| 引擎 | 引擎 | 9 | Unity、Godot、Bevy、Defold、Flax、O3DE 等 |
| 公司 | 公司 | 5 | PlayStation、Frictional、Raw Fury、ConcernedApe、Capcom |

完整列表见 `scripts/sources/` 目录。

## 如何贡献数据源

**欢迎提交 PR 增加优质的游戏开发/设计相关数据源！**

要求：
- 内容与**游戏开发、游戏设计、游戏行业**直接相关
- 有稳定的 RSS / Atom / API 输出
- 已在该语言/地区被广泛认可的优质来源

添加步骤：
1. 在 `scripts/sources/` 下新建文件，实现 `NewsSource` 接口
2. 在 `scripts/sources/index.ts` 中注册
3. 在 `src/App.tsx` 的 `LANG_MAP` 中添加语言/分类映射
4. 运行 `npm run fetch` 验证数据能正常抓取
5. 运行 `npm run build` 确认构建通过
6. 提交 PR

## 架构

- **数据抓取**：GitHub Actions 每天 8:00 / 20:00 定时运行 TypeScript Rss/API 抓取
- **前端**：Vite + React + TypeScript，VT323 像素字体
- **部署**：GitHub Pages，`actions/deploy-pages` 官方部署
- **配色**：Game Boy 经典四色绿 `#0F380F #306230 #8BAC0F #9BBC0F`

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
```

## 许可

MIT
