import { writeFileSync, mkdirSync } from 'fs'
import { join } from 'path'
import { allSources } from './sources'
import type { FetchResult } from './utils/types'

async function main() {
  const outputDir = join(process.cwd(), 'data')
  mkdirSync(outputDir, { recursive: true })

  const result: FetchResult = { updatedAt: new Date().toISOString(), sources: {}, errors: {} }

  for (const source of allSources) {
    process.stdout.write(`[${source.name}] 抓取中...`)
    try {
      const items = await source.fetch()
      result.sources[source.name] = items
      console.log(` 完成: ${items.length} 条`)
    } catch (e) {
      console.log(` 失败`)
      result.errors[source.name] = String(e)
      result.sources[source.name] = []
    }
  }

  writeFileSync(join(outputDir, 'news.json'), JSON.stringify(result, null, 2))

  const total = Object.values(result.sources).reduce((s, v) => s + v.length, 0)
  const errCount = Object.keys(result.errors).length
  console.log(`\n完成! 共 ${total} 条新闻，${errCount} 个源失败`)
}

main().catch((e) => { console.error('Fatal:', e); process.exit(1) })
