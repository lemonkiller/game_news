import { useMemo, useState, useEffect } from "react";
import data from "../data/news.json";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import type { NewsItem, Lang } from "../scripts/utils/types";
import { relativeTime } from "../scripts/utils/rss-parser";
import { getLinksByCategory } from "../scripts/sources/link-sources";
import { quotes } from "../scripts/utils/quotes";
import { detectLanguage, TAB_LABELS } from "./i18n";

const LANG_MAP: Record<string, Lang> = {
	"GamesIndustry.biz": "en",
	"80 Level": "en",
	VG247: "en",
	"Unity Blog": "en",
	"Hacker News": "en",
	"Godot Releases": "en",
	GameFromScratch: "en",
	IndieGamesPlus: "en",
	"Raph Koster": "en",
	"Dan Felder": "en",
	ChaoticStupid: "en",
	ManiaHero: "zh",
	PlayTank: "en",

	"Games by Mason": "en",
	"Top Hat Games": "en",
	"Lost Garden": "en",
	"Gamedev Unchained": "en",
	Necromanov: "zh",

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
	IndieDevGames: "en",
	"Chaotican Writer": "en",
	"New to Narrative": "en",
	"Orfeas Eleftheriou": "en",
	Ogre3D: "en",
	"NVIDIA Unreal Engine": "en",
	"Zenn 游戏引擎": "ja",
	"Zenn UnrealEngine": "ja",
	"Zenn Godot": "ja",
	"Zenn Unity": "ja",
	"Zenn Bevy": "ja",
	"Zenn 游戏设计": "ja",
	"Zenn 创作": "ja",
	"Zenn UI/UX": "ja",
	"Zenn 写作": "ja",

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
	"AI and Games": "en",
	"NVIDIA Game Dev": "en",
	"Sorceress Games": "en",
	"Generative GameDev": "en",

	"Ryan Fitzpatrick": "en",
	BorisTheBrave: "en",
	"Unreal Engine Blog": "en",
	"Grid Sage Games": "en",
	"Aseprite Blog": "en",
	Panda3D: "en",

	"AMD GPUOpen": "en",
	"Blender Dev Blog": "en",
	"Game Dev Essentials": "en",
	"Blender News": "en",

	"Qiita ゲーム開発": "ja",
	"Qiita ゲームデザイン": "ja",
	"Qiita Godot": "ja",
	"Qiita UnrealEngine": "ja",
	"Qiita Unity": "ja",
	"Zenn gamedev": "ja",
	"Qiita game AI": "ja",

	"24indie": "en",
	"Indie Informer": "en",
	"GameDiscoverCo": "en",

	"Mick West": "en",
	"wpbox.dev": "en",

	"VS Code Blog": "en",
	"GitHub Blog": "en",
	"JetBrains Blog": "en",
	"Stack Overflow Blog": "en",
	"Pragmatic Engineer": "en",

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

const uiLang = detectLanguage();

export default function App() {
	const [lang, setLang] = useState<Lang>("all");
	const [dailyQuote, setDailyQuote] = useState<(typeof quotes)[0] | null>(null);

	useEffect(() => {
		setDailyQuote(quotes[Math.floor(Math.random() * quotes.length)]);
	}, [lang]);

	const labels = uiLang ? TAB_LABELS[uiLang] : TAB_LABELS.en;

	const isLinks = lang === "links";

	/** 所有链接数据（按分类分组） */
	const linkCategories = useMemo(() => {
		if (!isLinks) return [];
		return Object.entries(getLinksByCategory());
	}, [isLinks]);

	/** 按时间线模式：合并所有源，排序，每 5 条一组 */
	const timelineChunks = useMemo(() => {
		const sources = data.sources as unknown as Record<string, NewsItem[]>;
		const all: (NewsItem & { _ts: number })[] = [];

		for (const [name, items] of Object.entries(sources)) {
			const l = LANG_MAP[name] || "en";
			if (name === "开发工具链接") continue; // 网址标签专用，不出现在信息流
			if (lang !== "all" && l !== lang) continue;

			for (const item of items) {
				if (!item.url) continue; // 跳过无链接条目
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
	}, [lang]);

	const langCounts = useMemo(() => {
		const sources = data.sources as unknown as Record<string, NewsItem[]>;
		const counts: Record<string, number> = { all: 0 };
		for (const [name, items] of Object.entries(sources)) {
			const l = LANG_MAP[name] || "en";
			counts[l] = (counts[l] || 0) + items.length;
			counts.all += items.length;
		}
		const links = getLinksByCategory();
		const linkCount = Object.values(links).flat().length;
		counts.links = linkCount;
		counts.all += linkCount;
		return counts as Record<Lang, number>;
	}, []);

	return (
		<div className="app">
			<Navbar
				lang={lang}
				onLangChange={setLang}
				counts={langCounts}
				labels={labels}
				updatedAt={data.updatedAt}
				quote={dailyQuote}
				uiLang={uiLang}
			/>
			{isLinks ? (
				<main className="links-page">
					<div className="links-content">
						{linkCategories.map(([category, items]) => (
							<section key={category} className="link-category">
								<h2 className="link-category-title">{category}</h2>
								{items.map((link) => (
									<a
										key={link.id}
										className="link-item"
										href={link.url}
										target="_blank"
										rel="noopener noreferrer"
										title={link.desc}
									>
										<span className="link-item-name">{link.title}</span>
										<span className="link-item-desc">{link.desc}</span>
										<span className="link-item-url">
											{new URL(link.url).hostname}
										</span>
									</a>
								))}
							</section>
						))}
					</div>
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
										{item.extra?.info || relativeTime(item.pubDate)}
									</span>
								</a>
							))}
						</div>
					))}
				</main>
			)}
			<Footer uiLang={uiLang} />
		</div>
	);
}
