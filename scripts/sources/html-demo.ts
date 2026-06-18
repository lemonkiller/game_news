import { scrapeList, scrapeCustom } from "../utils/html-scraper";
import type { NewsSource } from "../utils/types";

/**
 * 演示：通过 HTML 抓取无 RSS 的网站
 *
 * 工作原理：
 * 1. fetchText() 下载页面 HTML（10 秒超时，自动重试）
 * 2. cheerio 解析 DOM
 * 3. 根据 CSS 选择器提取：标题、链接、日期
 * 4. 转为标准的 NewsItem[]
 *
 * 如果目标网站返回 403/超时（如 TIGSource），说明有反爬。
 * 解决方案：在 GitHub Actions 上用更完整的 User-Agent 即可。
 */

// ─── 示例 1：用 scrapeList 简化抓取 ───
export const tigsource: NewsSource = {
	name: "TIGSource Forums",
	lang: "en",
	fetch: async () => {
		return scrapeList(
			"https://forums.tigsource.com/index.php?board=3.0",
			{
				container: "tr:has(td.subject)", // 每行是一篇帖子
				title: { selector: "a.quickmod", attr: "title" },
				link: { selector: "a.quickmod", attr: "href" },
				date: { selector: "td:last-child", attr: "title" },
			},
			10,
		);
	},
};

// ─── 示例 2：用 scrapeCustom 处理复杂页面 ───
export const epicGamesDev: NewsSource = {
	name: "Epic Games Dev",
	lang: "en",
	fetch: async () => {
		return scrapeCustom("https://dev.epicgames.com/community/feed", ($) => {
			const items: any[] = [];
			$("article")
				.slice(0, 10)
				.each((_i, el) => {
					const $el = $(el);
					const title = $el.find("h2 a").text().trim();
					const link = $el.find("h2 a").attr("href") || "";
					const date = $el.find("time").attr("datetime");
					const desc = $el.find("p").first().text().trim();
					if (title && link) {
						items.push({
							id: link,
							title,
							url: link.startsWith("http")
								? link
								: `https://dev.epicgames.com${link}`,
							pubDate: date || undefined,
							extra: {
								info: date || undefined,
								hover: desc.slice(0, 200),
							},
						});
					}
				});
			return items;
		});
	},
};
