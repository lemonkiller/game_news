import { fetchText } from "../utils/fetcher";
import { parseRSS, toNewsItems } from "../utils/rss-parser";
import type { NewsSource } from "../utils/types";

/* ========== 策略 / 模拟 / 殖民类游戏设计开发博客 ========== */

export const mechanicsAsMetaphor: NewsSource = {
	name: "Mechanics as Metaphor",
	lang: "en",
	fetch: async () => {
		const xml = await fetchText(
			"https://mechanicsasmetaphor.wordpress.com/feed/",
		);
		return toNewsItems(parseRSS(xml)).slice(0, 5);
	},
};

export const level99Strategy: NewsSource = {
	name: "Level 99 Strategy",
	lang: "en",
	fetch: async () => {
		const xml = await fetchText(
			"https://www.level99store.com/blogs/guidelines.atom",
		);
		return toNewsItems(parseRSS(xml)).slice(0, 5);
	},
};

export const strategyGameStudio: NewsSource = {
	name: "Strategy Game Studio",
	lang: "en",
	fetch: async () => {
		const xml = await fetchText("https://strategygamestudio.com/feed/");
		return toNewsItems(parseRSS(xml)).slice(0, 5);
	},
};

export const dorophone: NewsSource = {
	name: "Dorophone",
	lang: "en",
	fetch: async () => {
		const xml = await fetchText("https://procyonic.org/blog/feed/");
		return toNewsItems(parseRSS(xml)).slice(0, 5);
	},
};

export const captainOfIndustry: NewsSource = {
	name: "Captain of Industry",
	lang: "en",
	fetch: async () => {
		const xml = await fetchText(
			"https://www.captain-of-industry.com/blog-feed.xml",
		);
		return toNewsItems(parseRSS(xml)).slice(0, 5);
	},
};

export const transportFever3: NewsSource = {
	name: "Transport Fever 3",
	lang: "en",
	fetch: async () => {
		const xml = await fetchText("https://www.transportfever3.com/feed/");
		return toNewsItems(parseRSS(xml)).slice(0, 5);
	},
};

export const pocketCity: NewsSource = {
	name: "Pocket City",
	lang: "en",
	fetch: async () => {
		const xml = await fetchText("https://blog.pocketcitygame.com/rss/");
		return toNewsItems(parseRSS(xml)).slice(0, 5);
	},
};

export const jonasMeyerOhle: NewsSource = {
	name: "Jonas Meyer-Ohle",
	lang: "en",
	fetch: async () => {
		const xml = await fetchText("https://jonasmeyerohle.dev/index.xml");
		return toNewsItems(parseRSS(xml)).slice(0, 5);
	},
};

export const cannibalHalfling: NewsSource = {
	name: "Cannibal Halfling",
	lang: "en",
	fetch: async () => {
		const xml = await fetchText("https://cannibalhalflinggaming.com/feed/");
		return toNewsItems(parseRSS(xml)).slice(0, 5);
	},
};
