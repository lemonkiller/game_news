import { fetchText } from "../utils/fetcher";
import { parseRSS, toNewsItems } from "../utils/rss-parser";
import type { NewsSource } from "../utils/types";

/** Tom Looman：Unreal Engine C++/ Gameplay 深度教程 */
export const tomLooman: NewsSource = {
	name: "Tom Looman",
	lang: "en",
	fetch: async () => {
		const xml = await fetchText("https://www.tomlooman.com/feed.xml");
		return toNewsItems(parseRSS(xml)).slice(0, 5);
	},
};

/** Emily Short：互动叙事/叙事设计业界权威博客 */
export const emilyShort: NewsSource = {
	name: "Emily Short",
	lang: "en",
	fetch: async () => {
		const xml = await fetchText("https://emshort.blog/feed/");
		return toNewsItems(parseRSS(xml)).slice(0, 5);
	},
};

/** A Sound Effect：游戏音频/声音设计行业站（补齐音频新闻空白） */
export const aSoundEffect: NewsSource = {
	name: "A Sound Effect",
	lang: "en",
	fetch: async () => {
		const xml = await fetchText("https://www.asoundeffect.com/feed/");
		return toNewsItems(parseRSS(xml)).slice(0, 5);
	},
};

/** Alan Wolfe (demofox)：图形学/程序化生成数学博客 */
export const demofox: NewsSource = {
	name: "Alan Wolfe (demofox)",
	lang: "en",
	fetch: async () => {
		const xml = await fetchText("https://blog.demofox.org/feed/");
		return toNewsItems(parseRSS(xml)).slice(0, 5);
	},
};

/** Phaser：Web 游戏引擎官方新闻 */
export const phaser: NewsSource = {
	name: "Phaser",
	lang: "en",
	fetch: async () => {
		const xml = await fetchText("https://phaser.io/news.rss");
		return toNewsItems(parseRSS(xml)).slice(0, 5);
	},
};
