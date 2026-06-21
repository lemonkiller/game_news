// 自动语言检测与 UI 本地化字符串
// 根据浏览器语言自动选择，默认英语

export type UiLang = "zh" | "en" | "ja";

export function detectLanguage(): UiLang {
	const nav = typeof navigator !== "undefined" ? navigator.language || "" : "";
	if (nav.startsWith("zh")) return "zh";
	if (nav.startsWith("ja")) return "ja";
	return "en";
}

/** 标签页本地化标题 */
export const TAB_LABELS: Record<UiLang, Record<string, string>> = {
	zh: { news: "新闻", social: "社交", links: "网址" },
	en: { news: "News", social: "Social", links: "Links" },
	ja: { news: "ニュース", social: "ソーシャル", links: "URL" },
};

/** 标签页悬停提示 */
export const TAB_TIPS: Record<UiLang, Record<string, string>> = {
	zh: {
		news: "全部数据源按时间分组，可筛选语言",
		social: "Reddit/HN/GitHub/Bluesky 等社交平台高时效内容",
		links: "游戏开发工具/引擎/资源/学习链接分类索引",
	},
	en: {
		news: "All sources grouped by time, filterable by language",
		social: "Real-time content from Reddit/HN/GitHub/Bluesky",
		links: "Game dev tools, engines, resources, and learning links",
	},
	ja: {
		news: "全てのソースを時間別にグループ化、言語フィルター可能",
		social: "Reddit/HN/GitHub/Bluesky のリアルタイムコンテンツ",
		links: "ゲーム開発ツール/エンジン/リソース/学習リンク",
	},
};

/** 导航栏标题 */
export const NAV_TITLE: Record<UiLang, string> = {
	zh: "游戏新闻",
	en: "Game News",
	ja: "ゲームニュース",
};

/** "更新于" 前缀 */
export const NAV_SUBTITLE_PREFIX: Record<UiLang, string> = {
	zh: "更新于",
	en: "Updated",
	ja: "更新",
};

/** 导航栏 tooltip */
export const NAV_TITLE_TIP: Record<UiLang, string> = {
	zh: "游戏开发资讯聚合，覆盖中英日三语 140+ 数据源",
	en: "Game dev news aggregator covering 140+ sources in CN/EN/JP",
	ja: "中英日140以上のゲーム開発ソースを集約",
};

/** 页脚 */
export const FOOTER_TEXT: Record<UiLang, string> = {
	zh: "游戏开发资讯聚合 | 数据每天自动更新 | 开源 · 免费",
	en: "Game Dev News Aggregator | Auto-updated daily | Open Source · Free",
	ja: "ゲーム開発ニュース集約 | 毎日自動更新 | オープンソース · 無料",
};
