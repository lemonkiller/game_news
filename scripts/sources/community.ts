import { fetchJSON } from '../utils/fetcher'
import { parseRSS, getGUID, relativeTime, stripHtml } from '../utils/rss-parser'
import { fetchText } from '../utils/fetcher'
import type { NewsSource } from '../utils/types'

async function fetchReddit(subreddit: string): Promise<NewsItem[]> {
  try {
    const data = await fetchJSON<any>('https://www.reddit.com/r/' + subreddit + '/hot.json?limit=5')
    return (data.data?.children || []).map((post: any) => ({
      id: post.data.id, title: post.data.title,
      url: 'https://www.reddit.com' + post.data.permalink,
      extra: { info: post.data.score + ' 赞 · ' + post.data.num_comments + ' 评论' },
    }))
  } catch { return [] }
}

export const redditGaming: NewsSource = {
  name: 'r/gaming', lang: 'community',
  fetch: () => fetchReddit('gaming'),
}
export const redditIndieGaming: NewsSource = {
  name: 'r/IndieGaming', lang: 'community',
  fetch: () => fetchReddit('IndieGaming'),
}
export const redditUnity3D: NewsSource = {
  name: 'r/Unity3D', lang: 'community',
  fetch: () => fetchReddit('Unity3D'),
}
export const redditUnreal: NewsSource = {
  name: 'r/UnrealEngine', lang: 'community',
  fetch: () => fetchReddit('UnrealEngine'),
}

export const resetera: NewsSource = {
  name: 'ResetEra', lang: 'community',
  fetch: async () => {
    const xml = await fetchText('https://www.resetera.com/forums/gaming.2/index.rss')
    const items = parseRSS(xml)
    return items.slice(0, 10).map((item) => ({
      id: getGUID(item), title: item.title, url: item.link,
      extra: { info: relativeTime(item.pubDate), hover: item.description ? stripHtml(item.description).slice(0, 200) : undefined },
    }))
  },
}
