import {
	parseRSS,
	getGUID,
	relativeTime,
	stripHtml,
	toNewsItems,
} from "../utils/rss-parser";
import { fetchText } from "../utils/fetcher";
import type { NewsSource } from "../utils/types";

export const indieDevGames: NewsSource = {
	name: "IndieDevGames",
	lang: "en",
	fetch: async () => {
		const xml = await fetchText("https://indiedevgames.com/feed/");
		const items = parseRSS(xml);
		return items.slice(0, 10).map((item) => ({
			id: getGUID(item),
			title: item.title,
			url: item.link,
			pubDate: item.pubDate,
			extra: {
				info: relativeTime(item.pubDate),
				hover: item.description
					? stripHtml(item.description).slice(0, 200)
					: undefined,
			},
		}));
	},
};

export const chaoticanWriter: NewsSource = {
	name: "Chaotican Writer",
	lang: "en",
	fetch: async () => {
		const xml = await fetchText("https://chaoticanwriter.com/feed/");
		const items = parseRSS(xml);
		return items.slice(0, 10).map((item) => ({
			id: getGUID(item),
			title: item.title,
			url: item.link,
			pubDate: item.pubDate,
			extra: {
				info: relativeTime(item.pubDate),
				hover: item.description
					? stripHtml(item.description).slice(0, 200)
					: undefined,
			},
		}));
	},
};

export const newToNarrative: NewsSource = {
	name: "New to Narrative",
	lang: "en",
	fetch: async () => {
		const xml = await fetchText("https://newtonarrative.com/feed/");
		const items = parseRSS(xml);
		return items.slice(0, 10).map((item) => ({
			id: getGUID(item),
			title: item.title,
			url: item.link,
			pubDate: item.pubDate,
			extra: {
				info: relativeTime(item.pubDate),
				hover: item.description
					? stripHtml(item.description).slice(0, 200)
					: undefined,
			},
		}));
	},
};

/** Zenn（日本技术博客平台）的游戏设计相关标签 */
function makeZennSource(name: string, tag: string): NewsSource {
	return {
		name,
		lang: "ja",
		fetch: async () => {
			const xml = await fetchText(`https://zenn.dev/topics/${tag}/feed`);
			const items = parseRSS(xml);
			return items.slice(0, 10).map((item) => ({
				id: getGUID(item),
				title: item.title,
				url: item.link,
				pubDate: item.pubDate,
				extra: {
					info: relativeTime(item.pubDate),
					hover: item.description
						? stripHtml(item.description).slice(0, 200)
						: undefined,
				},
			}));
		},
	};
}

export const zennGameDesign = makeZennSource("Zenn 游戏设计", "gamedesign");
export const zennStory = makeZennSource("Zenn 创作", "story");
export const zennUIUX = makeZennSource("Zenn UI/UX", "uiux");
export const zennUIUXDesign = makeZennSource("Zenn UIUX设计", "uiuxdesign");
export const zennWriting = makeZennSource("Zenn 写作", "writing");

/** hanasaqotto - 日本游戏 UI/UX 设计信息站 */
export const hanasaqutto: NewsSource = {
	name: "hanasaqutto",
	lang: "ja",
	fetch: async () => {
		const xml = await fetchText("https://hanasaqutto.com/feed/");
		return toNewsItems(parseRSS(xml)).slice(0, 5);
	},
};

/** CanIPlayThat - 游戏无障碍/UX 评测 */
export const canIPlayThat: NewsSource = {
	name: "Can I Play That?",
	lang: "en",
	fetch: async () => {
		const xml = await fetchText("https://caniplaythat.com/feed/");
		return toNewsItems(parseRSS(xml)).slice(0, 5);
	},
};
