import { fetchText } from "../utils/fetcher";
import { parseRSS, toNewsItems } from "../utils/rss-parser";
import type { NewsSource, NewsItem } from "../utils/types";

/* ========== Reddit 统一抓取（共享限流 + 缓存） ========== */

const SUBS = [
	"gamedev",
	"gamedesign",
	"IndieDev",
	"gameideas",
	"BaseBuildingGames",
	"4Xgaming",
	"aigamedev",
	"leveldesign",
	"gameengines",
];

// Reddit 限流严重：10s 间隔 + JSON API + 重试 + 缓存
let redditCache: Record<string, NewsItem[]> | null = null;
let redditFetching = false;
let redditQueue: Array<(v: Record<string, NewsItem[]>) => void> = [];

const REDDIT_UA = "gamedev-news/1.0 (by /u/lemonkiller)";

/** 从环境变量读取 Reddit 代理（REDDIT_PROXY > HTTPS_PROXY > HTTP_PROXY） */
function getRedditProxy(): string | undefined {
	return (
		process.env.REDDIT_PROXY ||
		process.env.HTTPS_PROXY ||
		process.env.HTTP_PROXY
	);
}

/** 创建一个带 proxy 的 fetch 包装（proxy 为空时直接用原生 fetch） */
function createRedditFetch() {
	const proxyUrl = getRedditProxy();
	const opts: any = {
		headers: {
			"User-Agent": REDDIT_UA,
			Accept: "application/json",
		},
	};
	if (proxyUrl) {
		try {
			// 动态加载 undici（Node v20 兼容性处理）
			// eslint-disable-next-line @typescript-eslint/no-require-imports
			const undici = require("undici");
			if (undici.ProxyAgent) {
				opts.dispatcher = new undici.ProxyAgent(proxyUrl);
			}
		} catch {
			/* undici 不可用时降级为直连 */
		}
	}
	return async (url: string, options?: RequestInit): Promise<Response> => {
		return fetch(url, { ...opts, ...options });
	};
}

/** 用多种策略尝试抓取 Reddit（直连 → proxy 回退） */
async function fetchRedditJSON(
	sub: string,
	fetchFn: ReturnType<typeof createRedditFetch>,
): Promise<NewsItem[]> {
	const url = `https://www.reddit.com/r/${sub}/hot.json?limit=5&raw_json=1`;
	const res = await fetchFn(url, { signal: AbortSignal.timeout(15000) });
	if (!res.ok) throw new Error(`HTTP ${res.status}`);
	const data: any = await res.json();
	return (data?.data?.children || []).map((c: any) => {
		const d = c.data;
		return {
			id: d.id || d.permalink,
			title: d.title || "",
			url: `https://www.reddit.com${d.permalink}`,
			pubDate: d.created_utc
				? new Date(d.created_utc * 1000).toISOString()
				: undefined,
			extra: {
				info: d.created_utc
					? new Date(d.created_utc * 1000).toLocaleDateString("zh-CN")
					: "",
			},
		};
	});
}

/** 使用给定 fetchFn 批量抓取所有子版 */
async function fetchAllSubsWith(
	fetchFn: ReturnType<typeof createRedditFetch>,
): Promise<Record<string, NewsItem[]>> {
	const results: Record<string, NewsItem[]> = {};
	for (const [i, sub] of SUBS.entries()) {
		let items: NewsItem[] = [];
		for (let attempt = 0; attempt < 2; attempt++) {
			try {
				if (i > 0 || attempt > 0) {
					await new Promise((r) => setTimeout(r, 10000));
				}
				items = await fetchRedditJSON(sub, fetchFn);
				break;
			} catch {
				/* 重试 - Reddit 请求失败，等下次循环再试 */
			}
		}
		results[sub] = items;
	}
	return results;
}

/** 批量抓取所有 Reddit 子版（自动选择策略） */
async function fetchAllRedditSubs(): Promise<Record<string, NewsItem[]>> {
	const directFetch = createRedditFetch();

	// 策略 1：直连（GH Actions 环境）
	try {
		const testRes = await directFetch(
			"https://www.reddit.com/r/gamedev/hot.json?limit=1&raw_json=1",
			{ signal: AbortSignal.timeout(5000) },
		);
		if (testRes.ok) {
			return await fetchAllSubsWith(directFetch);
		}
	} catch {
		// 直连失败，继续回退
	}

	// 策略 2：如果有 proxy 配置，通过 proxy 重试
	const proxyUrl = getRedditProxy();
	if (proxyUrl) {
		console.log(`  [Reddit] 直连失败，尝试通过 proxy: ${proxyUrl}`);
		const proxyFetch = createRedditFetch();
		try {
			return await fetchAllSubsWith(proxyFetch);
		} catch {
			console.log("  [Reddit] proxy 方式也失败");
		}
	} else {
		console.log(
			"  [Reddit] 直连不可达，且未配置代理（设置 REDDIT_PROXY 环境变量可启用）",
		);
	}

	// 全部失败，返回空
	return Object.fromEntries(SUBS.map((sub) => [sub, []]));
}

