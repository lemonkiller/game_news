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
	zh: "游戏开发资讯聚合，覆盖中英日三语 190+ 数据源",
	en: "Game dev news aggregator covering 190+ sources in CN/EN/JP",
	ja: "中英日190以上のゲーム開発ソースを集約",
};

/** 页脚 */
export const FOOTER_TEXT: Record<UiLang, string> = {
	zh: "游戏开发资讯聚合 | 数据每天自动更新 | 开源 · 免费",
	en: "Game Dev News Aggregator | Auto-updated daily | Open Source · Free",
	ja: "ゲーム開発ニュース集約 | 毎日自動更新 | オープンソース · 無料",
};

/** 语言筛选器标签 */
export const FILTER_LABELS: Record<UiLang, Record<string, string>> = {
	zh: { all: "全部", zh: "中文", en: "English", ja: "日本語" },
	en: { all: "All", zh: "中文", en: "English", ja: "日本語" },
	ja: { all: "全て", zh: "中文", en: "English", ja: "日本語" },
};

/** 社交平台筛选 "全部" */
export const SOCIAL_FILTER_ALL: Record<UiLang, string> = {
	zh: "全部",
	en: "All",
	ja: "全て",
};

/** 空状态提示 */
export const EMPTY_TEXT: Record<UiLang, string> = {
	zh: "暂无内容",
	en: "No content yet",
	ja: "コンテンツがありません",
};

/** 社交标签空状态（需要 GH Actions 抓取） */
export const SOCIAL_EMPTY_TEXT: Record<UiLang, string> = {
	zh: "暂无内容（需在 GH Actions 中抓取）",
	en: "No content (fetch in GH Actions)",
	ja: "コンテンツなし（GH Actions で取得してください）",
};

/** 加载中 */
export const LOADING_TEXT: Record<UiLang, string> = {
	zh: "正在加载...",
	en: "Loading...",
	ja: "読み込み中...",
};

/**
 * 网址分类名本地化映射
 * key = link-sources.ts 中的 category 字段值（中文）
 */
export const CATEGORY_NAMES: Record<UiLang, Record<string, string>> = {
	zh: {
		行业动态: "行业动态",
		开发社区: "开发社区",
		游戏设计: "游戏设计",
		游戏引擎: "游戏引擎",
		"视频/频道": "视频/频道",
		"2D/3D 美术": "2D/3D 美术",
		"编程 & 架构": "编程 & 架构",
		开发工具: "开发工具",
		素材资源: "素材资源",
		音频工具: "音频工具",
		"发行/运营": "发行/运营",
		"UI/UX 设计": "UI/UX 设计",
		网站: "网站",
	},
	en: {
		行业动态: "Industry",
		开发社区: "Communities",
		游戏设计: "Game Design",
		游戏引擎: "Game Engines",
		"视频/频道": "Video/Channels",
		"2D/3D 美术": "2D/3D Art",
		"编程 & 架构": "Programming & Architecture",
		开发工具: "Dev Tools",
		素材资源: "Assets",
		音频工具: "Audio Tools",
		"发行/运营": "Publishing & Operations",
		"UI/UX 设计": "UI/UX Design",
		网站: "Websites",
	},
	ja: {
		行业动态: "業界動向",
		开发社区: "コミュニティ",
		游戏设计: "ゲームデザイン",
		游戏引擎: "ゲームエンジン",
		"视频/频道": "動画/チャンネル",
		"2D/3D 美术": "2D/3D アート",
		"编程 & 架构": "プログラミング & アーキテクチャ",
		开发工具: "開発ツール",
		素材资源: "アセット",
		音频工具: "オーディオツール",
		"发行/运营": "出版/運営",
		"UI/UX 设计": "UI/UX デザイン",
		网站: "ウェブサイト",
	},
};

/** 按语言和日期字符串格式化相对时间 */
export function formatItemTime(
	pubDate: string | undefined,
	lang: UiLang,
): string {
	if (!pubDate) return "";
	const d = new Date(pubDate);
	if (isNaN(d.getTime())) return pubDate;
	const diff = Date.now() - d.getTime();
	const mins = Math.floor(diff / 60000);
	if (mins < 1) {
		switch (lang) {
			case "zh": return "刚刚";
			case "ja": return "たった今";
			default: return "just now";
		}
	}
	if (mins < 60) {
		switch (lang) {
			case "zh": return `${mins} 分钟前`;
			case "ja": return `${mins} 分前`;
			default: return `${mins}m ago`;
		}
	}
	const hours = Math.floor(mins / 60);
	if (hours < 24) {
		switch (lang) {
			case "zh": return `${hours} 小时前`;
			case "ja": return `${hours} 時間前`;
			default: return `${hours}h ago`;
		}
	}
	const days = Math.floor(hours / 24);
	if (days < 30) {
		switch (lang) {
			case "zh": return `${days} 天前`;
			case "ja": return `${days} 日前`;
			default: return `${days}d ago`;
		}
	}
	// 超过一个月显示具体日期
	const month = d.getMonth() + 1;
	const day = d.getDate();
	const year = d.getFullYear();
	switch (lang) {
		case "zh": return `${year}年${month}月${day}日`;
		case "ja": return `${year}年${month}月${day}日`;
		default: return `${year}/${String(month).padStart(2, "0")}/${String(day).padStart(2, "0")}`;
	}
}
