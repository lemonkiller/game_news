/**
 * 游戏美术/像素美术信息源
 * Mega Voxels - 像素/Voxel 艺术教程
 * OpenGameArt - 免费游戏美术资源发布
 * Agate Dragon - 像素艺术博客
 * MastaFran - 像素艺术博客/作品
 */
import { fetchText } from "../utils/fetcher";
import { parseRSS, toNewsItems } from "../utils/rss-parser";
import type { NewsSource } from "../utils/types";

/** Mega Voxels - 像素/Voxel 艺术教程 */
export const megaVoxels: NewsSource = {
	name: "Mega Voxels",
	lang: "en",
	fetch: async () => {
		const xml = await fetchText("https://www.megavoxels.com/feed/");
		return toNewsItems(parseRSS(xml)).slice(0, 5);
	},
};

/** OpenGameArt - 免费游戏美术资源发布更新 */
export const openGameArt: NewsSource = {
	name: "OpenGameArt",
	lang: "en",
	fetch: async () => {
		const xml = await fetchText("https://opengameart.org/rss.xml");
		return toNewsItems(parseRSS(xml)).slice(0, 5);
	},
};

/** Agate Dragon - 像素艺术博客 */
export const agateDragon: NewsSource = {
	name: "Agate Dragon",
	lang: "en",
	fetch: async () => {
		const xml = await fetchText("https://agatedragon.blog/feed/");
		return toNewsItems(parseRSS(xml)).slice(0, 5);
	},
};

/** MastaFran - 像素艺术博客 */
export const mastaFran: NewsSource = {
	name: "MastaFran",
	lang: "en",
	fetch: async () => {
		const xml = await fetchText("https://www.mastafran.com/feed/");
		return toNewsItems(parseRSS(xml)).slice(0, 5);
	},
};
