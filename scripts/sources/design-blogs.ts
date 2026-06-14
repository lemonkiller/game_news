import { fetchText, fetchJSON } from "../utils/fetcher";
import { parseRSS, getGUID, relativeTime } from "../utils/rss-parser";
import type { NewsSource, NewsItem } from "../utils/types";

/* ========== 英文设计/开发博客 ========== */

/** Red Blob Games — 游戏算法与数学可视化教程 */
export const redBlobGames: NewsSource = {
	name: "Red Blob Games",
	lang: "en",
	fetch: async () => {
		const xml = await fetchText("https://www.redblobgames.com/blog/posts.xml");
		const items = parseRSS(xml);
		return items.slice(0, 5).map((item) => ({
			id: getGUID(item),
			title: item.title,
			url: item.link,
			extra: { info: relativeTime(item.pubDate) },
		}));
	},
};

/** Game Wisdom — 游戏理论、设计分析、行业评论 */
export const gameWisdom: NewsSource = {
	name: "Game Wisdom",
	lang: "en",
	fetch: async () => {
		const xml = await fetchText("https://game-wisdom.com/feed");
		const items = parseRSS(xml);
		return items.slice(0, 5).map((item) => ({
			id: getGUID(item),
			title: item.title,
			url: item.link,
			extra: { info: relativeTime(item.pubDate) },
		}));
	},
};

/** Catnap Games — 独立游戏开发者个人博客 */
export const catnapGames: NewsSource = {
	name: "Catnap Games",
	lang: "en",
	fetch: async () => {
		const xml = await fetchText("https://www.catnapgames.com/feed/");
		const items = parseRSS(xml);
		return items.slice(0, 5).map((item) => ({
			id: getGUID(item),
			title: item.title,
			url: item.link,
			extra: { info: relativeTime(item.pubDate) },
		}));
	},
};

/** Rat King's Blog — 独立游戏工作室开发日志 */
export const ratKing: NewsSource = {
	name: "Rat King",
	lang: "en",
	fetch: async () => {
		const xml = await fetchText("https://ratking.de/blog/feed/");
		const items = parseRSS(xml);
		return items.slice(0, 5).map((item) => ({
			id: getGUID(item),
			title: item.title,
			url: item.link,
			extra: { info: relativeTime(item.pubDate) },
		}));
	},
};

/** Push to Talk — 游戏制作策略通讯 */
export const pushToTalk: NewsSource = {
	name: "Push to Talk",
	lang: "en",
	fetch: async () => {
		const xml = await fetchText("https://www.pushtotalk.gg/feed");
		const items = parseRSS(xml);
		return items.slice(0, 5).map((item) => ({
			id: getGUID(item),
			title: item.title,
			url: item.link,
			extra: { info: relativeTime(item.pubDate) },
		}));
	},
};

/** distractionware — 独立游戏开发博客（Terry Cavanagh） */
export const distractionware: NewsSource = {
	name: "Distractionware",
	lang: "en",
	fetch: async () => {
		const xml = await fetchText("https://distractionware.com/blog/");
		const items = parseRSS(xml);
		return items.slice(0, 5).map((item) => ({
			id: getGUID(item),
			title: item.title,
			url: item.link,
			extra: { info: relativeTime(item.pubDate) },
		}));
	},
};

/* ========== 中文设计/开发博客 ========== */

/** 设计者笔记 — 游戏设计笔记（jskyzero） */
export const designerNotes: NewsSource = {
	name: "设计者笔记",
	lang: "zh",
	fetch: async () => {
		const xml = await fetchText("https://design.jskyzero.com/feed.xml");
		const items = parseRSS(xml);
		return items.slice(0, 5).map((item) => ({
			id: getGUID(item),
			title: item.title,
			url: item.link,
			extra: { info: relativeTime(item.pubDate) },
		}));
	},
};

/** 付之一笑 — 游戏开发个人博客（CharlieFoo） */
export const chawfoo: NewsSource = {
	name: "付之一笑",
	lang: "zh",
	fetch: async () => {
		const xml = await fetchText("https://www.chawfoo.com/feed.xml");
		const items = parseRSS(xml);
		return items.slice(0, 5).map((item) => ({
			id: getGUID(item),
			title: item.title,
			url: item.link,
			extra: { info: relativeTime(item.pubDate) },
		}));
	},
};

/** 奇个旦 — 独立游戏开发实战手记（博客园） */
export const qiGeDan: NewsSource = {
	name: "奇个旦",
	lang: "zh",
	fetch: async () => {
		const xml = await fetchText("https://www.cnblogs.com/Mr147/rss/");
		const items = parseRSS(xml);
		return items.slice(0, 5).map((item) => ({
			id: getGUID(item),
			title: item.title,
			url: item.link,
			extra: { info: relativeTime(item.pubDate) },
		}));
	},
};

/* ========== 日文设计/开发博客 ========== */

/** Osakana Labo — 个人游戏开发者博客 */
export const osakanaLabo: NewsSource = {
	name: "Osakana Labo",
	lang: "ja",
	fetch: async () => {
		const xml = await fetchText("https://osakanagames.com/blog/feed/");
		const items = parseRSS(xml);
		return items.slice(0, 5).map((item) => ({
			id: getGUID(item),
			title: item.title,
			url: item.link,
			extra: { info: relativeTime(item.pubDate) },
		}));
	},
};
