/**
 * Game News Round-Up
 * RSS: https://gamenewsroundup.co.uk/feeds/rss.xml
 * 每日精选游戏行业新闻摘要
 */
import { fetchText } from "../utils/fetcher";
import type { NewsSource } from "../utils/types";

function parseRSS(xml: string): Array<{
	title: string;
	link: string;
	pubDate: string;
	description: string;
}> {
	const items: Array<{
		title: string;
		link: string;
		pubDate: string;
		description: string;
	}> = [];
	const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
	let match: RegExpExecArray | null;
	while ((match = itemRegex.exec(xml)) !== null) {
		const block = match[1];
		const title =
			block.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/)?.[1] ||
			block.match(/<title>(.*?)<\/title>/)?.[1] ||
			"";
		const link = block.match(/<link>(.*?)<\/link>/)?.[1] || "";
		const pubDate = block.match(/<pubDate>(.*?)<\/pubDate>/)?.[1] || "";
		const desc =
			block.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>/)?.[1] ||
			block.match(/<description>(.*?)<\/description>/)?.[1] ||
			"";
		if (title && link) items.push({ title, link, pubDate, description: desc });
	}
	return items;
}

export const gameNewsRoundup: NewsSource = {
	name: "Game News Round-Up",
	lang: "en",
	fetch: async () => {
		const xml = await fetchText("https://gamenewsroundup.co.uk/feeds/rss.xml");
		const items = parseRSS(xml);
		return items.slice(0, 5).map((item, i) => ({
			id: `gnr-${i}-${Date.now()}`,
			title: item.title,
			url: item.link,
			pubDate: item.pubDate || new Date().toISOString(),
			extra: {
				hover: item.description
					? item.description.replace(/<[^>]*>/g, "").slice(0, 200)
					: undefined,
			},
		}));
	},
};
