/**
 * GameMaker Community 论坛
 * SMF 论坛，提供 RSS
 * RSS: https://forum.gamemaker.io/index.php?action=.xml;type=rss2
 */
import { fetchText } from "../../utils/fetcher";
import type { NewsSource } from "../../utils/types";

function parseSMFRSS(xml: string): Array<{
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

export const gameMakerCommunity: NewsSource = {
	name: "GameMaker 社区",
	lang: "en",
	category: "social",
	platform: "论坛",
	fetch: async () => {
		const xml = await fetchText(
			"https://forum.gamemaker.io/index.php?action=.xml;type=rss2",
		);
		const items = parseSMFRSS(xml);
		return items.slice(0, 15).map((item, i) => ({
			id: `gamemaker-community-${i}-${Date.now()}`,
			title: item.title,
			url: item.link,
			pubDate: item.pubDate || new Date().toISOString(),
		}));
	},
};
