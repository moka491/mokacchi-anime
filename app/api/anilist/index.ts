import handleErrors from "./error-handling";
import {
  CURRENT_USER_QUERY,
  ANIME_SEARCH_QUERY,
  CHARARCTER_SEIYUU_QUERY,
  SEIYUU_ROLES_QUERY,
} from "./queries";
import {
  UserInfo,
  Anime,
  CharacterWithSeiyuus,
  SeiyuuRole,
  Paginated,
} from "./types";
import { fetchRetry } from "./utils";

export function getCurrentUserInfo(accessToken: string): Promise<UserInfo> {
  return fetchRetry("https://graphql.anilist.co", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
    body: JSON.stringify({
      query: CURRENT_USER_QUERY,
    }),
  })
    .then((resp) => resp.json())
    .then((json) => json.data?.Viewer);
}

export function searchAnime(search: string): Promise<Anime[]> {
  return fetchRetry("https://graphql.anilist.co", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: ANIME_SEARCH_QUERY,
      variables: {
        search,
      },
    }),
  })
    .then(handleErrors)
    .then((resp) => resp.json())
    .then((json) => json.data?.Page.media || []);
}

export function getAnimeCharactersAndSeiyuus(
  animeId: number
): Promise<CharacterWithSeiyuus[]> {
  return fetchRetry("https://graphql.anilist.co", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: CHARARCTER_SEIYUU_QUERY,
      variables: {
        animeId,
      },
    }),
  })
    .then(handleErrors)
    .then((resp) => resp.json())
    .then(
      (json) =>
        json.data?.Media.characters.edges.map((edge) => ({
          ...edge.node,
          seiyuus: edge.voiceActors,
        })) || []
    );
}

export function getSeiyuuAnimeRoles(
  seiyuuId: number,
  onList: boolean,
  page: number = 1,
  accessToken?: string
): Promise<Paginated<SeiyuuRole[]>> {
  return fetchRetry("https://graphql.anilist.co", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(accessToken && { Authorization: "Bearer " + accessToken }),
    },
    body: JSON.stringify({
      query: SEIYUU_ROLES_QUERY,
      variables: {
        seiyuuId,
        onList,
        page,
      },
    }),
  })
    .then(handleErrors)
    .then((resp) => resp.json())
    .then((json) => {
      const data = json.data?.Staff.characters.edges
        .filter((edge) => !!edge.node.media?.nodes[0])
        .map((edge) => {
          const { media, ...character } = edge.node;

          return {
            character,
            anime: media.nodes[0],
          };
        });

      const hasNextPage =
        json.data?.Staff.characters.pageInfo.hasNextPage || false;

      return { data, hasNextPage };
    });
}
