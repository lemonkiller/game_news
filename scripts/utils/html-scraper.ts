import * as cheerio from "cheerio";
import { fetchText } from "./fetcher";
import type { NewsItem } from "./types";

/** 单个抓取规则 */
export interface ScrapeRule {
	/** 文章容器选择器（每篇文章一个） */
	container: string;
	/** 标题提取（文本或属性） */
	title: { selector: string; attr?: string };
	/** 链接提取 */
	link: { selector: string; attr?: string };
	/** 日期提取（可选） */
	date?: { selector: string; attr?: string };
	/** 摘要提取（可选） */
	summary?: { selector: string; attr?: string };
}

/** 自定义提取函数（用于复杂场景） */
export interface ScrapeHandler {
	($: cheerio.CheerioAPI): NewsItem[];
}

/** 从 cheerio 元素中提取文本或属性值 */
function extractField(
	$el: cheerio.Cheerio<any>,
	rule: { selector: string; attr?: string } | undefined,
): string | undefined {
	if (!rule) return undefined;
	const el = $el.find(rule.selector);
	if (rule.attr) {
		return el.attr(rule.attr) || undefined;
	}
	return el.text().trim() || undefined;
}

/**
 * 通过 HTML 选择器抓取列表页，返回 NewsItem[]
 *
 * @param url - 目标页面 URL
 * @param rule - 抓取规则
 * @param max - 最大条目数
 */
export async function scrapeList(
	url: string,
	rule: ScrapeRule,
	max = 10,
): Promise<NewsItem[]> {
	const html = await fetchText(url);
	const $ = cheerio.load(html);
	const items: NewsItem[] = [];

	$(rule.container)
		.slice(0, max)
		.each((_i: number, el: any) => {
			const $el = $(el);
			const title = extractField($el, rule.title) || "";
			const link = extractField($el, rule.link) || "";
			const dateStr = extractField($el, rule.date);
			const summaryStr = extractField($el, rule.summary);

			if (!title || !link) return;

			const fullLink = link.startsWith("http") ? link : new URL(link, url).href;

			let pubDate: string | undefined;
			if (dateStr) {
				const d = new Date(dateStr);
				if (!isNaN(d.getTime())) pubDate = d.toISOString();
			}

			items.push({
				id: fullLink,
				title,
				url: fullLink,
				pubDate,
				extra: {
					info: dateStr || undefined,
					hover: summaryStr?.slice(0, 200),
				},
			});
		});

	return items;
}

/**
 * 通过自定义函数抓取（用于复杂页面）
 */
export async function scrapeCustom(
	url: string,
	handler: ScrapeHandler,
): Promise<NewsItem[]> {
	const html = await fetchText(url);
	const $ = cheerio.load(html);
	return handler($);
}
