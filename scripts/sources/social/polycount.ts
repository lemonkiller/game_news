/**
 * Polycount - 游戏艺术论坛
 * 专注游戏 2D/3D 美术的社区，含建模、贴图、概念设计
 * RSS: https://polycount.com/discussions/feed.rss
 */
import { fetchText } from "../../utils/fetcher";
import type { NewsSource } from "../../utils/types";

function parseRSS(xml: string): Array<{
	title: string;
	link: string;
	pubDate: string;
}> {
	const items: Array<{ title: string; link: string; pubDate: string }> = [];
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
		if (title && link) items.push({ title, link, pubDate });
	}
	return items;
}

export const polycountForum: NewsSource = {
	name: "Polycount 论坛",
	lang: "en",
	category: "social",
	platform: "论坛",
	fetch: async () => {
		const xml = await fetchText("https://polycount.com/discussions/feed.rss");
		const items = parseRSS(xml);
		return items.slice(0, 15).map((item, i) => ({
			id: `polycount-${i}-${Date.now()}`,
			title: item.title,
			url: item.link,
			pubDate: item.pubDate || new Date().toISOString(),
		}));
	},
};
