import { fetchText } from "../utils/fetcher";
import { parseRSS, toNewsItems } from "../utils/rss-parser";
import type { NewsSource } from "../utils/types";

/* ========== 英文设计/开发博客 ========== */

export const redBlobGames: NewsSource = {
	name: "Red Blob Games",
	lang: "en",
	fetch: async () => {
		const xml = await fetchText("https://www.redblobgames.com/blog/posts.xml");
		return toNewsItems(parseRSS(xml)).slice(0, 5);
	},
};

export const gameWisdom: NewsSource = {
	name: "Game Wisdom",
	lang: "en",
	fetch: async () => {
		const xml = await fetchText("https://game-wisdom.com/feed");
		return toNewsItems(parseRSS(xml)).slice(0, 5);
	},
};

export const catnapGames: NewsSource = {
	name: "Catnap Games",
	lang: "en",
	fetch: async () => {
		const xml = await fetchText("https://www.catnapgames.com/feed/");
		return toNewsItems(parseRSS(xml)).slice(0, 5);
	},
};

export const ratKing: NewsSource = {
	name: "Rat King",
	lang: "en",
	fetch: async () => {
		const xml = await fetchText("https://ratking.de/blog/feed/");
		return toNewsItems(parseRSS(xml)).slice(0, 5);
	},
};

export const pushToTalk: NewsSource = {
	name: "Push to Talk",
	lang: "en",
	fetch: async () => {
		const xml = await fetchText("https://www.pushtotalk.gg/feed");
		return toNewsItems(parseRSS(xml)).slice(0, 5);
	},
};

export const distractionware: NewsSource = {
	name: "Distractionware",
	lang: "en",
	fetch: async () => {
		const xml = await fetchText("https://distractionware.com/blog/");
		return toNewsItems(parseRSS(xml)).slice(0, 5);
	},
};

/* ========== 中文设计/开发博客 ========== */

export const designerNotes: NewsSource = {
	name: "设计者笔记",
	lang: "zh",
	fetch: async () => {
		const xml = await fetchText("https://design.jskyzero.com/feed.xml");
		return toNewsItems(parseRSS(xml)).slice(0, 5);
	},
};

export const chawfoo: NewsSource = {
	name: "付之一笑",
	lang: "zh",
	fetch: async () => {
		const xml = await fetchText("https://www.chawfoo.com/feed.xml");
		return toNewsItems(parseRSS(xml)).slice(0, 5);
	},
};

export const qiGeDan: NewsSource = {
	name: "奇个旦",
	lang: "zh",
	fetch: async () => {
		const xml = await fetchText("https://www.cnblogs.com/Mr147/rss/");
		return toNewsItems(parseRSS(xml)).slice(0, 5);
	},
};

/* ========== 新增英文设计/开发博客 ========== */

export const rampantGames: NewsSource = {
	name: "Rampant Games",
	lang: "en",
	fetch: async () => {
		const xml = await fetchText("https://rampantgames.com/blog/?feed=rss2");
		return toNewsItems(parseRSS(xml)).slice(0, 5);
	},
};

export const cliffski: NewsSource = {
	name: "Cliffski",
	lang: "en",
	fetch: async () => {
		const xml = await fetchText("https://www.positech.co.uk/cliffsblog/?feed=rss2");
		return toNewsItems(parseRSS(xml)).slice(0, 5);
	},
};

export const alanZucconi: NewsSource = {
	name: "Alan Zucconi",
	lang: "en",
	fetch: async () => {
		const xml = await fetchText("https://www.alanzucconi.com/feed/");
		return toNewsItems(parseRSS(xml)).slice(0, 5);
	},
};

export const gameWorldObserver: NewsSource = {
	name: "GameWorld Observer",
	lang: "en",
	fetch: async () => {
		const xml = await fetchText("https://www.gameworldobserver.com/feed/");
		return toNewsItems(parseRSS(xml)).slice(0, 5);
	},
};

export const gameDevAcademy: NewsSource = {
	name: "GameDev Academy",
	lang: "en",
	fetch: async () => {
		const xml = await fetchText("https://gamedevacademy.org/feed/");
		return toNewsItems(parseRSS(xml)).slice(0, 5);
	},
};

/* ========== 日文设计/开发博客 ========== */

export const kayacTechblog: NewsSource = {
	name: "KAYAC Tech Blog",
	lang: "ja",
	fetch: async () => {
		const xml = await fetchText("https://techblog.kayac.com/feed");
		return toNewsItems(parseRSS(xml)).slice(0, 5);
	},
};

export const segaTechBlog: NewsSource = {
	name: "SEGA Tech Blog",
	lang: "ja",
	fetch: async () => {
		const xml = await fetchText("https://techblog.sega.jp/feed");
		return toNewsItems(parseRSS(xml)).slice(0, 5);
	},
};

export const applibotTechBlog: NewsSource = {
	name: "Applibot Tech",
	lang: "ja",
	fetch: async () => {
		const xml = await fetchText("https://blog.applibot.co.jp/feed/");
		return toNewsItems(parseRSS(xml)).slice(0, 5);
	},
};
