import {
	parseRSS,
	getGUID,
	relativeTime,
	stripHtml,
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
export const zennWriting = makeZennSource("Zenn 写作", "writing");
