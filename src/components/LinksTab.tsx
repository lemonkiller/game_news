import { useMemo, useRef, useEffect, useCallback } from "react";
import { getLinksByCategory } from "../../scripts/sources/link-sources";
import { CATEGORY_NAMES } from "../i18n";
import type { UiLang } from "../i18n";

interface Props {
	uiLang: UiLang;
}

export default function LinksTab({ uiLang }: Props) {
	const linkCategories = useMemo(() => {
		return Object.entries(getLinksByCategory());
	}, []);

	const contentRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (contentRef.current) {
			contentRef.current.scrollTop = 0;
		}
	}, []);

	const scrollToCategory = useCallback((category: string) => {
		const el = document.getElementById(`cat-${category}`);
		if (el && contentRef.current) {
			const top = el.offsetTop - contentRef.current.offsetTop;
			contentRef.current.scrollTo({ top, behavior: "smooth" });
		}
	}, []);

	return (
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
	);
}
