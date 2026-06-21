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
	"Game Developer": "en",
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

const SOCIAL_SOURCE_NAMES = new Set([
	/* 新增实时社交 */
	"Hacker News 游戏开发",
	"HN Show 游戏",
	"Reddit r/gamedev",
	"Reddit r/godot",
	"Reddit r/Unity3D",
	"Reddit r/unrealengine",
	"Mastodon 游戏开发",
	"Bluesky 游戏开发",
	"GitHub 游戏开发趋势",
	"Godot Release",
	"Bevy Release",
	"Flax Release",
	"Lemmy 游戏开发",
	"Lemmy Godot",
	"Lemmy Unity",
	"Lemmy 游戏设计",
	"Lemmy 游戏开发（lemmy.world）",
	"Lemmy Godot（lemmy.world）",
	"Lemmy Unreal Engine",
	"Lemmy 独立游戏",
	"Lemmy 游戏开发（sh.itjust.works）",
	"Lemmy Unreal Engine（sh.itjust.works）",
	/* 原新闻中的论坛/社区类 */
	"Hacker News",
	"ResetEra",
	"Qiita ゲーム開発",
	"Qiita ゲームデザイン",
	"Qiita Godot",
	"Qiita UnrealEngine",
	"Qiita Unity",
	"Qiita game AI",
	"Zenn gamedev",
	"Zenn 游戏引擎",
	"Zenn UnrealEngine",
	"Zenn Godot",
	"Zenn Unity",
	"Zenn Bevy",
	"Zenn 游戏设计",
	"Zenn 创作",
	"Zenn UI/UX",
	"Zenn 写作",
	"Zenn UIUX设计",
]);

/** 社交源名 → 平台分组标签 */
const SOCIAL_PLATFORM: Record<string, string> = {
	/* 新增实时社交 */
	"Hacker News 游戏开发": "Hacker News",
	"HN Show 游戏": "Hacker News",
	"Reddit r/gamedev": "论坛",
	"Reddit r/godot": "论坛",
	"Reddit r/Unity3D": "论坛",
	"Reddit r/unrealengine": "论坛",
	"Mastodon 游戏开发": "Mastodon",
	"Bluesky 游戏开发": "Bluesky",
	"GitHub 游戏开发趋势": "GitHub",
	"Godot Release": "GitHub",
	"Bevy Release": "GitHub",
	"Flax Release": "GitHub",
	"Lemmy 游戏开发": "Lemmy",
	"Lemmy Godot": "Lemmy",
	"Lemmy Unity": "Lemmy",
	"Lemmy 游戏设计": "Lemmy",
	"Lemmy 游戏开发（lemmy.world）": "Lemmy",
	"Lemmy Godot（lemmy.world）": "Lemmy",
	"Lemmy Unreal Engine": "Lemmy",
	"Lemmy 独立游戏": "Lemmy",
	"Lemmy 游戏开发（sh.itjust.works）": "Lemmy",
	"Lemmy Unreal Engine（sh.itjust.works）": "Lemmy",
	/* 原新闻中的论坛/社区类 */
	"Hacker News": "Hacker News",
	ResetEra: "论坛",
	"Qiita ゲーム開発": "Qiita",
	"Qiita ゲームデザイン": "Qiita",
	"Qiita Godot": "Qiita",
	"Qiita UnrealEngine": "Qiita",
	"Qiita Unity": "Qiita",
	"Qiita game AI": "Qiita",
	"Zenn gamedev": "Zenn",
	"Zenn 游戏引擎": "Zenn",
	"Zenn UnrealEngine": "Zenn",
	"Zenn Godot": "Zenn",
	"Zenn Unity": "Zenn",
	"Zenn Bevy": "Zenn",
	"Zenn 游戏设计": "Zenn",
	"Zenn 创作": "Zenn",
	"Zenn UI/UX": "Zenn",
	"Zenn 写作": "Zenn",
	"Zenn UIUX设计": "Zenn",
};

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
	const [view, setView] = useState<"news" | "links" | "social">("news");
	const [langFilter, setLangFilter] = useState<LangFilter>("all");
	const [socialFilter, setSocialFilter] = useState<string>("all");
	const [dailyQuote, setDailyQuote] = useState<(typeof quotes)[0] | null>(null);

	useEffect(() => {
		setDailyQuote(quotes[Math.floor(Math.random() * quotes.length)]);
	}, [view]);

	/** 所有链接数据（按分类分组） */
	const linkCategories = useMemo(() => {
		return Object.entries(getLinksByCategory());
	}, []);

	/** 社交源列表（按平台筛选） */
	const socialNews = useMemo(() => {
		const sources = data.sources as unknown as Record<string, NewsItem[]>;
		const items: (NewsItem & { sourceName: string })[] = [];

		for (const [name, sourceItems] of Object.entries(sources)) {
			if (!SOCIAL_SOURCE_NAMES.has(name)) continue;
			const platform = SOCIAL_PLATFORM[name];
			if (socialFilter !== "all" && platform !== socialFilter) continue;
			for (const item of sourceItems) {
				if (!item.url) continue;
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

		const maxItems = socialFilter === "all" ? 150 : 50;
		return items.slice(0, maxItems);
	}, [socialFilter]);

	/** 有数据的社交平台列表（用于动态生成侧边栏） */
	const socialPlatforms = useMemo(() => {
		const sources = data.sources as unknown as Record<string, NewsItem[]>;
		const platforms = new Set<string>();
		for (const [name, sourceItems] of Object.entries(sources)) {
			if (!SOCIAL_SOURCE_NAMES.has(name)) continue;
			const platform = SOCIAL_PLATFORM[name];
			if (sourceItems.length > 0) platforms.add(platform);
		}
		return ["all", ...Array.from(platforms).sort()];
	}, []);

	/** 按语言筛选的新闻列表（全部150条/单语言50条） */
	const recentNews = useMemo(() => {
		const sources = data.sources as unknown as Record<string, NewsItem[]>;
		const items: (NewsItem & { sourceName: string })[] = [];

		for (const [name, sourceItems] of Object.entries(sources)) {
			if (name === "开发工具链接") continue;
			if (SOCIAL_SOURCE_NAMES.has(name)) continue;
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

		const maxItems = langFilter === "all" ? 150 : 50;
		return items.slice(0, maxItems);
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
			) : view === "social" ? (
				<main className="links-page">
					<nav className="links-sidebar">
						{socialPlatforms.map((p) => (
							<button
								key={p}
								className={`sidebar-link${socialFilter === p ? " active" : ""}`}
								onClick={() => setSocialFilter(p)}
							>
								{p === "all" ? "全部" : p}
							</button>
						))}
					</nav>
					<div
						ref={contentRef}
						key={"social-" + socialFilter}
						className="links-content"
					>
						<div className="time-group">
							{socialNews.length === 0 && (
								<div className="news-empty">
									暂无内容（需在 GH Actions 中抓取）
								</div>
							)}
							{socialNews.map((item) => (
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
