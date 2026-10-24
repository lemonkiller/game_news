import { fetchText } from "../utils/fetcher";
import { parseRSS, toNewsItems } from "../utils/rss-parser";
import type { NewsSource } from "../utils/types";

/** Veloren 开发日志：开源 Rust 多人游戏，每周开发周报（FOSS 优先） */
export const veloren: NewsSource = {
	name: "Veloren 开发日志",
	lang: "en",
	fetch: async () => {
		const xml = await fetchText("https://veloren.net/rss.xml");
		return toNewsItems(parseRSS(xml)).slice(0, 5);
	},
};
