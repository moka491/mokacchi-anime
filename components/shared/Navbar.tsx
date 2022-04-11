import { AuthContext } from 'context/AuthContext'
import Link from 'next/link'
import { useContext } from 'react'
import Avatar from './Avatar'

export default function Navbar() {
  const { loggedIn, userInfo, logout } = useContext(AuthContext)

  function onAvatarClick() {
    if (!loggedIn) {
      window.location.href = `https://anilist.co/api/v2/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_ANILIST_CLIENT_ID}&response_type=token`
    } else {
      logout()
    }
  }

  return (
    <div className="select-none bg-bgSecondary px-5 py-3 text-textPrimary">
      <div className="grid grid-cols-3 items-center">
        <div className="mr-auto text-xl">Anime Apps</div>

        <div className="mx-auto flex gap-5">
          <Link href="">
            <span className="hover:text-primary">Seiyuu Lookup</span>
          </Link>
          <Link href="datefix">
            <span className="hover:text-primary">Date Fixer</span>
          </Link>
        </div>

        <div className="ml-auto cursor-pointer">
          <Avatar
            faded={!loggedIn}
            imageUrl={userInfo?.avatar.medium}
            onClick={onAvatarClick}
          />
        </div>
      </div>
    </div>
  )
}
