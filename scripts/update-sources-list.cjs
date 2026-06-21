/**
 * 信息源列表更新脚本
 *
 * 从 news.json 和源文件中读取数据，生成 data/sources-list.md。
 * 每次新增/修改/删除信息源后执行此脚本。
 *
 * 用法: node scripts/update-sources-list.cjs
 */

const fs = require("fs");
const path = require("path");

const DATA_PATH = path.join(process.cwd(), "data", "news.json");
const OUTPUT_PATH = path.join(process.cwd(), "sources-list.md");
const SOURCES_DIR = path.join(process.cwd(), "scripts", "sources");
const APP_PATH = path.join(process.cwd(), "src", "App.tsx");

if (!fs.existsSync(DATA_PATH)) {
  console.error("错误: data/news.json 不存在，请先运行 npm run fetch");
  process.exit(1);
}

const news = JSON.parse(fs.readFileSync(DATA_PATH, "utf-8"));

// 社交源名称集
const SOCIAL_SOURCE_NAMES = new Set([
  "Hacker News 游戏开发",
  "HN Show 游戏",
  "Hacker News",
  "Reddit r/gamedev",
  "Reddit r/godot",
  "Reddit r/Unity3D",
  "Reddit r/unrealengine",
  "Mastodon 游戏开发",
  "Bluesky 游戏开发",
  "GitHub 游戏开发趋势",
  "Godot Release",
  "Bevy Release",
  "Flax Release",
  "Lemmy 游戏开发",
  "Lemmy Godot",
  "Lemmy Unity",
  "Lemmy 游戏设计",
  "Lemmy 游戏开发（lemmy.world）",
  "Lemmy Godot（lemmy.world）",
  "Lemmy Unreal Engine",
  "Lemmy 独立游戏",
  "Lemmy 游戏开发（sh.itjust.works）",
  "Lemmy Unreal Engine（sh.itjust.works）",
  "ResetEra",
  "Qiita ゲーム開発",
  "Qiita ゲームデザイン",
  "Qiita Godot",
  "Qiita UnrealEngine",
  "Qiita Unity",
  "Qiita game AI",
  "Zenn gamedev",
  "Zenn 游戏引擎",
  "Zenn UnrealEngine",
  "Zenn Godot",
  "Zenn Unity",
  "Zenn Bevy",
  "Zenn 游戏设计",
  "Zenn 创作",
  "Zenn UI/UX",
  "Zenn 写作",
  "Zenn UIUX设计",
]);

// 读取 LANG_MAP
const appContent = fs.readFileSync(APP_PATH, "utf-8");
const langMap = {};
const lmMatch = appContent.match(/const LANG_MAP[\s\S]*?\);/);
if (lmMatch) {
  const re = /"([^"]+)":\s*"(zh|en|ja)"/g;
  let m;
  while ((m = re.exec(lmMatch[1])) !== null) langMap[m[1]] = m[2];
}

// 构建源文件->名称映射
function buildFileMap(dir) {
  const map = {};
  const files = fs
    .readdirSync(dir)
    .filter(
      (f) =>
        f.endsWith(".ts") &&
        ![
          "index.ts",
          "link-sources.ts",
          "rss-parser.ts",
          "fetcher.ts",
          "types.ts",
          "quotes.ts",
        ].includes(f)
    );
  for (const f of files) {
    const content = fs.readFileSync(path.join(dir, f), "utf-8");
    const matches = content.matchAll(/name:\s*['"]([^'"]+)['"]/g);
    for (const m of matches) map[m[1]] = path.join(dir, f);
  }
  return map;
}

const fileMap = {
  ...buildFileMap(SOURCES_DIR),
  ...buildFileMap(path.join(SOURCES_DIR, "social")),
};

// 特殊处理 social 源（动态 name，通过函数参数传入）
function extractDynamicNames(fileName, dir, pattern) {
  const content = fs.readFileSync(path.join(dir, fileName), "utf-8");
  const matches = content.matchAll(pattern);
  for (const m of matches) fileMap[m[1]] = "scripts/sources/social/" + fileName;
}

