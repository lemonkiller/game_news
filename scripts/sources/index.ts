import type { NewsSource } from '../utils/types'
import { gamesIndustry } from './games-industry'
import { eightyLevel } from './80-level'
import { redditGamedev } from './reddit-gamedev'
import { unityBlog } from './engine-blogs'
import { hackerNews } from './hacker-news'
import { godotReleases } from './godot-releases'
import { pcGamer } from './pcgamer'
import { rockPaperShotgun } from './rockpapershotgun'
import { vg247 } from './vg247'
import { gcores } from './gcores'
import { youxituoluo } from './youxituoluo'
import { youxichaguan } from './youxichaguan'
import { fourGamer } from './4gamer'
import { automaton } from './automaton'
import { denfaminicogamer } from './denfaminicogamer'
import { insideGames } from './inside-games'
import { gamemakers } from './gamemakers'
import { indieGamesJapan } from './indiegamesjapan'
import { igdaJapan } from './igda-japan'
import { indieGamesJpDev } from './indiegamesjp-dev'

export const allSources: NewsSource[] = [
  gamesIndustry, eightyLevel, pcGamer, rockPaperShotgun, vg247,
  unityBlog, hackerNews, godotReleases, redditGamedev,
  gcores, youxituoluo, youxichaguan,
  fourGamer, automaton, denfaminicogamer, insideGames,
  gamemakers, indieGamesJapan, igdaJapan, indieGamesJpDev,
]
