import {
	parseRSS,
	getGUID,
	relativeTime,
	stripHtml,
} from "../utils/rss-parser";
import { fetchText } from "../utils/fetcher";
import type { NewsSource } from "../utils/types";

export const orfeasEl: NewsSource = {
	name: "Orfeas Eleftheriou",
	lang: "en",
	fetch: async () => {
		const xml = await fetchText("https://www.orfeasel.com/feed/");
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

/** Zenn（日本技术博客平台）的各引擎标签 */
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

export const zennGameEngine = makeZennSource("Zenn 游戏引擎", "gameengine");
export const zennUnreal = makeZennSource("Zenn UnrealEngine", "unrealengine");
export const zennGodot = makeZennSource("Zenn Godot", "godot");
export const zennUnity = makeZennSource("Zenn Unity", "unity");
export const zennBevy = makeZennSource("Zenn Bevy", "bevy");

// dev.to 源已全部移除——内容质量偏低，不适合聚合展示 (2026-06)
