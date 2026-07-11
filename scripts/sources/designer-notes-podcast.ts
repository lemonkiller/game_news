import { fetchText } from "../utils/fetcher";
import { parseRSS, toNewsItems } from "../utils/rss-parser";
import type { NewsSource } from "../utils/types";

/** Soren Johnson 的 Designer Notes 播客/博客（游戏设计访谈） */
export const designerNotesPodcast: NewsSource = {
	name: "Designer Notes",
	lang: "en",
	fetch: async () => {
		const xml = await fetchText("https://www.designer-notes.com/feed/");
		return toNewsItems(parseRSS(xml)).slice(0, 5);
	},
};
