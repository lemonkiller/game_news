import { fetchText } from "../utils/fetcher";
import { parseRSS, toNewsItems } from "../utils/rss-parser";
import type { NewsSource } from "../utils/types";

/**
 * 行业综合新闻源（游戏开发相关）
 */

export const gameDeveloper: NewsSource = {
	name: "Game Developer",
	lang: "en",
	fetch: async () => {
		const xml = await fetchText("https://www.gamedeveloper.com/rss.xml");
		return toNewsItems(parseRSS(xml)).slice(0, 20);
	},
};

export const unrealBlog: NewsSource = {
	name: "Unreal Engine Blog",
	lang: "en",
	fetch: async () => {
		const xml = await fetchText("https://www.unrealengine.com/rss");
		return toNewsItems(parseRSS(xml)).slice(0, 10);
	},
};

export const kotaku: NewsSource = {
	name: "Kotaku",
	lang: "en",
	fetch: async () => {
		const xml = await fetchText("https://kotaku.com/rss");
		return toNewsItems(parseRSS(xml)).slice(0, 10);
	},
};

export const gameSpot: NewsSource = {
	name: "GameSpot",
	lang: "en",
	fetch: async () => {
		const xml = await fetchText("https://www.gamespot.com/feeds/mashup");
		return toNewsItems(parseRSS(xml)).slice(0, 10);
	},
};

export const ign: NewsSource = {
	name: "IGN",
	lang: "en",
	fetch: async () => {
		const xml = await fetchText("https://feeds.feedburner.com/ign/all");
		return toNewsItems(parseRSS(xml)).slice(0, 10);
	},
};
