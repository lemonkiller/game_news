import { useMemo, useState, useEffect, useRef } from "react";
import data from "../data/news.json";
import Navbar from "./components/Navbar";
import type { NewsItem, Lang } from "../scripts/utils/types";
import { getLinksByCategory } from "../scripts/sources/link-sources";
import { quotes } from "../scripts/utils/quotes";
import { detectLanguage } from "./i18n";

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
	"Zenn UIUX设计": "ja",
	hanasaqutto: "ja",
	"Can I Play That?": "en",
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
	GameDiscoverCo: "en",

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

type LangFilter = "all" | "zh" | "en" | "ja";

const FILTER_KEYS: LangFilter[] = ["all", "zh", "en", "ja"];

const FILTER_LABELS: Record<LangFilter, string> = {
	all: "全部",
	zh: "中文",
	en: "English",
	ja: "日本語",
};

/** 判断是否在1个月内 */
function isWithinMonth(pubDate: string | undefined): boolean {
	if (!pubDate) return false;
	const d = new Date(pubDate);
	if (isNaN(d.getTime())) return false;
	const diff = Date.now() - d.getTime();
	return diff <= 30 * 86400000;
}

/** 格式化时间显示 */
function formatItemTime(pubDate: string | undefined): string {
	if (!pubDate) return "";
	const d = new Date(pubDate);
	if (isNaN(d.getTime())) return pubDate;
	const diff = Date.now() - d.getTime();
	const mins = Math.floor(diff / 60000);
	if (mins < 1) return "刚刚";
	if (mins < 60) return `${mins} 分钟前`;
	const hours = Math.floor(mins / 60);
	if (hours < 24) return `${hours} 小时前`;
	const days = Math.floor(hours / 24);
	if (days < 30) return `${days} 天前`;
	const month = d.getMonth() + 1;
	const day = d.getDate();
	return `${String(month).padStart(2, "0")}月${String(day).padStart(2, "0")}日`;
}

export default function App() {
	const [view, setView] = useState<"news" | "links">("news");
	const [langFilter, setLangFilter] = useState<LangFilter>("all");
	const [dailyQuote, setDailyQuote] = useState<(typeof quotes)[0] | null>(null);

	useEffect(() => {
		setDailyQuote(quotes[Math.floor(Math.random() * quotes.length)]);
	}, [view]);

	/** 所有链接数据（按分类分组） */
	const linkCategories = useMemo(() => {
		return Object.entries(getLinksByCategory());
	}, []);



	/** 按语言筛选后的最近50条新闻 */
	const recentNews = useMemo(() => {
		const sources = data.sources as unknown as Record<string, NewsItem[]>;
		const items: (NewsItem & { sourceName: string })[] = [];

		for (const [name, sourceItems] of Object.entries(sources)) {
			if (name === "开发工具链接") continue;
			const l = LANG_MAP[name] || "en";
			if (langFilter !== "all" && l !== langFilter) continue;

			for (const item of sourceItems) {
				if (!item.url) continue;
				if (!isWithinMonth(item.pubDate)) continue;
				items.push({
					...item,
					sourceName: item.sourceName || name,
				});
			}
		}

		items.sort((a, b) => {
			const ta = a.pubDate ? new Date(a.pubDate).getTime() : 0;
			const tb = b.pubDate ? new Date(b.pubDate).getTime() : 0;
			return tb - ta;
		});

		return items.slice(0, 50);
	}, [langFilter]);

	const contentRef = useRef<HTMLDivElement>(null);

	/** 切换标签时滚动到顶部 */
	useEffect(() => {
		if (contentRef.current) {
			contentRef.current.scrollTop = 0;
		}
	}, [view]);

	function scrollToCategory(category: string) {
		const el = document.getElementById(`cat-${category}`);
		if (el && contentRef.current) {
			const top = el.offsetTop - contentRef.current.offsetTop;
			contentRef.current.scrollTo({ top, behavior: "smooth" });
		}
	}

	return (
		<div className="app">
			<Navbar
				view={view}
				onViewChange={setView}
				updatedAt={data.updatedAt}
				quote={dailyQuote}
				uiLang={uiLang}
			/>
			{view === "links" ? (
				<main className="links-page">
					<nav className="links-sidebar">
						{linkCategories.map(([category]) => (
							<a
								key={category}
								className="sidebar-link"
								href={`#cat-${category}`}
								onClick={(e) => {
									e.preventDefault();
									scrollToCategory(category);
								}}
							>
								{category}
							</a>
						))}
					</nav>
					<div ref={contentRef} key="links" className="links-content">
						{linkCategories.map(([category, items]) => (
							<section
								key={category}
								id={`cat-${category}`}
								className="link-category"
							>
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
				<main className="links-page">
					<nav className="links-sidebar">
						{FILTER_KEYS.map((k) => (
							<button
								key={k}
								className={`sidebar-link${langFilter === k ? " active" : ""}`}
								onClick={() => setLangFilter(k)}
							>
								{FILTER_LABELS[k]}
							</button>
						))}
					</nav>
					<div ref={contentRef} key={langFilter} className="links-content">
						<div className="time-group">
							{recentNews.length === 0 && (
								<div className="news-empty">暂无内容</div>
							)}
							{recentNews.map((item) => (
								<a
									key={item.id}
									className="news-item"
									href={item.url}
									target="_blank"
									rel="noopener noreferrer"
								>
									<span className="news-source">{item.sourceName}</span>
									<span className="news-title">{item.title}</span>
									<span className="news-time">
										{formatItemTime(item.pubDate)}
									</span>
								</a>
							))}
						</div>
					</div>
				</main>
			)}
		</div>
	);
}
