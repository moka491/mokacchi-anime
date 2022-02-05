import { Outlet } from "remix";
import Navbar from "./components/shared/Navbar";
import NavbarLink from "./components/shared/NavbarLink";
import { AuthProvider } from "./context/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <div className="h-full min-h-screen bg-bgPrimary">
        <Navbar title="Anime Apps">
          <NavbarLink title="Seiyuu Lookup" to="" />
          <NavbarLink title="Anime Calendar" to="" />
        </Navbar>
        <div className="p-5">
          <Outlet />
        </div>
      </div>
    </AuthProvider>
  );
}
