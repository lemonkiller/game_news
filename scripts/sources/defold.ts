import type { NewsSource } from "../utils/types";
export const defold: NewsSource = {
	name: "Defold Engine",
	lang: "engine",
	fetch: async () => {
		const xml = await (
			await fetch("https://github.com/defold/defold/releases.atom", {
				headers: { "User-Agent": "Mozilla/5.0" },
			})
		).text();
		const items: any[] = [];
		const re = /<entry>([\s\S]*?)<\/entry>/g;
		let m;
		while ((m = re.exec(xml)) !== null) {
			const e = m[1];
			items.push({
				title: e.match(/<title[^>]*>([^<]*)<\/title>/)?.[1] || "",
				link: e.match(/<link[^>]*href="([^"]*)"/)?.[1] || "",
				id: e.match(/<id[^>]*>([^<]*)<\/id>/)?.[1] || "",
				date: e.match(/<published[^>]*>([^<]*)<\/published>/)?.[1],
			});
		}
		return items.slice(0, 5).map((i: any) => ({
			id: i.id,
			title: i.title,
			url: i.link,
			extra: {
				info: i.date ? new Date(i.date).toLocaleDateString("zh-CN") : "",
			},
		}));
	},
};
