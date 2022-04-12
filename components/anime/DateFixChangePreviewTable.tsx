import Card from 'components/shared/Card'

type Props = {
  changeList: any[]
}

export default function DateFixChangePreviewTable({ changeList }: Props) {
  const formatDate = (fuzzyDate: any) =>
    fuzzyDate.year
      ? `${fuzzyDate.year}-${fuzzyDate.month}-${fuzzyDate.day}`
      : '-'

  function tableColumn(oldDate: any, newDate: any) {
    return (
      <div>
        {newDate?.year ? (
          <>
            <s className="text-textSecondary">
              {oldDate?.year && formatDate(oldDate)}
            </s>
            <div className="text-success">{formatDate(newDate)}</div>
          </>
        ) : (
          <>{formatDate(oldDate)}</>
        )}
      </div>
    )
  }

  return (
    <Card>
      <div className="grid grid-cols-3 gap-4 text-textPrimary">
        {changeList.map((entry) => (
          <>
            <div>{entry.media.title.romaji}</div>
            {tableColumn(entry.startedAt, entry.newStartDate)}
            {tableColumn(entry.completedAt, entry.newEndDate)}
          </>
        ))}
      </div>
    </Card>
  )
}