extractDynamicNames(
  "lemmy.ts",
  path.join(SOURCES_DIR, "social"),
  /export const \w+ = makeLemmySource\(\s*['"]([^'"]+)['"]/g
);
extractDynamicNames(
  "bluesky.ts",
  path.join(SOURCES_DIR, "social"),
  /export const \w+ = makeBlueskySource\(\s*['"]([^'"]+)['"]/g
);
extractDynamicNames(
  "github.ts",
  path.join(SOURCES_DIR, "social"),
  /export const \w+ = makeGitHub(?:Release|Trending)Source\(\s*['"]([^'"]+)['"]/g
);
extractDynamicNames(
  "mastodon.ts",
  path.join(SOURCES_DIR, "social"),
  /export const \w+ = makeMastodonSource\(\s*['"]([^'"]+)['"]/g
);
extractDynamicNames(
  "reddit.ts",
  path.join(SOURCES_DIR, "social"),
  /export const \w+ = makeRedditSource\(\s*['"]([^'"]+)['"]/g
);

// 处理 community.ts、design-tech.ts 等非 social 目录中的动态 name
for (const fName of ["community.ts", "design-tech.ts", "engine-tech.ts", "game-ai-sources.ts"]) {
  const content = fs.readFileSync(path.join(SOURCES_DIR, fName), "utf-8");
  const matches = content.matchAll(
    /export const \w+ = make\w+Source\(\s*['"]([^'"]+)['"]/g
  );
  for (const m of matches) fileMap[m[1]] = "scripts/sources/" + fName;
}

// 生成数据
const sourceNames = Object.keys(news.sources).filter(
  (n) => n !== "开发工具链接"
);
const rows = [];

for (const name of sourceNames) {
  const items = news.sources[name];
  const isSocial = SOCIAL_SOURCE_NAMES.has(name);
  const lang = langMap[name] || "en";
  const itemCount = items ? items.length : 0;
  const lastDate =
    items && items.length > 0 && items[0].pubDate
      ? items[0].pubDate.slice(0, 10)
      : "-";
  // 统一转为相对路径
  let filePath = fileMap[name] || "-";
  if (filePath.startsWith(process.cwd())) {
    filePath = filePath.slice(process.cwd().length + 1).replace(/\\/g, "/");
  }

  rows.push({
    name,
    type: isSocial ? "社交" : "新闻",
    lang,
    file: filePath,
    items: itemCount,
    lastUpdate: lastDate,
  });
}

rows.sort((a, b) => a.type.localeCompare(b.type) || a.name.localeCompare(b.name));

// 网址分类数据
const linkCats = [
  ["x.com", 34, "游戏开发/设计名人 Twitter/X 账号"],
  ["游戏框架/引擎", 23, "引擎项目官网（Godot/Unity/Unreal/Defold/MonoGame 等）"],
  ["YouTube", 22, "游戏开发/设计优质 YouTube 频道"],
  ["知乎专栏", 19, "游戏开发/设计知乎专栏合集"],
  ["Reddit", 16, "游戏开发相关子论坛合集"],
  ["游戏设计", 15, "游戏设计分析/理论/教程网站"],
  ["网站", 14, "游戏开发综合社区/新闻站"],
  ["B站", 13, "游戏开发/设计 B 站 UP 主"],
  ["叙事/关卡/UI", 12, "叙事设计/关卡设计/UIUX 资源与工具"],
  ["美术工具", 11, "Aseprite/Blender/Krita 等美术工具"],
  ["开发工具", 9, "工具合集、CI/CD、Awesome 列表"],
  ["编程开发", 7, "游戏编程/渲染/AI/公司技术博客"],
  ["素材资源", 7, "免费游戏素材站"],
  ["音频工具", 5, "BGM/SFX 工具与素材"],
];

// 生成 Markdown
let md = "# 信息源列表\n\n";
md += "> 自动由 `scripts/update-sources-list.cjs` 生成。不要手动编辑。\n\n";
md += "## 新闻/社交源\n\n";
md += `共 ${rows.length} 个源。\n\n`;
md += "| 名称 | 类型 | 语言 | 文件 | 条数 | 最近更新 |\n";
md += "|------|------|------|------|------|---------|\n";
for (const r of rows) {
  md += `| ${r.name} | ${r.type} | ${r.lang} | ${r.file} | ${r.items} | ${r.lastUpdate} |\n`;
}

md += "\n## 网址链接分类\n\n";
md += "网址标签下的链接按 14 个分类组织。具体条目见 `scripts/sources/link-sources.ts`。\n\n";
md += "| 分类 | 数量 | 说明 |\n";
md += "|------|------|------|\n";
for (const [cat, count, desc] of linkCats) {
  md += `| ${cat} | ${count} | ${desc} |\n`;
}

fs.writeFileSync(OUTPUT_PATH, md);
console.log(`已更新 ${OUTPUT_PATH}，共 ${rows.length} 个源`);
