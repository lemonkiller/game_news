// 独立游戏信息源——独立游戏新闻、评测、开发日志、市场分析
import { fetchText } from "../utils/fetcher";
import { parseRSS, toNewsItems } from "../utils/rss-parser";
import type { NewsSource } from "../utils/types";

/** 24indie - 独立游戏新闻、评测与开发洞察 */
export const indie24: NewsSource = {
	name: "24indie",
	lang: "en",
	fetch: async () => {
		const xml = await fetchText("https://24indie.com/feed/");
		return toNewsItems(parseRSS(xml)).slice(0, 5);
	},
};

/** Indie Informer - 独立游戏记者带来的独立游戏报道 */
export const indieInformer: NewsSource = {
	name: "Indie Informer",
	lang: "en",
	fetch: async () => {
		const xml = await fetchText("https://theindieinformer.com/feed/");
		return toNewsItems(parseRSS(xml)).slice(0, 5);
	},
};

/** GameDiscoverCo - 独立游戏市场数据与发现分析 */
export const gameDiscoverCo: NewsSource = {
	name: "GameDiscoverCo",
	lang: "en",
	fetch: async () => {
		const xml = await fetchText("https://newsletter.gamediscover.co/feed");
		return toNewsItems(parseRSS(xml)).slice(0, 5);
	},
};
