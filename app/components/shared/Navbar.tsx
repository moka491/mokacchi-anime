import { useContext } from "react";
import { AuthContext } from "~/context/AuthContext";
import Avatar from "./Avatar";

export default function Navbar({ title = "", children }) {
  const { loggedIn, userInfo, logout } = useContext(AuthContext);

  function onAvatarClick() {
    if (!loggedIn) {
      window.location.href =
        "https://anilist.co/api/v2/oauth/authorize?client_id=7470&response_type=token";
    } else {
      logout();
    }
  }

  return (
    <div className="px-5 py-3 select-none bg-bgSecondary text-textPrimary">
      <div className="grid items-center grid-cols-3">
        <div className="mr-auto text-xl">{title}</div>
        <div className="flex gap-5 mx-auto">{children}</div>
        <div className="ml-auto">
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
