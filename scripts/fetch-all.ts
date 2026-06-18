import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";
import { allSources } from "./sources";
import type { FetchResult } from "./utils/types";

const outputDir = join(process.cwd(), "data");

/** 将当前结果增量写入磁盘，防止后续源卡死导致数据丢失 */
function savePartial(result: FetchResult) {
	mkdirSync(outputDir, { recursive: true });
	writeFileSync(join(outputDir, "news.json"), JSON.stringify(result, null, 2));
}

async function main() {
	const result: FetchResult = {
		updatedAt: new Date().toISOString(),
		sources: {},
		errors: {},
	};

	for (const source of allSources) {
		process.stdout.write(`[${source.name}] 抓取中...`);
		try {
			const items = await source.fetch();
			result.sources[source.name] = items;
			console.log(` 完成: ${items.length} 条`);
		} catch (e) {
			console.log(` 失败`);
			result.errors[source.name] = String(e);
			result.sources[source.name] = [];
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
