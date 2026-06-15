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
	engine: "引擎",
	company: "公司",
	community: "社区",
};

const LANG_MAP: Record<string, Lang> = {
	"GamesIndustry.biz": "en",
	"80 Level": "en",
	"PC Gamer": "en",
	"Rock Paper Shotgun": "en",
	VG247: "en",
	"Unity Blog": "engine",
	"Hacker News": "en",
	"Godot Releases": "engine",
	"Reddit r/gamedev": "en",
	GameFromScratch: "en",
	IndieGamesPlus: "en",
	"Raph Koster": "en",
	"Dan Felder": "en",
	ChaoticStupid: "en",
	ManiaHero: "zh",
	PlayTank: "en",
	JGallant: "en",
	IndieDB: "en",
	"Games by Mason": "en",
	"Top Hat Games": "en",
	"Lost Garden": "en",
	"Gamedev Unchained": "en",
	Necromanov: "zh",
	"Steam 热销": "steam",
	"Steam 新品": "steam",
	"Steam 特惠": "steam",
	"Steam 即将推出": "steam",
	"Steam 热销 (CN)": "steam",
	"Steam 热销 (US)": "steam",
	"Steam 热销 (JP)": "steam",
	"Humble Bundle": "en",
	"PlayStation Blog": "company",
	"Frictional Games": "company",
	"Raw Fury": "company",
	ConcernedApe: "company",
	Capcom: "company",
	"Ludeon Studios": "company",
	"Flax Engine": "engine",
	HaxeFlixel: "engine",
	"Ren'Py": "engine",
	"Bevy Engine": "engine",
	"Godot Blog": "engine",
	"Defold Engine": "engine",
	"r/gamedev": "community",
	"r/GameDesign": "community",
	"r/IndieDev": "community",
	"r/gameideas": "community",
	"r/BaseBuildingGames": "community",
	"r/4Xgaming": "community",
	"r/aigamedev": "community",
	"r/leveldesign": "community",
	"r/gameengines": "community",
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
	付之一笑: "zh",
	奇个旦: "zh",
	ResetEra: "community",
	"NGA 游戏策划": "community",
	"NGA 独立游戏": "community",
	"NGA 游戏技术": "community",
	"NGA 程序技术": "community",
	"GameRes 游资网": "zh",
	"游戏邦": "zh",
	"掘金 游戏开发": "zh",
	"SegmentFault 游戏开发": "zh",
	"博客园 游戏开发": "zh",
	"Qiita ゲーム開発": "community",
	"Qiita ゲームデザイン": "community",
	"Qiita Godot": "community",
	"Qiita UnrealEngine": "community",
	"Qiita Unity": "community",
	"Zenn gamedev": "community",
	O3DE: "engine",

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
	"OSAKANA LABO": "ja",
	"Aiming 開発者ブログ": "ja",
	"GREE Tech": "ja",
	"KAYAC Tech Blog": "ja",
	"SEGA Tech Blog": "ja",
	"Applibot Tech": "ja",
	"dev.to gamedev": "en",
	"dev.to gamedesign": "en",
	"dev.to indiedev": "en",
	"dev.to game": "en",
	"Journal of Stuff": "en",
	"Más Bandwidth": "en",
	"Nicky Case": "en",
	"League of GameMakers": "en",
	randomascii: "en",
	Slembcke: "en",
};

export default function App() {
	const [lang, setLang] = useState<Lang>("all");

	/** 将 extra.info 的相对时间文本近似解析为时间戳，用于排序 */
	function parseInfoToTs(info: string | undefined): number {
		if (!info) return 0;
		if (info.includes("刚刚")) return Date.now();
		const m = info.match(/(\d+)\s*分钟前/);
		if (m) return Date.now() - parseInt(m[1]) * 60000;
		const h = info.match(/(\d+)\s*小时前/);
		if (h) return Date.now() - parseInt(h[1]) * 3600000;
		const d = info.match(/(\d+)\s*天前/);
		if (d) return Date.now() - parseInt(d[1]) * 86400000;
		return 0;
	}

	/** 获取一列中最新一条的时间戳 */
	function columnMaxTs(items: NewsItem[]): number {
		let max = 0;
		for (const item of items) {
			// 优先用 pubDate
			if (item.pubDate) {
				const ts = new Date(item.pubDate).getTime();
				if (!isNaN(ts) && ts > max) max = ts;
			}
			// 回退到 extra.info 的文本解析
			const fallback = parseInfoToTs(item.extra?.info);
			if (fallback > max) max = fallback;
		}
		return max;
	}

	// 只显示有数据的非空列，按最新更新时间降序排列
	const entries = useMemo(() => {
		const sources = data.sources as unknown as Record<string, NewsItem[]>;
		return Object.entries(sources)
			.filter(([, items]) => items.length > 0)
			.filter(([name]) => lang === "all" || LANG_MAP[name] === lang)
			.sort((a, b) => columnMaxTs(b[1]) - columnMaxTs(a[1]));
	}, [lang]);

	const langCounts = useMemo(() => {
		const sources = data.sources as unknown as Record<string, NewsItem[]>;
		const counts: Record<Lang, number> = {
			all: 0,
			zh: 0,
			en: 0,
			ja: 0,
			steam: 0,
			engine: 0,
			company: 0,
			community: 0,
		};
		for (const [name, items] of Object.entries(sources)) {
			const l = LANG_MAP[name] || "en";
			counts[l] += items.length;
			counts.all += items.length;
		}
		return counts;
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
			<main className="columns">
				{entries.map(([name, items]) => (
					<CardColumn key={name} name={name} items={items.slice(0, 5)} />
				))}
			</main>
			<Footer />
		</div>
	);
}
