/** 一条新闻 */
export interface NewsItem {
	id: string;
	title: string;
	url: string;
	pubDate?: string; // ISO 日期字符串，用于排序
	sourceName?: string; // 来源站点名称
	extra?: {
		info?: string; // 热度/时间等辅助信息
		hover?: string; // 鼠标悬停预览文本
	};
}

/** 一个数据源 */
export interface NewsSource {
	name: string; // 列标题
	lang: string; // 语言: 'zh' | 'en' | 'ja'
	fetch(): Promise<NewsItem[]>;
}

/** 语言标签 */
export type Lang = "all" | "zh" | "en" | "ja" | "steam" | "links";

/** 抓取结果汇总 */
export interface FetchResult {
	updatedAt: string;
	sources: Record<string, NewsItem[]>;
	errors: Record<string, string>;
}
