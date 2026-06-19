import { writeFileSync, mkdirSync, readFileSync, existsSync } from "fs";
import { join } from "path";
import { allSources } from "./sources";
import type { FetchResult, NewsItem } from "./utils/types";

const outputDir = join(process.cwd(), "data");
const dataPath = join(outputDir, "news.json");

/** 读取上次抓取的老数据，用于抓取失败时兜底 */
function readOldData(): Record<string, NewsItem[]> {
	try {
		if (existsSync(dataPath)) {
			const old = JSON.parse(readFileSync(dataPath, "utf-8"));
			return old.sources || {};
		}
	} catch {
		/* 文件不存在或格式错误，忽略 */
	}
	return {};
}

/** 将当前结果增量写入磁盘，防止后续源卡死导致数据丢失 */
function savePartial(result: FetchResult) {
	mkdirSync(outputDir, { recursive: true });
	writeFileSync(dataPath, JSON.stringify(result, null, 2));
}

async function main() {
	const oldData = readOldData();

	const result: FetchResult = {
		updatedAt: new Date().toISOString(),
		sources: { ...oldData },
		errors: {},
	};

	for (const source of allSources) {
		process.stdout.write(`[${source.name}] 抓取中...`);
		try {
			const items = await source.fetch();
			if (items.length > 0 || !result.sources[source.name]) {
				// 新数据有效，或旧数据不存在 → 使用新数据
				result.sources[source.name] = items;
				console.log(` 完成: ${items.length} 条`);
			} else {
				// 新数据为空但旧数据存在 → 保留旧数据
				console.log(
					` 完成: 0 条，保留旧数据 ${result.sources[source.name].length} 条`,
				);
			}
		} catch (e) {
			console.log(` 失败`);
			result.errors[source.name] = String(e);
			if (!result.sources[source.name]) {
				// 旧数据也不存在时设为空
				result.sources[source.name] = [];
			}
			// 旧数据存在则保留不动
		}
		savePartial(result);
	}

	const total = Object.values(result.sources).reduce((s, v) => s + v.length, 0);
	const errCount = Object.keys(result.errors).length;
	console.log(`\n完成! 共 ${total} 条新闻，${errCount} 个源失败`);
}

main().catch((e) => {
	console.error("Fatal:", e);
	process.exit(1);
});
