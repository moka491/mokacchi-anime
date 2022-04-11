import { getUserActivities, getUserMediaWithDates } from 'api/anilist'
import { getAll } from 'api/anilist/utils'
import { AuthContext } from 'context/AuthContext'
import { NextPage } from 'next'
import { useContext, useEffect, useReducer } from 'react'

const DateFix: NextPage = () => {
  const { loggedIn } = useContext(AuthContext)

  const [activityData, addActivityData] = useReducer(
    (state: any[], newState: any[]) => [...state, ...newState],
    []
  )

  const [mediaDates, addMediaDates] = useReducer(
    (state: any[], newState: any[]) => [...state, ...newState],
    []
  )

  useEffect(() => {
    ;(async () => {
      for await (const pageResp of getAll((page) =>
        getUserActivities(86735, page)
      )) {
        addActivityData(pageResp)
      }

      for await (const pageResp of getAll((page) =>
        getUserMediaWithDates(86735, page)
      )) {
        addMediaDates(pageResp)
      }
    })()
  }, [])

  return (
    <div className="container mx-auto ">
      <div className="my-6 flex flex-col items-center">
        {!loggedIn && (
          <>
            <div className="text-textSecondary">
              To use this tool, please login to your AniList account
            </div>
          </>
        )}
      </div>

      <div className="text-textPrimary">
        Downloading data... {activityData.length} {mediaDates.length}
      </div>
    </div>
  )
}

export default DateFix
