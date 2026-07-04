/**
 * Digital Mind News
 * RSS: https://digitalmindnews.com/feed/
 * AI 综合新闻站，涵盖游戏 AI/程序化生成/NPC 等专题
 */
import { fetchText } from "../utils/fetcher";
import { parseRSS, toNewsItems } from "../utils/rss-parser";
import type { NewsSource } from "../utils/types";

export const digitalMindNews: NewsSource = {
	name: "Digital Mind News",
	lang: "en",
	fetch: async () => {
		const xml = await fetchText("https://digitalmindnews.com/feed/");
		return toNewsItems(parseRSS(xml)).slice(0, 5);
	},
};
