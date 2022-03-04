import { useContext } from "react";
import { Link } from "remix";
import { AuthContext } from "~/context/AuthContext";
import Avatar from "./Avatar";

export default function Navbar() {
  const { loggedIn, userInfo, logout } = useContext(AuthContext);

  function onAvatarClick() {
    if (!loggedIn) {
      window.location.href = `https://anilist.co/api/v2/oauth/authorize?client_id=${window.env.ANILIST_CLIENT_ID}&response_type=token`;
    } else {
      logout();
    }
  }

  return (
    <div className="px-5 py-3 select-none bg-bgSecondary text-textPrimary">
      <div className="grid items-center grid-cols-3">
        <div className="mr-auto text-xl">Anime Apps</div>

        <div className="flex gap-5 mx-auto">
          <Link to="">
            <span className="hover:text-primary">Seiyuu Lookup</span>
          </Link>
          <Link to="datefix">
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
  );
}
