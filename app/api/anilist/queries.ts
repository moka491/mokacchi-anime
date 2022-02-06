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
query staff($seiyuuId: Int, $onList: Boolean) {
  Staff(id: $seiyuuId) {
    characters(page: 1, sort: FAVOURITES_DESC) {
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
          media(sort: FAVOURITES_DESC, onList: $onList, perPage: 1, type: ANIME) {
            nodes {
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
  }
}
`;
