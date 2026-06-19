import { useMemo, useState } from "react";
import data from "../data/news.json";
import Navbar from "./components/Navbar";
import CardColumn from "./components/CardColumn";
import Footer from "./components/Footer";
import type { NewsItem, Lang } from "../scripts/utils/types";

const LANG_LABELS: Record<Lang, string> = {
	all: "全部",
	zh: "中文",
	en: "English",
	ja: "日本語",
	steam: "Steam",
};

const LANG_MAP: Record<string, Lang> = {
	"GamesIndustry.biz": "en",
	"80 Level": "en",
	"PC Gamer": "en",
	"Rock Paper Shotgun": "en",
	VG247: "en",
	"Unity Blog": "en",
	"Hacker News": "en",
	"Godot Releases": "en",
	"Reddit r/gamedev": "en",
	GameFromScratch: "en",
	IndieGamesPlus: "en",
	"Raph Koster": "en",
	"Dan Felder": "en",
	ChaoticStupid: "en",
	ManiaHero: "zh",
	PlayTank: "en",
	JGallant: "en",
	"Games by Mason": "en",
	"Top Hat Games": "en",
	"Lost Garden": "en",
	"Gamedev Unchained": "en",
	Necromanov: "zh",
	"Steam 热销": "steam",
	"Steam 新品": "steam",
	"Steam 特惠": "steam",
	"Steam 即将推出": "steam",

	"Humble Bundle": "en",
	"PlayStation Blog": "en",
	"Frictional Games": "en",
	"Raw Fury": "en",
	ConcernedApe: "en",
	Capcom: "en",
	"Ludeon Studios": "en",
	"Flax Engine": "en",
	HaxeFlixel: "en",
	"Ren'Py": "en",
	"Bevy Engine": "en",
	"Godot Blog": "en",
	"Defold Engine": "en",
	O3DE: "en",

	机核网: "zh",

	游戏陀螺: "zh",
	游戏茶馆: "zh",
	"Indienova 独立游戏": "zh",
	GameLook: "zh",
	狐王驾虎: "zh",
	博毅创为: "zh",
	云风: "zh",
	增荣博客: "zh",
	触乐: "zh",
	"鵺 游戏设计": "zh",

	"4Gamer.net": "ja",
	AUTOMATON: "ja",
	電ファミニコゲーマー: "ja",
	インサイド: "ja",
	ゲームメーカーズ: "ja",
	IndieGamesJapan: "ja",
	"IGDA Japan": "ja",
	"IndieGamesJp.dev": "ja",
	"Game Coding Classics": "ja",
	ARASHIYAMA: "ja",
	"Aiming 開発者ブログ": "ja",
	"GREE Tech": "ja",
	"KAYAC Tech Blog": "ja",
	"SEGA Tech Blog": "ja",
	"Applibot Tech": "ja",
	"Journal of Stuff": "en",
	"Más Bandwidth": "en",
	"Nicky Case": "en",
	"League of GameMakers": "en",
	randomascii: "en",
	Slembcke: "en",
	"Red Blob Games": "en",
	"Game Wisdom": "en",
	"Catnap Games": "en",
	"Rampant Games": "en",
	Cliffski: "en",
	"Alan Zucconi": "en",
	"GameWorld Observer": "en",
	"GameDev Academy": "en",
	"Rat King": "en",
	"Push to Talk": "en",
	Distractionware: "en",
	设计者笔记: "zh",
	ResetEra: "en",
	"AI Gamechangers": "en",
	"AI and Games": "en",
	"NVIDIA Game Dev": "en",
	"Unreal Engine Blog": "en",
	"Grid Sage Games": "en",
	"GameRes 策划": "zh",
	"GameRes 程序": "zh",
	"GameRes 美术": "zh",
	"NGA 游戏策划": "zh",
	"NGA 独立游戏": "zh",
	"NGA 游戏技术": "zh",
	"NGA 程序技术": "zh",
	"GameRes 游资网": "zh",
	游戏邦: "zh",
	"掘金 游戏开发": "zh",
	"SegmentFault 游戏开发": "zh",
	"博客园 游戏开发": "zh",
	"Qiita ゲーム開発": "ja",
	"Qiita ゲームデザイン": "ja",
	"Qiita Godot": "ja",
	"Qiita UnrealEngine": "ja",
	"Qiita Unity": "ja",
	"Zenn gamedev": "ja",

	"Psychology of Games": "en",
	"Keith Burgun": "en",
	GDKeys: "en",
	"Mechanics as Metaphor": "en",
	"Level 99 Strategy": "en",
	"Strategy Game Studio": "en",
	Dorophone: "en",
	"Captain of Industry": "en",
	"Transport Fever 3": "en",
	"Pocket City": "en",
	"Jonas Meyer-Ohle": "en",
	"Cannibal Halfling": "en",
};

