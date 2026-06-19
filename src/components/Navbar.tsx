import type { Lang } from "../../scripts/utils/types";
import type { Quote } from "../../scripts/utils/quotes";

interface NavbarProps {
	lang: Lang;
	onLangChange: (lang: Lang) => void;
	counts: Record<Lang, number>;
	updatedAt: string;
	labels: Record<Lang, string>;
	quote: Quote | null;
}

export default function Navbar({
	lang,
	onLangChange,
	counts,
	labels,
	updatedAt,
	quote,
}: NavbarProps) {
	function formatTime(iso: string): string {
		try {
			const d = new Date(iso);
			const month = d.getMonth() + 1;
			const day = d.getDate();
			const hours = String(d.getHours()).padStart(2, "0");
			const mins = String(d.getMinutes()).padStart(2, "0");
			return `${month}月${day}日 ${hours}:${mins}`;
		} catch {
			return iso;
		}
	}
	const tabs: Lang[] = ["all", "zh", "en", "ja", "links"];

	const tabTips: Record<Lang, string> = {
		all: "全部数据源合并，按时间排序的完整信息流",
		zh: "中文游戏开发/设计新闻与社区内容",
		en: "英文游戏开发/设计新闻与社区内容",
		ja: "日文游戏开发/设计新闻与社区内容",
		links: "游戏开发工具/引擎/资源/学习链接分类索引",
	};

	return (
		<nav className="navbar">
			<div className="navbar-row">
				<div className="navbar-left">
					<h1
						className="navbar-title"
						title="游戏开发资讯聚合，覆盖中英日三语 140+ 数据源"
					>
						游戏新闻
					</h1>
					<span className="navbar-subtitle">
						更新于 {formatTime(updatedAt)}
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
							"{quote.quote}"
						</span>
					</div>
				)}
			</div>
		</nav>
	);
}
