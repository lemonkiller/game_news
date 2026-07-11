import { fetchText } from "../utils/fetcher";
import { parseRSS, toNewsItems } from "../utils/rss-parser";
import type { NewsSource } from "../utils/types";

/* ========== 殖民模拟 / 城市建设 / 基地建设类游戏开发博客 ========== */

/** Factorio 官方开发博客 */
export const factorioBlog: NewsSource = {
	name: "Factorio Blog",
	lang: "en",
	fetch: async () => {
		const xml = await fetchText("https://www.factorio.com/blog/rss");
		return toNewsItems(parseRSS(xml)).slice(0, 5);
	},
};