/** 格式化 pubDate 为相对时间文本 */
function formatRelative(pubDate: string | undefined): string {
	if (!pubDate) return "";
	const diff = Date.now() - new Date(pubDate).getTime();
	if (diff < 60000) return "刚刚";
	if (diff < 3600000) return `${Math.floor(diff / 60000)}分钟前`;
	if (diff < 86400000) return `${Math.floor(diff / 3600000)}小时前`;
	return `${Math.floor(diff / 86400000)}天前`;
}

export default function App() {
	const [lang, setLang] = useState<Lang>("all");

	const isSteam = lang === "steam";

	/** 按时间线模式：合并非 steam 源，排序，每 5 条一组 */
	const timelineChunks = useMemo(() => {
		if (isSteam) return [];
		const sources = data.sources as unknown as Record<string, NewsItem[]>;
		const all: (NewsItem & { _ts: number })[] = [];

		for (const [name, items] of Object.entries(sources)) {
			const l = LANG_MAP[name] || "en";
			if (l === "steam") continue;
			if (lang !== "all" && l !== lang) continue;

			for (const item of items) {
				const ts = item.pubDate ? new Date(item.pubDate).getTime() : 0;
				all.push({
					...item,
					sourceName: item.sourceName || name,
					_ts: ts,
				});
			}
		}

		all.sort((a, b) => b._ts - a._ts);

		const chunks: NewsItem[][] = [];
		for (let i = 0; i < all.length; i += 5) {
			chunks.push(all.slice(i, i + 5));
		}
		return chunks;
	}, [lang, isSteam]);

	/** Steam 模式：按源分列 */
	const entries = useMemo(() => {
		if (!isSteam) return [];
		const sources = data.sources as unknown as Record<string, NewsItem[]>;
		return Object.entries(sources)
			.filter(([, items]) => items.length > 0)
			.filter(([name]) => LANG_MAP[name] === "steam")
			.sort((a, b) => {
				const ta = a[1][0]?.pubDate ? new Date(a[1][0].pubDate).getTime() : 0;
				const tb = b[1][0]?.pubDate ? new Date(b[1][0].pubDate).getTime() : 0;
				return tb - ta;
			})
			.map(
				([name, items]) => [name, items.slice(0, 10)] as [string, NewsItem[]],
			);
	}, [isSteam]);

	const langCounts = useMemo(() => {
		const sources = data.sources as unknown as Record<string, NewsItem[]>;
		const counts: Record<string, number> = { all: 0 };
		for (const [name, items] of Object.entries(sources)) {
			const l = LANG_MAP[name] || "en";
			counts[l] = (counts[l] || 0) + items.length;
			counts.all += items.length;
		}
		return counts as Record<Lang, number>;
	}, []);

	return (
		<div className="app">
			<Navbar
				lang={lang}
				onLangChange={setLang}
				counts={langCounts}
				updatedAt={data.updatedAt}
				labels={LANG_LABELS}
			/>
			{isSteam ? (
				<main className="columns">
					{entries.map(([name, items]) => (
						<CardColumn key={name} name={name} items={items} />
					))}
				</main>
			) : (
				<main className="timeline">
					{timelineChunks.map((chunk, i) => (
						<div key={i} className="time-card">
							{chunk.map((item) => (
								<a
									key={item.id}
									className="time-row"
									href={item.url}
									target="_blank"
									rel="noopener noreferrer"
									title={item.extra?.hover}
								>
									<span className="row-title">{item.title}</span>
									<span className="row-source">{item.sourceName}</span>
									<span className="row-time">
										{item.extra?.info || formatRelative(item.pubDate)}
									</span>
								</a>
							))}
						</div>
					))}
				</main>
			)}
			<Footer />
		</div>
	);
}
