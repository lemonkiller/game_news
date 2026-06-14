import { parseRSS, getGUID, relativeTime, stripHtml } from '../utils/rss-parser'
import { fetchText } from '../utils/fetcher'
import type { NewsSource } from '../utils/types'
export const blogLiuwenyi: NewsSource = {
  name: '博毅创为', lang: 'zh',
  fetch: async () => {
    const xml = await fetchText('https://www.cnblogs.com/liuwenyi/rss')
    const items = parseRSS(xml)
    return items.slice(0, 5).map((item) => ({
      id: getGUID(item), title: item.title, url: item.link,
      extra: { info: relativeTime(item.pubDate), hover: item.description ? stripHtml(item.description).slice(0, 200) : undefined },
    }))
  },
}
