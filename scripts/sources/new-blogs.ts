/**
 * 新增游戏开发技术/设计博客
 * Fabien Sanglard - 游戏引擎逆向分析
 * Sirlin.net - 格斗游戏设计理论
 * Liz England - AAA游戏设计
 * 2D Game Art Guru - 2D游戏美术教程
 * Games by Manuel - 游戏设计师博客
 */
import { fetchText } from "../utils/fetcher";
import { parseRSS, toNewsItems } from "../utils/rss-parser";
import type { NewsSource } from "../utils/types";

/** Fabien Sanglard - 游戏引擎与图形技术深度逆向分析 */
export const fabienSanglard: NewsSource = {
	name: "Fabien Sanglard",
	lang: "en",
	fetch: async () => {
		const xml = await fetchText("https://fabiensanglard.net/rss.xml");
		return toNewsItems(parseRSS(xml)).slice(0, 5);
	},
};

/** Sirlin.net - 格斗游戏设计与游戏设计理论 */
export const sirlin: NewsSource = {
	name: "Sirlin.net",
	lang: "en",
	fetch: async () => {
		const xml = await fetchText("https://www.sirlin.net/posts?format=RSS");
		return toNewsItems(parseRSS(xml)).slice(0, 5);
	},
};

/** Liz England - AAA游戏设计师博客 */
export const lizEngland: NewsSource = {
	name: "Liz England",
	lang: "en",
	fetch: async () => {
		const xml = await fetchText("https://lizengland.com/blog/feed/");
		return toNewsItems(parseRSS(xml)).slice(0, 5);
	},
};

/** 2D Game Art Guru - 2D游戏美术教程（Krita/Inkscape/GIMP） */
export const twoDGameArtGuru: NewsSource = {
	name: "2D Game Art Guru",
	lang: "en",
	fetch: async () => {
		const xml = await fetchText("https://2dgameartguru.com/feed/");
		return toNewsItems(parseRSS(xml)).slice(0, 5);
	},
};

/** Games by Manuel - 游戏设计师博客 */
export const gamesByManuel: NewsSource = {
	name: "Games by Manuel",
	lang: "en",
	fetch: async () => {
		const xml = await fetchText("https://gamesbymanuel.com/blog/feed/");
		return toNewsItems(parseRSS(xml)).slice(0, 5);
	},
};
