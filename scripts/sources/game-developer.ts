/**
 * Game Developer (原 Gamasutra) - 游戏行业深度新闻
 */
import { fetchText } from "../utils/fetcher";
import { parseRSS, toNewsItems } from "../utils/rss-parser";
import type { NewsSource } from "../utils/types";

/** Game Developer (原 Gamasutra) - 游戏行业深度新闻与开发技术 */
export const gameDeveloper: NewsSource = {
	name: "Game Developer",
	lang: "en",
	fetch: async () => {
		const xml = await fetchText("https://www.gamedeveloper.com/rss.xml");
		return toNewsItems(parseRSS(xml)).slice(0, 5);
	},
};
