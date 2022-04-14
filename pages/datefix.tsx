import DateFixChangePreviewTable from 'components/anime/DateFixChangePreviewTable'
import Button from 'components/shared/Button'
import LoadingIndicator from 'components/shared/LoadingIndicator'
import { AuthContext } from 'context/AuthContext'
import { useAnilistDateFixer } from 'hooks/useAnilistDateFixer'
import { NextPage } from 'next'
import { useContext } from 'react'

const DateFix: NextPage = () => {
  const { loggedIn, userInfo, login } = useContext(AuthContext)

  const { state, calculateChanges } = useAnilistDateFixer(userInfo?.id)

  const currentStepHtml = (): React.ReactElement => {
    switch (state.status) {
      case 'idle':
        return (
          <>
            <span className="text-textPrimary">
              Click 'Start' to run the Date Fixer
            </span>
            <Button label="Start" onClick={calculateChanges} />
          </>
        )
      case 'downloading':
        return (
          <>
            <LoadingIndicator />
            <span className="text-textPrimary">Downloading...</span>
          </>
        )
      case 'calculation_done':
        return <DateFixChangePreviewTable changeList={state.changeList as []} />
      case 'uploading':
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
              <Button label="Login to Anilist" onClick={login} />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default DateFix