/** 获取 Reddit 数据的唯一入口（带缓存） */
function getRedditData(): Promise<Record<string, NewsItem[]>> {
	if (redditCache) return Promise.resolve(redditCache);
	if (redditFetching) {
		return new Promise((resolve) => redditQueue.push(resolve));
	}
	redditFetching = true;
	return fetchAllRedditSubs().then((data) => {
		redditCache = data;
		redditFetching = false;
		for (const resolve of redditQueue) {
			resolve(data);
		}
		redditQueue = [];
		return data;
	});
}

/* ========== Reddit 子版源 ========== */

function makeRedditSource(sub: string, label: string): NewsSource {
	return {
		name: label,
		lang: "community",
		fetch: async () => {
			const data = await getRedditData();
			return data[sub] || [];
		},
	};
}

export const redditGamedev = makeRedditSource("gamedev", "r/gamedev");
export const redditGameDesign = makeRedditSource("gamedesign", "r/GameDesign");
export const redditIndieDev = makeRedditSource("IndieDev", "r/IndieDev");
export const redditGameIdeas = makeRedditSource("gameideas", "r/gameideas");
export const redditBaseBuilding = makeRedditSource(
	"BaseBuildingGames",
	"r/BaseBuildingGames",
);
export const reddit4X = makeRedditSource("4Xgaming", "r/4Xgaming");
export const redditAIGamedev = makeRedditSource("aigamedev", "r/aigamedev");
export const redditLevelDesign = makeRedditSource(
	"leveldesign",
	"r/leveldesign",
);
export const redditGameEngines = makeRedditSource(
	"gameengines",
	"r/gameengines",
);

/* ========== 英文论坛 ========== */

/* ========== 中文游戏开发平台 ========== */

async function fetchRSS(url: string): Promise<ReturnType<typeof toNewsItems>> {
	try {
		const xml = await fetchText(url);
		return toNewsItems(parseRSS(xml)).slice(0, 10);
	} catch {
		return [];
	}
}

export const gameres: NewsSource = {
	name: "GameRes 游资网",
	lang: "zh",
	fetch: () => fetchRSS("https://www.gameres.com/feed.xml"),
};

export const gamerboom: NewsSource = {
	name: "游戏邦",
	lang: "zh",
	fetch: () => fetchRSS("https://www.gamerboom.com/feed/"),
};

export const juejinGame: NewsSource = {
	name: "掘金 游戏开发",
	lang: "zh",
	fetch: () =>
		fetchRSS(
			"https://api.juejin.cn/recommend_api/v1/article_recommend?tag_id=游戏开发",
		),
};

export const sfGameDev: NewsSource = {
	name: "SegmentFault 游戏开发",
	lang: "zh",
	fetch: () => fetchRSS("https://segmentfault.com/t/游戏开发/rss"),
};

export const cnblogsGameDev: NewsSource = {
	name: "博客园 游戏开发",
	lang: "zh",
	fetch: () => fetchRSS("https://www.cnblogs.com/cate/gamedev/rss"),
};

/* ========== 中文社区（NGA） ========== */

async function fetchNGA(fid: string): Promise<ReturnType<typeof toNewsItems>> {
	try {
		const xml = await fetchText(
			`https://nga.178.com/thread.php?fid=${fid}&lite=xml`,
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
		const items: Array<Record<string, string>> = [];
		const entryRe = /<entry[^>]*>([\s\S]*?)<\/entry>/g;
		for (let m = entryRe.exec(xml); m !== null; m = entryRe.exec(xml)) {
			const e = m[1];
			const title = e.match(/<title[^>]*>([^<]*)<\/title>/)?.[1] || "";
			const link = e.match(/<link[^>]*href="([^"]*)"/)?.[1] || "";
			const id = e.match(/<id[^>]*>([^<]*)<\/id>/)?.[1] || link;
			const date =
				e.match(/<published[^>]*>([^<]*)<\/published>/)?.[1] ||
				e.match(/<updated[^>]*>([^<]*)<\/updated>/)?.[1];
			items.push({ id, title, link, pubDate: date || "" });
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
	category: "social",
	platform: "Qiita",
	fetch: () => fetchAtom("https://qiita.com/tags/ゲーム開発/feed"),
};
export const qiitaGameDesign: NewsSource = {
	name: "Qiita ゲームデザイン",
	lang: "community",
	category: "social",
	platform: "Qiita",
	fetch: () => fetchAtom("https://qiita.com/tags/ゲームデザイン/feed"),
};
export const qiitaGodot: NewsSource = {
	name: "Qiita Godot",
	lang: "community",
	category: "social",
	platform: "Qiita",
	fetch: () => fetchAtom("https://qiita.com/tags/Godot/feed"),
};
export const qiitaUnreal: NewsSource = {
	name: "Qiita UnrealEngine",
	lang: "community",
	category: "social",
	platform: "Qiita",
	fetch: () => fetchAtom("https://qiita.com/tags/UnrealEngine/feed"),
};
export const qiitaUnity: NewsSource = {
	name: "Qiita Unity",
	lang: "community",
	category: "social",
	platform: "Qiita",
	fetch: () => fetchAtom("https://qiita.com/tags/Unity/feed"),
};
export const zennGamedev: NewsSource = {
	name: "Zenn gamedev",
	lang: "ja",
	category: "social",
	platform: "Zenn",
	fetch: async () => {
		const xml = await fetchText("https://zenn.dev/topics/gamedev/feed");
		return toNewsItems(parseRSS(xml)).slice(0, 10);
	},
};
