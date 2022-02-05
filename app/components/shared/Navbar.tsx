import { useContext } from "react";
import { AuthContext } from "~/context/AuthContext";
import Avatar from "./Avatar";

export default function Navbar({ title = "", children }) {
  const { loggedIn, userInfo } = useContext(AuthContext);

  return (
    <div className="px-5 py-3 select-none bg-bgSecondary text-textPrimary">
      <div className="grid items-center grid-cols-3">
        <div className="mr-auto text-xl">{title}</div>
        <div className="flex gap-5 mx-auto">{children}</div>
        <div className="ml-auto">
          <Avatar faded={!loggedIn} imageUrl={userInfo?.avatar.medium} />
        </div>
      </div>
    </div>
  );
}
