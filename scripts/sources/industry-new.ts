import { fetchText } from "../utils/fetcher";
import { parseRSS, toNewsItems } from "../utils/rss-parser";
import type { NewsSource } from "../utils/types";

/** Naavik：游戏商业/运营/平台分析（面向行业从业者） */
export const naavik: NewsSource = {
	name: "Naavik",
	lang: "en",
	fetch: async () => {
		const xml = await fetchText("https://naavik.co/feed/");
		return toNewsItems(parseRSS(xml)).slice(0, 5);
	},
};

/** Mobilegamer.biz：移动游戏行业 B2B 媒体（商业/发行/数据视角） */
export const mobilegamerBiz: NewsSource = {
	name: "Mobilegamer.biz",
	lang: "en",
	fetch: async () => {
		const xml = await fetchText("https://mobilegamer.biz/feed/");
		return toNewsItems(parseRSS(xml)).slice(0, 5);
	},
};
