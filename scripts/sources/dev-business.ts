import { fetchText } from "../utils/fetcher";
import { parseRSS, toNewsItems } from "../utils/rss-parser";
import type { NewsSource } from "../utils/types";

/** HowToMarketAGame：Chris Zukowski 的独立游戏营销博客，Steam 算法/商店页优化权威 */
export const howToMarketAGame: NewsSource = {
	name: "HowToMarketAGame",
	lang: "en",
	fetch: async () => {
		const xml = await fetchText("https://howtomarketagame.com/feed/");
		return toNewsItems(parseRSS(xml)).slice(0, 5);
	},
};

/** Steamworks 官方公告：Steam 平台工具/政策第一手信息（中国网络不可达，依赖 GH Actions） */
export const steamworksNews: NewsSource = {
	name: "Steamworks 官方新闻",
	lang: "en",
	fetch: async () => {
		const xml = await fetchText(
			"https://steamcommunity.com/games/593110/rss/",
		);
		return toNewsItems(parseRSS(xml)).slice(0, 10);
	},
};

/** Deconstructor of Fun：游戏设计与商业模式深度拆解的头部行业博客（Squarespace RSS） */
export const deconstructorOfFun: NewsSource = {
	name: "Deconstructor of Fun",
	lang: "en",
	fetch: async () => {
		const xml = await fetchText(
			"https://www.deconstructoroffun.com/blog?format=rss",
		);
		return toNewsItems(parseRSS(xml)).slice(0, 5);
	},
};
