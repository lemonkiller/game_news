import { fetchJSON } from '../utils/fetcher'
import type { NewsSource } from '../utils/types'
interface RedditPost { data: { id: string; title: string; url: string; permalink: string; score: number; num_comments: number; selftext?: string } }
export const redditGamedev: NewsSource = {
  name: 'Reddit r/gamedev', lang: 'en',
  fetch: async () => {
    const data = await fetchJSON<{ data: { children: RedditPost[] } }>('https://www.reddit.com/r/gamedev/hot.json?limit=25')
    return data.data.children.map((post) => ({
      id: post.data.id, title: post.data.title,
      url: 'https://www.reddit.com' + post.data.permalink,
      extra: { info: `${post.data.score} 赞 · ${post.data.num_comments} 评论`, hover: post.data.selftext?.slice(0, 200) },
    }))
  },
}
