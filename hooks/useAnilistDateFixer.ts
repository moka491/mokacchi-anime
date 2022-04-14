import { getUserActivities, getUserMediaWithDates } from 'api/anilist'
import { getAll } from 'api/anilist/utils'
import { useState } from 'react'
import { getFuzzyDate } from 'utils/anilist-fuzzydate'

type DateFixerState = {
  status:
    | 'idle'
    | 'downloading'
    | 'calculation_done'
    | 'uploading'
    | 'upload_done'
  changeList: any[] | null
}

export const useAnilistDateFixer = (userId: number) => {
  const [state, setState] = useState<DateFixerState>({
    status: 'idle',
    changeList: null,
  })

  async function downloadDataFromAL() {
    const activities = []
    const mediaEntries = []

    for await (const pageResp of getAll((page) =>
      getUserActivities(userId, page)
    )) {
      activities.push(...pageResp)
    }

    for await (const pageResp of getAll((page) =>
      getUserMediaWithDates(userId, page)
    )) {
      mediaEntries.push(...pageResp)
    }

    return { mediaEntries, activities }
  }

  function generateActivityMap(activitiesList: any[]) {
    return activitiesList.reduce((acc, activity) => {
      if (!acc[activity.media.id]) {
        acc[activity.media.id] = []
      }

      acc[activity.media.id].push(activity)
      return acc
    }, {})
  }

  //   filterUnusedEntries(mediaEntries: any[]) {
  //     return mediaEntries.filter(
  //       (entry) =>
  //         (!entry.startedAt.year || !entry.completedAt.year) &&
  //         entry.updatedAt > 0
  //     )
  //   }

  function findStartDate(activities: any[]) {
    const startedDate = activities.find(
      (act) =>
        act.status === 'watched episode' &&
        (act.progress === '1' || act.progress.startsWith('1 '))
    )?.createdAt

    return startedDate ? getFuzzyDate(startedDate) : undefined
  }

  function findEndDate(activities: any[]) {
    const completedDate = activities.find(
      (act) => act.status === 'completed'
    )?.createdAt

    return completedDate ? getFuzzyDate(completedDate) : undefined
  }

  function generateChangeList(mediaEntries, activityMap): any[] {
    return mediaEntries
      .map((entry) => {
        let newStartDate, newEndDate

        const activities = activityMap?.[entry.media.id]

        if (!activities) {
          return null
        }

        newStartDate = findStartDate(activities)
        newEndDate = findEndDate(activities)

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
  }

  function calculateChanges() {
    setState({ ...state, status: 'downloading' })
    downloadDataFromAL().then(({ activities, mediaEntries }) => {
      const activityMap = generateActivityMap(activities)
      const changeList = generateChangeList(mediaEntries, activityMap)

      setState({ ...state, status: 'calculation_done', changeList })
    })
  }

  return { state, calculateChanges }
}
