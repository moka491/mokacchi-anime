import {
  CURRENT_USER_QUERY,
  ANIME_SEARCH_QUERY,
  CHARARCTER_SEIYUU_QUERY,
  SEIYUU_ROLES_QUERY,
  USER_ACTIVITIES_QUERY,
  USER_ANIME_DATES_QUERY,
} from './queries'
import {
  UserInfo,
  Anime,
  CharacterWithSeiyuus,
  SeiyuuRole,
  Paginated,
} from './types'
import { anilistQuery } from './utils'

export function getCurrentUserInfo(accessToken: string): Promise<UserInfo> {
  return anilistQuery(CURRENT_USER_QUERY, undefined, accessToken)
    .then((resp) => resp.json())
    .then((json) => json.data?.Viewer)
}

export function searchAnime(search: string): Promise<Anime[]> {
  return anilistQuery(ANIME_SEARCH_QUERY, {
    search,
  })
    .then((resp) => resp.json())
    .then((json) => json.data?.Page.media || [])
}

export function getAnimeCharactersAndSeiyuus(
  animeId: number
): Promise<CharacterWithSeiyuus[]> {
  return anilistQuery(CHARARCTER_SEIYUU_QUERY, {
    animeId,
  })
    .then((resp) => resp.json())
    .then(
      (json) =>
        json.data?.Media.characters.edges.map((edge: any) => ({
          ...edge.node,
          seiyuus: edge.voiceActors,
        })) || []
    )
}

export function getSeiyuuAnimeRoles(
  seiyuuId: number,
  onList: boolean,
  page: number = 1,
  accessToken?: string
): Promise<Paginated<SeiyuuRole[]>> {
  return anilistQuery(
    SEIYUU_ROLES_QUERY,
    {
      seiyuuId,
      onList,
      page,
    },
    accessToken
  )
    .then((resp) => resp.json())
    .then((json) => {
      const data = json.data?.Staff.characters.edges
        .filter((edge: any) => !!edge.node.media?.nodes[0])
        .map((edge: any) => {
          const { media, ...character } = edge.node

          return {
            character,
            anime: media.nodes[0],
          }
        })

      const hasNextPage =
        json.data?.Staff.characters.pageInfo.hasNextPage || false

      return { data, hasNextPage }
    })
}

export function getUserActivities(userId: number, page: number) {
  return anilistQuery(USER_ACTIVITIES_QUERY, {
    userId,
    page,
  })
    .then((resp) => resp.json())
    .then((json) => {
      const data = json.data.Page.activities
      const hasNextPage = json.data.Page.pageInfo.hasNextPage

      return { data, hasNextPage }
    })
}

export function getUserMediaWithDates(userId: number, page: number) {
  return anilistQuery(USER_ANIME_DATES_QUERY, {
    userId,
    page,
  })
    .then((resp) => resp.json())
    .then((json) => {
      const data = json.data.Page.mediaList
      const hasNextPage = json.data.Page.pageInfo.hasNextPage

      return { data, hasNextPage }
    })
}
