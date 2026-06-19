import type { Lang } from "../../scripts/utils/types";
import type { Quote } from "../../scripts/utils/quotes";
import type { UiLang } from "../i18n";
import {
	NAV_TITLE,
	NAV_SUBTITLE_PREFIX,
	NAV_TITLE_TIP,
	TAB_TIPS,
} from "../i18n";

interface NavbarProps {
	lang: Lang;
	onLangChange: (lang: Lang) => void;
	counts: Record<Lang, number>;
	updatedAt: string;
	labels: Record<string, string>;
	quote: Quote | null;
	uiLang: UiLang;
}

export default function Navbar({
	lang,
	onLangChange,
	counts,
	labels,
	updatedAt,
	quote,
	uiLang,
}: NavbarProps) {
	function formatTime(iso: string): string {
		try {
			const d = new Date(iso);
			const month = d.getMonth() + 1;
			const day = d.getDate();
			const hours = String(d.getHours()).padStart(2, "0");
			const mins = String(d.getMinutes()).padStart(2, "0");
			const y = d.getFullYear();
			if (uiLang === "en") {
				return `${y}/${String(month).padStart(2, "0")}/${String(day).padStart(2, "0")} ${hours}:${mins}`;
			}
			return `${month}月${day}日 ${hours}:${mins}`;
		} catch {
			return iso;
		}
	}

	const tabs: Lang[] = ["all", "zh", "en", "ja", "links"];
	const tabTips = TAB_TIPS[uiLang] || TAB_TIPS.en;
	const title = NAV_TITLE[uiLang] || NAV_TITLE.en;
	const subPrefix = NAV_SUBTITLE_PREFIX[uiLang] || NAV_SUBTITLE_PREFIX.en;
	const titleTip = NAV_TITLE_TIP[uiLang] || NAV_TITLE_TIP.en;

	/** 根据 UI 语言取名言对应字段 */
	function quoteText(q: Quote): string {
		switch (uiLang) {
			case "zh":
				return q.zh;
			case "ja":
				return q.ja;
			default:
				return q.en;
		}
	}

	return (
		<nav className="navbar">
			<div className="navbar-row">
				<div className="navbar-left">
					<h1 className="navbar-title" title={titleTip}>
						{title}
					</h1>
					<span className="navbar-subtitle">
						{subPrefix} {formatTime(updatedAt)}
					</span>
				</div>

				<div className="navbar-tabs">
					{tabs.map((l) => (
						<button
							key={l}
							className={`tab ${lang === l ? "active" : ""}`}
							title={tabTips[l]}
							onClick={() => onLangChange(l)}
						>
							{labels[l]}
							<span className="tab-count">{counts[l]}</span>
						</button>
					))}
				</div>

				{quote && (
					<div className="navbar-quote">
						<span
							className="navbar-quote-text"
							title={
								quote.source
									? `${quote.author} - ${quote.source}`
									: quote.author
							}
						>
							"{quoteText(quote)}"
						</span>
					</div>
				)}
			</div>
		</nav>
	);
}
