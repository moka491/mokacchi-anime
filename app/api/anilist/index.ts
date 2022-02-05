import {
  CURRENT_USER_QUERY,
  ANIME_SEARCH_QUERY,
  CHARARCTER_SEIYUU_QUERY,
  SEIYUU_ROLES_QUERY,
} from "./queries";
import { UserInfo, Anime, CharacterWithSeiyuus, SeiyuuRole } from "./types";

export function getCurrentUserInfo(accessToken: string): Promise<UserInfo> {
  return fetch("https://graphql.anilist.co", {
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
  return fetch("https://graphql.anilist.co", {
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
    .then((resp) => resp.json())
    .then((json) => json.data?.Page.media || []);
}

export function getAnimeCharactersAndSeiyuus(
  animeId: number
): Promise<CharacterWithSeiyuus[]> {
  return fetch("https://graphql.anilist.co", {
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
  accessToken?: string
): Promise<SeiyuuRole[]> {
  return fetch("https://graphql.anilist.co", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
    body: JSON.stringify({
      query: SEIYUU_ROLES_QUERY,
      variables: {
        seiyuuId,
        onList,
      },
    }),
  })
    .then((resp) => resp.json())
    .then(
      (json) =>
        json.data?.Staff.characterMedia.edges.map((edge) => ({
          character: edge.characters[0] ?? null,
          anime: edge.node,
        })) || []
    );
}
