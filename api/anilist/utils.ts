const delay = (time: number) =>
  new Promise<void>((resolve) => setTimeout(() => resolve(), time))

export default function handleErrors(resp: Response) {
  if (!resp.ok) {
    throw Error(resp.statusText)
  }
  return resp
}

export async function* getAll(
  request: (page: number) => Promise<{ data: any[]; hasNextPage: boolean }>
) {
  let page = 1
  let hasMorePages = true

  while (hasMorePages) {
    yield await request(page).then(({ data, hasNextPage }) => {
      if (!hasNextPage) {
        hasMorePages = false
      } else {
        page++
      }

      return data
    })
  }
}

export async function fetchRetry(
  info: RequestInfo,
  init?: RequestInit
): Promise<Response> {
  let resp = null
  while (!resp) {
    resp = await fetch(info, init).then(async (resp) => {
      if (!resp.ok) {
        const retryTimestamp = Number(resp.headers.get('x-ratelimit-reset'))

        const retryAfter = retryTimestamp
          ? (retryTimestamp + 1) * 1000 - Date.now()
          : 10000

        await delay(retryAfter)
        return null
      }

      return resp
    })
  }

  return resp
}

export async function anilistQuery(
  query: string,
  variables?: {},
  token?: string
) {
  return fetchRetry('https://graphql.anilist.co', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: 'Bearer ' + token }),
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  }).then(handleErrors)
}
