import { useMemo, useState, useEffect, useRef } from "react";
import data from "../../data/news.json";
import type { NewsItem } from "../../scripts/utils/types";
import { formatItemTime, SOCIAL_FILTER_ALL, SOCIAL_EMPTY_TEXT } from "../i18n";
import type { UiLang } from "../i18n";
import {
	SOCIAL_SOURCE_NAMES,
	SOCIAL_PLATFORM,
} from "../generated/source-registry";

interface Props {
	uiLang: UiLang;
}

export default function SocialTab({ uiLang }: Props) {
	const [socialFilter, setSocialFilter] = useState<string>("all");

	const contentRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (contentRef.current) {
			contentRef.current.scrollTop = 0;
		}
	}, [socialFilter]);

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

	/** 有数据的社交平台列表 */
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

	return (
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
	);
}
