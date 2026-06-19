import { fetchText } from "../utils/fetcher";
import { parseRSS, toNewsItems } from "../utils/rss-parser";
import type { NewsSource } from "../utils/types";

/* ========== AI 游戏开发相关信息源 ========== */

export const aiGamechangers: NewsSource = {
	name: "AI Gamechangers",
	lang: "en",
	fetch: async () => {
		const xml = await fetchText("https://aigamechangers.substack.com/feed");
		return toNewsItems(parseRSS(xml)).slice(0, 5);
	},
};

export const aiAndGames: NewsSource = {
	name: "AI and Games",
	lang: "en",
	fetch: async () => {
		const xml = await fetchText("https://www.aiandgames.com/feed.xml");
		return toNewsItems(parseRSS(xml)).slice(0, 5);
	},
};

export const nvidiaGameDev: NewsSource = {
	name: "NVIDIA Game Dev",
	lang: "en",
	fetch: async () => {
		const xml = await fetchText("https://developer.nvidia.com/blog/feed");
		return toNewsItems(parseRSS(xml)).slice(0, 5);
	},
};

export const sorceressGames: NewsSource = {
	name: "Sorceress Games",
	lang: "en",
	fetch: async () => {
		const xml = await fetchText("https://sorceress.games/feed.xml");
		return toNewsItems(parseRSS(xml)).slice(0, 5);
	},
};

export const generativeGamedev: NewsSource = {
	name: "Generative GameDev",
	lang: "en",
	fetch: async () => {
		const xml = await fetchText("https://gamedev.blog/feed");
		return toNewsItems(parseRSS(xml)).slice(0, 5);
	},
};

export const yuKaiChou: NewsSource = {
	name: "Yu-kai Chou",
	lang: "en",
	fetch: async () => {
		const xml = await fetchText("https://yukaichou.com/feed/");
		return toNewsItems(parseRSS(xml)).slice(0, 5);
	},
};

export const ryanFitzpatrick: NewsSource = {
	name: "Ryan Fitzpatrick",
	lang: "en",
	fetch: async () => {
		const xml = await fetchText("https://ryanfitzpatrick.io/rss.xml");
		return toNewsItems(parseRSS(xml)).slice(0, 5);
	},
};

export const borisTheBrave: NewsSource = {
	name: "BorisTheBrave",
	lang: "en",
	fetch: async () => {
		const xml = await fetchText("https://www.boristhebrave.com/feed/");
		return toNewsItems(parseRSS(xml)).slice(0, 5);
	},
};
