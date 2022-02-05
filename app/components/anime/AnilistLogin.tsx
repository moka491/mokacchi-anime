import { useContext } from "react";

import { AuthContext } from "~/context/AuthContext";
import Button from "../shared/Button";

export default function AnilistLogin() {
  const { loggedIn, userInfo, logout } = useContext(AuthContext);

  function handleLoginClick() {
    if (!loggedIn) {
      window.location.href =
        "https://anilist.co/api/v2/oauth/authorize?client_id=7424&response_type=token";
    } else {
      logout();
    }
  }

  return (
    <span className="inline-flex flex-col items-center justify-center gap-3">
      <span className="text-textSecondary">
        {loggedIn
          ? `Logged in as ${userInfo.name}`
          : "To use this tool, please login to your Anilist account"}
      </span>

      <Button
        label={loggedIn ? `Logout` : "Login"}
        onClick={handleLoginClick}
      />
    </span>
  );
}
