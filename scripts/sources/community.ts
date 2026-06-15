import { fetchText } from "../utils/fetcher";
import { parseRSS, toNewsItems } from "../utils/rss-parser";
import type { NewsSource } from "../utils/types";

/* ========== 英文社区（Reddit RSS） ========== */

async function fetchRedditRSS(
	sub: string,
): Promise<ReturnType<typeof toNewsItems>> {
	try {
		const xml = await fetchText("https://www.reddit.com/r/" + sub + ".rss");
		return toNewsItems(parseRSS(xml)).slice(0, 5);
	} catch {
		return [];
	}
}

export const redditGamedev: NewsSource = {
	name: "r/gamedev",
	lang: "community",
	fetch: () => fetchRedditRSS("gamedev"),
};
export const redditGameDesign: NewsSource = {
	name: "r/GameDesign",
	lang: "community",
	fetch: () => fetchRedditRSS("gamedesign"),
};
export const redditIndieDev: NewsSource = {
	name: "r/IndieDev",
	lang: "community",
	fetch: () => fetchRedditRSS("IndieDev"),
};
export const redditGameIdeas: NewsSource = {
	name: "r/gameideas",
	lang: "community",
	fetch: () => fetchRedditRSS("gameideas"),
};
export const redditBaseBuilding: NewsSource = {
	name: "r/BaseBuildingGames",
	lang: "community",
	fetch: () => fetchRedditRSS("BaseBuildingGames"),
};
export const reddit4X: NewsSource = {
	name: "r/4Xgaming",
	lang: "community",
	fetch: () => fetchRedditRSS("4Xgaming"),
};
export const redditAIGamedev: NewsSource = {
	name: "r/aigamedev",
	lang: "community",
	fetch: () => fetchRedditRSS("aigamedev"),
};
export const redditLevelDesign: NewsSource = {
	name: "r/leveldesign",
	lang: "community",
	fetch: () => fetchRedditRSS("leveldesign"),
};
export const redditGameEngines: NewsSource = {
	name: "r/gameengines",
	lang: "community",
	fetch: () => fetchRedditRSS("gameengines"),
};

/* ========== 英文论坛 ========== */

export const resetera: NewsSource = {
	name: "ResetEra",
	lang: "community",
	fetch: async () => {
		const xml = await fetchText(
			"https://www.resetera.com/forums/gaming.2/index.rss",
		);
		return toNewsItems(parseRSS(xml)).slice(0, 10);
	},
};

/* ========== 中文社区（NGA） ========== */

async function fetchNGA(fid: string): Promise<ReturnType<typeof toNewsItems>> {
	try {
		const xml = await fetchText(
			"https://nga.178.com/thread.php?fid=" + fid + "&lite=xml",
		);
		return toNewsItems(parseRSS(xml)).slice(0, 10);
	} catch {
		return [];
	}
}

export const ngaGameDesign: NewsSource = {
	name: "NGA 游戏策划",
	lang: "community",
	fetch: () => fetchNGA("-1352175"),
};
export const ngaIndie: NewsSource = {
	name: "NGA 独立游戏",
	lang: "community",
	fetch: () => fetchNGA("-10308342"),
};
export const ngaGameTech: NewsSource = {
	name: "NGA 游戏技术",
	lang: "community",
	fetch: () => fetchNGA("-20406847"),
};
export const ngaDev: NewsSource = {
	name: "NGA 程序技术",
	lang: "community",
	fetch: () => fetchNGA("-237673"),
};

/* ========== 日文社区 ========== */

async function fetchAtom(url: string): Promise<ReturnType<typeof toNewsItems>> {
	try {
		const xml = await fetchText(url);
		const items: any[] = [];
		const entryRe = /<entry[^>]*>([\s\S]*?)<\/entry>/g;
		let m;
		while ((m = entryRe.exec(xml)) !== null) {
			const e = m[1];
			const title = e.match(/<title[^>]*>([^<]*)<\/title>/)?.[1] || "";
			const link = e.match(/<link[^>]*href="([^"]*)"/)?.[1] || "";
			const id = e.match(/<id[^>]*>([^<]*)<\/id>/)?.[1] || link;
			const date =
				e.match(/<published[^>]*>([^<]*)<\/published>/)?.[1] ||
				e.match(/<updated[^>]*>([^<]*)<\/updated>/)?.[1];
			items.push({ id, title, link, pubDate: date });
		}
		return items.slice(0, 10).map((item: any) => ({
			id: item.id,
			title: item.title,
			url: item.link,
			pubDate: item.pubDate,
			extra: {
				info: item.pubDate
					? new Date(item.pubDate).toLocaleDateString("zh-CN")
					: "",
			},
		}));
	} catch {
		return [];
	}
}

export const qiitaGameDev: NewsSource = {
	name: "Qiita ゲーム開発",
	lang: "community",
	fetch: () => fetchAtom("https://qiita.com/tags/ゲーム開発/feed"),
};
export const qiitaUnity: NewsSource = {
	name: "Qiita Unity",
	lang: "community",
	fetch: () => fetchAtom("https://qiita.com/tags/Unity/feed"),
};
export const zennGamedev: NewsSource = {
	name: "Zenn gamedev",
	lang: "community",
	fetch: () => fetchAtom("https://zenn.dev/topics/gamedev/feed"),
};
