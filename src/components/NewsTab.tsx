import { useMemo, useState, useEffect, useRef } from "react";
import data from "../../data/news.json";
import type { NewsItem } from "../../scripts/utils/types";
import { formatItemTime, FILTER_LABELS, EMPTY_TEXT } from "../i18n";
import type { UiLang } from "../i18n";
import { LANG_MAP, SOCIAL_SOURCE_NAMES } from "../generated/source-registry";

interface Props {
	uiLang: UiLang;
}

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

export default function NewsTab({ uiLang }: Props) {
	const [langFilter, setLangFilter] = useState<LangFilter>("all");

	const contentRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (contentRef.current) {
			contentRef.current.scrollTop = 0;
		}
	}, [langFilter]);

	/** 按语言筛选的新闻列表 */
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

	return (
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
	);
}
