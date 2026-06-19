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
	zh: { all: "全部", zh: "中文", en: "English", ja: "日本語", links: "网址" },
	en: {
		all: "All",
		zh: "Chinese",
		en: "English",
		ja: "日本語",
		links: "Links",
	},
	ja: { all: "全て", zh: "中文", en: "English", ja: "日本語", links: "URL" },
};

/** 标签页悬停提示 */
export const TAB_TIPS: Record<UiLang, Record<string, string>> = {
	zh: {
		all: "全部数据源合并，按时间排序的完整信息流",
		zh: "中文游戏开发/设计新闻与社区内容",
		en: "英文游戏开发/设计新闻与社区内容",
		ja: "日文游戏开发/设计新闻与社区内容",
		links: "游戏开发工具/引擎/资源/学习链接分类索引",
	},
	en: {
		all: "All sources merged, sorted by time",
		zh: "Chinese game dev/design news and community",
		en: "English game dev/design news and community",
		ja: "Japanese game dev/design news and community",
		links: "Game dev tools, engines, resources, and learning links",
	},
	ja: {
		all: "全てのソースを統合、時間順に表示",
		zh: "中国語のゲーム開発/デザインニュース",
		en: "英語のゲーム開発/デザインニュース",
		ja: "日本語のゲーム開発/デザインニュース",
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
