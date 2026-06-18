/**
 * cheerio HTML 抓取源
 *
 * 对完全没有 RSS/API 的网站，直接下载 HTML 用 CSS 选择器提取内容。
 * 依赖 scripts/utils/html-scraper.ts 中的 scrapeList / scrapeCustom 函数。
 *
 * 适用场景：
 * - 论坛列表页（如 Discuz!、PHPBB）
 * - 无 RSS 的博客/新闻列表
 * - JavaScript 渲染较轻的页面
 *
 * 注意：抓取依赖页面 DOM 结构，网站改版可能导致选择器失效。
 */

import { scrapeList, scrapeCustom } from "../utils/html-scraper";
import type { NewsSource } from "../utils/types";

// ====== GameRes 论坛（bbs.gameres.com） ======

/**
 * GameRes 论坛是中文游戏开发者社区，使用 Discuz! 系统。
 * 抓取其「游戏策划」「游戏程序」「游戏美术」三个核心版块。
 */

/** GameRes 论坛 - 游戏策划版 */
export const gameresDesign: NewsSource = {
	name: "GameRes 策划",
	lang: "zh",
	fetch: async () => {
		return scrapeList(
			"https://bbs.gameres.com/forum.php?mod=forumdisplay&fid=36",
			{
				container: "tbody[id^=normalthread]",
				title: { selector: "a.s.xst" },
				link: { selector: "a.s.xst", attr: "href" },
				date: { selector: "td.by:nth-child(3) em" },
			},
			10,
		);
	},
};

/** GameRes 论坛 - 游戏程序版 */
export const gameresProg: NewsSource = {
	name: "GameRes 程序",
	lang: "zh",
	fetch: async () => {
		return scrapeList(
			"https://bbs.gameres.com/forum.php?mod=forumdisplay&fid=37",
			{
				container: "tbody[id^=normalthread]",
				title: { selector: "a.s.xst" },
				link: { selector: "a.s.xst", attr: "href" },
				date: { selector: "td.by:nth-child(3) em" },
			},
			10,
		);
	},
};

/** GameRes 论坛 - 游戏美术版 */
export const gameresArt: NewsSource = {
	name: "GameRes 美术",
	lang: "zh",
	fetch: async () => {
		return scrapeList(
			"https://bbs.gameres.com/forum.php?mod=forumdisplay&fid=38",
			{
				container: "tbody[id^=normalthread]",
				title: { selector: "a.s.xst" },
				link: { selector: "a.s.xst", attr: "href" },
				date: { selector: "td.by:nth-child(3) em" },
			},
			10,
		);
	},
};

// ====== 独立游戏开发日志聚合 ======

/**
 * Indie Game Devlogs 从 itch.io 的开发日志版块抓取最新内容。
 * Itch.io 是最大的独立游戏分发平台，其开发日志版块有大量优质内容。
 */

export const itchDevlogs: NewsSource = {
	name: "Itch.io Devlogs",
	lang: "en",
	fetch: async () => {
		return scrapeCustom("https://itch.io/board/10021/devlogs", ($) => {
			const items: any[] = [];
			$(".community_board_post")
				.slice(0, 10)
				.each((_i, el) => {
					const $el = $(el);
					const title = $el.find(".post_title a").text().trim();
					const link = $el.find(".post_title a").attr("href") || "";
					const author = $el.find(".post_author a").text().trim();
					if (title && link) {
						items.push({
							id: link,
							title,
							url: link.startsWith("http") ? link : `https://itch.io${link}`,
							extra: {
								info: author ? `by ${author}` : undefined,
							},
						});
					}
				});
			return items;
		});
	},
};

// ====== 掘金游戏开发最新文章 ======

/**
 * 掘金 (juejin.cn) 已有官方 RSS，但该路由提供更及时的最新文章列表。
 * 同时作为 scrapeList 的演示。
 */

export const juejinGameDev: NewsSource = {
	name: "掘金 游戏开发(new)",
	lang: "zh",
	fetch: async () => {
		return scrapeList(
			"https://juejin.cn/game",
			{
				container: ".entry-list > div",
				title: { selector: ".title-row a" },
				link: { selector: ".title-row a", attr: "href" },
				date: { selector: "time", attr: "datetime" },
			},
			10,
		);
	},
};
