import { getCurrentUserInfo } from 'api/anilist'
import { UserInfo } from 'api/anilist/types'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const AuthContext = (React as any).createContext()

type AuthState = {
  loggedIn: boolean
  token: string | null
  expires: number
  userInfo: UserInfo | null
}

const currentTimestamp = () => Math.round(Date.now() / 1000)

const AuthProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [state, setState] = useState<AuthState>()

  const router = useRouter()

  // read state from localstorage on startup
  useEffect(() => {
    const lsItem = localStorage.getItem('authState')
    if (lsItem) {
      const previousState: AuthState = JSON.parse(lsItem)

      if (previousState.expires > currentTimestamp() + 60) {
        setState(previousState)
      }
    }
  }, [])

  // read token from url if available and fetch user info
  useEffect(() => {
    if (location.hash.length > 0) {
      const params = new URLSearchParams(location.hash.substring(1))
      if (params.has('access_token')) {
        const token = params.get('access_token') as string
        const expires = currentTimestamp() + Number(params.get('expires_in'))

        getCurrentUserInfo(token)
          .then((userInfo) => {
            const newState: AuthState = {
              loggedIn: true,
              token,
              expires,
              userInfo,
            }

            setState(newState)
            localStorage.setItem('authState', JSON.stringify(newState))
            router.push('')
          })
          .catch(() =>
            console.log(
              "There was an error while trying to get the user's info"
            )
          )
      }
    }
  }, [])

  function login() {
    window.location.href = `https://anilist.co/api/v2/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_ANILIST_CLIENT_ID}&response_type=token`
  }

  function logout() {
    setState(undefined)
    localStorage.removeItem('authState')
  }

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
