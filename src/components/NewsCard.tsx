import type { NewsItem } from "../../scripts/utils/types";
interface NewsCardProps {
	item: NewsItem;
}
export default function NewsCard({ item }: NewsCardProps) {
	return (
		<a
			className="news-card"
			href={item.url}
			target="_blank"
			rel="noopener noreferrer"
			title={item.extra?.hover}
		>
			<span className="news-card-title">{item.title}</span>
			{item.extra?.info && (
				<span className="news-card-info">{item.extra.info}</span>
			)}
		</a>
	);
}
