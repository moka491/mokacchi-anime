import { Link } from "remix";

export default function NavbarLink({ title = "", to = "#" }) {
  return (
    <span className="hover:text-primary">
      <Link to={to}>{title}</Link>
    </span>
  );
}
