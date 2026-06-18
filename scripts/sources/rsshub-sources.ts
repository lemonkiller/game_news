/**
 * RSSHub 桥接源
 *
 * RSSHub (https://rsshub.app) 是一个开源项目，可将 2000+ 网站转为标准 RSS。
 * 本文件中的源通过 RSSHub 获取那些没有原生 RSS 的网站内容。
 *
 * 注意：rsshub.app 从中国网络可能被屏蔽，但在 GitHub Actions 上正常工作。
 * 可改用其他公共实例：https://rsshub.bili.xyz / https://rsshub.artsanity.dev
 */

import { fetchText } from "../utils/fetcher";
import { parseRSS, toNewsItems } from "../utils/rss-parser";
import type { NewsSource } from "../utils/types";

const RSSHUB = "https://rsshub.app";

/** 通用 RSSHub 抓取函数 */
async function fetchRSSHub(path: string, max = 10) {
	const xml = await fetchText(`${RSSHUB}${path}`);
	return toNewsItems(parseRSS(xml)).slice(0, max);
}

// ====== 知乎专栏 ======

/** 知乎专栏：游戏设计/开发相关专栏 */
export const zhihuGameDevColumn: NewsSource = {
	name: "知乎 游戏设计开发",
	lang: "zh",
	fetch: () => fetchRSSHub("/zhihu/topics/19551475", 10),
};

/** 知乎专栏：独立游戏 */
export const zhihuIndieGame: NewsSource = {
	name: "知乎 独立游戏",
	lang: "zh",
	fetch: () => fetchRSSHub("/zhihu/topics/19550524", 10),
};

/** 知乎专栏：AI 游戏开发 */
export const zhihuAIGameDev: NewsSource = {
	name: "知乎 AI 游戏开发",
	lang: "zh",
	fetch: () => fetchRSSHub("/zhihu/column/c_1619115522095726592", 10),
};

// ====== B站 UP 主 ======

/** B站：游戏开发相关 UP 主（Milo 的游戏开发） */
export const bilibiliGameDev: NewsSource = {
	name: "B站 游戏开发",
	lang: "zh",
	fetch: () => fetchRSSHub("/bilibili/user/video/698403067", 10),
};

// ====== 微博 ======

/** 微博：游戏开发相关博主 */
export const weiboGameDev: NewsSource = {
	name: "微博 游戏开发",
	lang: "zh",
	fetch: () => fetchRSSHub("/weibo/user/6047394349", 10),
};
