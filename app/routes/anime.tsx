import { Outlet } from "remix";
import Navbar from "~/components/shared/Navbar";
import NavbarLink from "~/components/shared/NavbarLink";

export default function AnimeIndex() {
  return (
    <div className="h-full min-h-screen bg-bgPrimary">
      <Navbar title="Anime Apps">
        <NavbarLink title="Anime Calendar" to="" />
        <NavbarLink title="Seiyuu Lookup" to="seiyuus" />
        {/* <NavbarLink title="Watch Date Fix" link="seiyuus" />
        <NavbarLink title="Anime Bluray Sales" link="seiyuus" /> */}
      </Navbar>
      <div className="p-5">
        <Outlet />
      </div>
    </div>
  );
}
