import { fetchText } from "../utils/fetcher";
import { parseRSS, toNewsItems } from "../utils/rss-parser";
import type { NewsSource } from "../utils/types";

/**
 * 游戏开发/设计综合博客与通讯
 */

/**
 * Game Dev Essentials - 游戏开发商业与设计文章
 */
export const gameDevEssentials: NewsSource = {
	name: "Game Dev Essentials",
	lang: "en",
	fetch: async () => {
		const xml = await fetchText("https://gamedevessentials.com/feed/");
		return toNewsItems(parseRSS(xml)).slice(0, 5);
	},
};
