import { useMemo, useState, useEffect, useRef } from "react";
import data from "../data/news.json";
import Navbar from "./components/Navbar";
import type { NewsItem } from "../scripts/utils/types";
import { getLinksByCategory } from "../scripts/sources/link-sources";
import { quotes } from "../scripts/utils/quotes";
import {
	detectLanguage,
	CATEGORY_NAMES,
	formatItemTime,
	FILTER_LABELS,
	SOCIAL_FILTER_ALL,
	EMPTY_TEXT,
	SOCIAL_EMPTY_TEXT,
} from "./i18n";
import {
	LANG_MAP,
	SOCIAL_SOURCE_NAMES,
	SOCIAL_PLATFORM,
} from "./generated/source-registry";

const uiLang = detectLanguage();

type LangFilter = "all" | "zh" | "en" | "ja";

const FILTER_KEYS: LangFilter[] = ["all", "zh", "en", "ja"];

/** 判断是否在1个月内 */
function isWithinMonth(pubDate: string | undefined): boolean {
	if (!pubDate) return false;
	const d = new Date(pubDate);
	if (isNaN(d.getTime())) return false;
	const diff = Date.now() - d.getTime();
	return diff <= 30 * 86400000;
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
								{CATEGORY_NAMES[uiLang][category] || category}
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
								<h2 className="link-category-title">
									{CATEGORY_NAMES[uiLang][category] || category}
								</h2>
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
								{p === "all" ? SOCIAL_FILTER_ALL[uiLang] : p}
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
								<div className="news-empty">{SOCIAL_EMPTY_TEXT[uiLang]}</div>
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
										{formatItemTime(item.pubDate, uiLang)}
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
								{FILTER_LABELS[uiLang][k]}
							</button>
						))}
					</nav>
					<div ref={contentRef} key={langFilter} className="links-content">
						<div className="time-group">
							{recentNews.length === 0 && (
								<div className="news-empty">{EMPTY_TEXT[uiLang]}</div>
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
										{formatItemTime(item.pubDate, uiLang)}
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
