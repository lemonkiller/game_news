/**
 * 知乎搜索 - 游戏开发/设计相关内容
 * 使用知乎开放平台搜索 API，需配置 ZHIHU_ACCESS_SECRET 环境变量
 * API: https://developer.zhihu.com/api/v1/content/zhihu_search
 */
import { fetchWithTimeout } from "../../utils/fetcher";
import type { NewsSource, NewsItem } from "../../utils/types";

interface ZhihuItem {
	Title?: string;
	Url?: string;
	ContentText?: string;
	EditTime?: number;
	AuthorName?: string;
	VoteUpCount?: number;
	CommentCount?: number;
	ContentType?: string;
}

interface ZhihuResponse {
	Code?: number;
	Data?: {
		Items?: ZhihuItem[];
	};
}

/** 搜索游戏开发/设计相关的知乎内容 */
async function searchZhihu(query: string, label: string): Promise<NewsItem[]> {
	const secret = process.env.ZHIHU_ACCESS_SECRET;
	if (!secret) {
		console.warn("[zhihu] 未设置 ZHIHU_ACCESS_SECRET，跳过知乎搜索");
		return [];
	}

	const queryEncoded = encodeURIComponent(query);
	const url = `https://developer.zhihu.com/api/v1/content/zhihu_search?Query=${queryEncoded}`;
	const timestamp = Math.floor(Date.now() / 1000);

	try {
		const res = await fetchWithTimeout(url, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${secret}`,
				"X-Request-Timestamp": String(timestamp),
				"Content-Type": "application/json",
			},
		});

		if (!res.ok) {
			console.warn(`[zhihu] API ${res.status}: ${res.statusText}`);
			return [];
		}

		const data: ZhihuResponse = await res.json();

		if (data.Code !== 0 || !data.Data?.Items || data.Data.Items.length === 0) {
			console.warn(`[zhihu] 搜索无结果: code=${data.Code}`);
			return [];
		}

		return data.Data.Items.slice(0, 10).map((item, i) => {
			// 清理 URL 中的 utm 参数
			const cleanUrl =
				item.Url?.replace(/\?utm_.*$/, "") || "https://www.zhihu.com/";
			// 截取内容摘要（最多 200 字）
			const summary = item.ContentText
				? item.ContentText.replace(/\s+/g, " ").slice(0, 200) +
					(item.ContentText.length > 200 ? "..." : "")
				: "";

			return {
				id: `zhihu-${label}-${Date.now()}-${i}`,
				title: item.Title || "知乎搜索结果",
				url: cleanUrl,
				pubDate: item.EditTime
					? new Date(item.EditTime * 1000).toISOString()
					: new Date().toISOString(),
				sourceName: `知乎`,
				summary: summary,
			};
		});
	} catch (err) {
		console.warn(`[zhihu] 搜索失败: ${err}`);
		return [];
	}
}

/** 知乎游戏开发搜索 */
export const zhihuGameDev: NewsSource = {
	name: "知乎游戏开发",
	lang: "zh",
	fetch: async () => searchZhihu("游戏开发", "gamedev"),
};

/** 知乎游戏设计搜索 */
export const zhihuGameDesign: NewsSource = {
	name: "知乎游戏设计",
	lang: "zh",
	fetch: async () => searchZhihu("游戏设计", "gamedesign"),
};

/** 知乎独立游戏搜索 */
export const zhihuIndie: NewsSource = {
	name: "知乎独立游戏",
	lang: "zh",
	fetch: async () => searchZhihu("独立游戏", "indie"),
};
