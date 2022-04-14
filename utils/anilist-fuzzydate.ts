export function getFuzzyDate(timestamp: number) {
  const date = new Date(timestamp * 1000)

  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
  }
}
