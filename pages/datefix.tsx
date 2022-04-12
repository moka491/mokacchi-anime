import { getUserActivities, getUserMediaWithDates } from 'api/anilist'
import { getAll } from 'api/anilist/utils'
import { AuthContext } from 'context/AuthContext'
import { NextPage } from 'next'
import { useContext, useEffect } from 'react'

const getFuzzyDate = (timestamp: number) => {
  const date = new Date(timestamp * 1000)

  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
  }
}

const DateFix: NextPage = () => {
  const { loggedIn } = useContext(AuthContext)

  useEffect(() => {
    ;(async () => {
      const { activities, mediaEntries } = await downloadUserData()

      const filteredMediaEntries = mediaEntries.filter(
        (entry) =>
          (!entry.startedAt.year || !entry.completedAt.year) &&
          entry.updatedAt > 0
      )
      const activityMap: Record<number, any> = activities.reduce(
        (acc, activity) => {
          if (!acc[activity.media.id]) {
            acc[activity.media.id] = []
          }

          acc[activity.media.id].push(activity)
          return acc
        },
        {}
      )

      console.log({ activityMap, filteredMediaEntries })

      const changeList = filteredMediaEntries
        .map((entry) => {
          let newStartDate, newEndDate

          const activities = activityMap[entry.media.id]

          if (!activities) {
            return null
          }

          if (!entry.startedAt.year) {
            newStartDate = findStartDate(activities)
          }

          if (!entry.completedAt.year) {
            newEndDate = findEndDate(activities)
          }

          if (!newStartDate && !newEndDate) {
            return null
          }

          return {
            ...entry,
            newStartDate,
            newEndDate,
          }
        })
        .filter((e) => !!e)

      console.log({ changeList })
    })()
  }, [])

  const downloadUserData = async () => {
    const activities = []
    const mediaEntries = []

    for await (const pageResp of getAll((page) =>
      getUserActivities(127851, page)
    )) {
      activities.push(...pageResp)
    }

    for await (const pageResp of getAll((page) =>
      getUserMediaWithDates(127851, page)
    )) {
      mediaEntries.push(...pageResp)
    }

    return { activities, mediaEntries }
  }

  const findStartDate = (activities: any[]) => {
    const startedDate = activities.find(
      (act) =>
        act.status === 'watched episode' &&
        (act.progress === '1' || act.progress.startsWith('1 '))
    )?.createdAt

    return startedDate ? getFuzzyDate(startedDate) : undefined
  }

  const findEndDate = (activities: any[]) => {
    const completedDate = activities.find(
      (act) => act.status === 'completed'
    )?.createdAt

    return completedDate ? getFuzzyDate(completedDate) : undefined
  }

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

      <div className="text-textPrimary">Downloading data...</div>
    </div>
  )
}

export default DateFix
