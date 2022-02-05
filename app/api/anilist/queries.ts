export const CURRENT_USER_QUERY = `
query { 
  Viewer {
    id
    name
    avatar {
      medium
    }
  }
}
`;

export const ANIME_SEARCH_QUERY = `
query($search: String) { 
  Page(perPage: 10){
    media(search: $search, type: ANIME) {
      id,
      title {
        romaji
        english
      }
      coverImage {
        medium
      }
    }
  }
}
`;

export const CHARARCTER_SEIYUU_QUERY = `
query($animeId: Int) { 
    Media(id:$animeId) {
      characters {
        edges {
          node {
            id
            name {
              full
              native
            }
            image {
              medium
            }
          }
          voiceActors(language:JAPANESE) {
            id
            name {
              full
            }
            image {
              medium
            }
          }
        }
      }
    }
  }
`;

export const SEIYUU_ROLES_QUERY = `
query ($seiyuuId: Int, $onList: Boolean) {
    Staff(id: $seiyuuId) {
      characterMedia(perPage: 100 sort: FAVOURITES_DESC onList: $onList) {
        edges {
          characters {
            id
            name {
                full
                native
              }
              image {
                medium
              }
          }
          node {
            id,
            title {
              romaji
              english
            }
            coverImage {
              medium
            }
          }
        }
      }
    }
  }
`;
