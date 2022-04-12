import { getUserActivities, getUserMediaWithDates } from 'api/anilist'
import { getAll } from 'api/anilist/utils'

export class AnilistDateFixService {
  private mediaEntries?: any[]
  private activityMap?: Record<number, any>

  constructor(private userId: number) {}

  private getFuzzyDate(timestamp: number) {
    const date = new Date(timestamp * 1000)

    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
    }
  }

  private generateActivityMap(activitiesList: any[]) {
    return activitiesList.reduce((acc, activity) => {
      if (!acc[activity.media.id]) {
        acc[activity.media.id] = []
      }

      acc[activity.media.id].push(activity)
      return acc
    }, {})
  }

  private filterUnusedEntries(mediaEntries: any[]) {
    return mediaEntries.filter(
      (entry) =>
        (!entry.startedAt.year || !entry.completedAt.year) &&
        entry.updatedAt > 0
    )
  }

  private findStartDate(activities: any[]) {
    const startedDate = activities.find(
      (act) =>
        act.status === 'watched episode' &&
        (act.progress === '1' || act.progress.startsWith('1 '))
    )?.createdAt

    return startedDate ? this.getFuzzyDate(startedDate) : undefined
  }

  private findEndDate(activities: any[]) {
    const completedDate = activities.find(
      (act) => act.status === 'completed'
    )?.createdAt

    return completedDate ? this.getFuzzyDate(completedDate) : undefined
  }

  async prepareData() {
    const activities = []
    const mediaEntries = []

    for await (const pageResp of getAll((page) =>
      getUserActivities(this.userId, page)
    )) {
      activities.push(...pageResp)
    }

    for await (const pageResp of getAll((page) =>
      getUserMediaWithDates(this.userId, page)
    )) {
      mediaEntries.push(...pageResp)
    }

    this.mediaEntries = this.filterUnusedEntries(mediaEntries)
    this.activityMap = this.generateActivityMap(activities)
  }

  calculateChanges() {
    if (!this.mediaEntries || !this.activityMap)
      throw "The required data hasn't been downloaded yet. Please await prepareData() first!"

    return this.mediaEntries
      .map((entry) => {
        let newStartDate, newEndDate

        const activities = this.activityMap?.[entry.media.id]

        if (!activities) {
          return null
        }

        if (!entry.startedAt.year) {
          newStartDate = this.findStartDate(activities)
        }

        if (!entry.completedAt.year) {
          newEndDate = this.findEndDate(activities)
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
  }
}
