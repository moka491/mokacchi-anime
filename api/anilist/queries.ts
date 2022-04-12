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
`

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
`

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
`

export const SEIYUU_ROLES_QUERY = `
query($seiyuuId: Int, $onList: Boolean, $page: Int) {
  Staff(id: $seiyuuId) {
    characters(page: $page, sort: FAVOURITES_DESC) {
      pageInfo {
        hasNextPage
      }
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
`

export const USER_ACTIVITIES_QUERY = `
query($userId: Int, $page: Int) {
  Page(page: $page, perPage: 50) {
    activities(type: ANIME_LIST, sort: ID_DESC, userId: $userId) {
      ... on ListActivity {
        media {
          id
        }
        status
        progress
        createdAt
      }
    }
    pageInfo {
      hasNextPage
    }
  }
}
`

export const USER_ANIME_DATES_QUERY = `
query($userId: Int, $page: Int) {
  Page(page: $page, perPage: 50) {
    mediaList(type: ANIME, userId: $userId) {
      id
      updatedAt
      startedAt {
        year
        month
        day
      }
      completedAt {
        year
        month
        day
      }
      media {
        id
        title {
          romaji
          english
        }
        coverImage {
          medium
        }
      }
    }
    pageInfo {
      hasNextPage
    }
  }
}
`
