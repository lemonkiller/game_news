/**
 * RSSHub 桥接源
 *
 * RSSHub (https://github.com/DIYgod/RSSHub) 是一个开源项目，可将 2000+ 网站转为标准 RSS。
 * 本文件中的源通过 RSSHub 公共实例获取那些没有原生 RSS 的网站内容。
 *
 * 注意：
 * - rsshub.app 官方实例有 Cloudflare 防护，可能阻挡自动化请求
 * - 可配置 RSSHUB_INSTANCE 环境变量指定实例，默认使用 rsshub.ktachibana.party
 * - 支持的公共实例见 https://docs.rsshub.app/guide/instances
 */

import { fetchText } from "../utils/fetcher";
import { parseRSS, toNewsItems } from "../utils/rss-parser";
import type { NewsSource } from "../utils/types";

/** 默认 RSSHub 实例（环境变量 RSSHUB_INSTANCE 可覆盖） */
const RSSHUB =
	process.env.RSSHUB_INSTANCE || "https://rsshub.ktachibana.party";

/** 通用 RSSHub 抓取函数，带 fallback 实例 */
async function fetchRSSHub(path: string, max = 10): Promise<ReturnType<typeof toNewsItems>> {
	const instances = [
		RSSHUB,
		"https://rsshub.pseudoyu.com",
		"https://rsshub.ktachibana.party",
	];

	for (const instance of instances) {
		try {
			const xml = await fetchText(`${instance}${path}`);
			const items = toNewsItems(parseRSS(xml));
			if (items.length > 0) return items.slice(0, max);
		} catch {
			continue;
		}
	}
	return [];
}

// ====== 知乎 ======

/**
 * 知乎日报 - 每日精选内容
 * 路由: /zhihu/daily
 * 知乎反爬严格，仅日报路由相对稳定
 */
export const zhihuDaily: NewsSource = {
	name: "知乎日报",
	lang: "zh",
	fetch: () => fetchRSSHub("/zhihu/daily", 10),
};

/**
 * 知乎热榜
 * 路由: /zhihu/hotlist
 * 可能受限于实例的请求频率
 */
export const zhihuHotlist: NewsSource = {
	name: "知乎热榜",
	lang: "zh",
	fetch: () => fetchRSSHub("/zhihu/hotlist", 10),
};

// ====== 豆瓣小组 ======

/**
 * 豆瓣小组：游戏开发相关
 * 豆瓣小组反爬相对宽松，RSSHub 可稳定抓取
 */

/** 豆瓣小组：游戏开发 */
export const doubanGameDev: NewsSource = {
	name: "豆瓣 游戏开发",
	lang: "zh",
	fetch: () => fetchRSSHub("/douban/group/459936", 10),
};

/** 豆瓣小组：独立游戏 */
export const doubanIndieGame: NewsSource = {
	name: "豆瓣 独立游戏",
	lang: "zh",
	fetch: () => fetchRSSHub("/douban/group/490338", 10),
};
