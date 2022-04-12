import DateFixChangePreviewTable from 'components/anime/DateFixChangePreviewTable'
import Button from 'components/shared/Button'
import LoadingIndicator from 'components/shared/LoadingIndicator'
import { AuthContext } from 'context/AuthContext'
import { NextPage } from 'next'
import { useContext, useState } from 'react'
import { AnilistDateFixService } from 'services/AnilistDateFix'

enum Step {
  NotStarted,
  Downloading,
  PreviewChanges,
  Uploading,
}

const DateFix: NextPage = () => {
  const { loggedIn, userInfo } = useContext(AuthContext)

  const [currentStep, setCurrentStep] = useState<Step>(Step.NotStarted)
  const [changeList, setChangeList] = useState<any[]>([])

  const runDateFix = async () => {
    const service = new AnilistDateFixService(userInfo.id)

    setCurrentStep(Step.Downloading)
    await service.prepareData()

    const changes = service.calculateChanges()

    setChangeList(changes)
    setCurrentStep(Step.PreviewChanges)
  }

  const currentStepHtml = (): React.ReactElement => {
    switch (currentStep) {
      case Step.NotStarted:
        return (
          <>
            <span className="text-textPrimary">
              Click 'Start' to run the Date Fixer
            </span>
            <Button label="Start" onClick={runDateFix} />
          </>
        )
      case Step.Downloading:
        return (
          <>
            <LoadingIndicator />
            <span className="text-textPrimary">Downloading...</span>
          </>
        )
      case Step.PreviewChanges:
        return <DateFixChangePreviewTable changeList={changeList} />
      case Step.Uploading:
        return <span className="text-textPrimary">Uploading...</span>
    }
  }

  return (
    <div className="flex flex-col flex-grow overflow-auto">
      <div className="container mx-auto">
        <div className="flex flex-col items-center my-6">
          {loggedIn ? (
            currentStepHtml()
          ) : (
            <>
              <div className="text-textSecondary">
                To use this tool, please login to your AniList account
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default DateFix
