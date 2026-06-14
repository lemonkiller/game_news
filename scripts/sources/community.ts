import { fetchJSON, fetchText } from "../utils/fetcher";
import { parseRSS, getGUID, relativeTime } from "../utils/rss-parser";
import type { NewsSource, NewsItem } from "../utils/types";

/* ========== 英文社区 ========== */

async function fetchReddit(sub: string): Promise<NewsItem[]> {
	try {
		const data = await fetchJSON<any>(
			"https://www.reddit.com/r/" + sub + "/hot.json?limit=5",
		);
		return (data.data?.children || []).map((p: any) => ({
			id: p.data.id,
			title: p.data.title,
			url: "https://www.reddit.com" + p.data.permalink,
			extra: { info: p.data.score + " 赞 · " + p.data.num_comments + " 评论" },
		}));
	} catch {
		return [];
	}
}

export const redditGamedev: NewsSource = {
	name: "r/gamedev",
	lang: "community",
	fetch: () => fetchReddit("gamedev"),
};
export const redditGameDesign: NewsSource = {
	name: "r/GameDesign",
	lang: "community",
	fetch: () => fetchReddit("GameDesign"),
};
export const redditIndieDev: NewsSource = {
	name: "r/IndieDev",
	lang: "community",
	fetch: () => fetchReddit("IndieDev"),
};

export const resetera: NewsSource = {
	name: "ResetEra",
	lang: "community",
	fetch: async () => {
		const xml = await fetchText(
			"https://www.resetera.com/forums/gaming.2/index.rss",
		);
		const items = parseRSS(xml);
		return items.slice(0, 10).map((item) => ({
			id: getGUID(item),
			title: item.title,
			url: item.link,
			extra: { info: relativeTime(item.pubDate) },
		}));
	},
};

/* ========== 中文社区 ========== */

async function fetchNGA(fid: string): Promise<NewsItem[]> {
	try {
		const xml = await fetchText(
			"https://nga.178.com/thread.php?fid=" + fid + "&lite=xml",
		);
		const items = parseRSS(xml);
		return items.slice(0, 10).map((item) => ({
			id: getGUID(item),
			title: item.title,
			url: item.link,
			extra: { info: relativeTime(item.pubDate) },
		}));
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

async function fetchAtom(url: string): Promise<NewsItem[]> {
	try {
		const xml = await fetchText(url);
		// Atom 简单解析（处理带命名空间的 feed）
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
		return items.slice(0, 10).map((item) => ({
			id: item.id,
			title: item.title,
			url: item.link,
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
