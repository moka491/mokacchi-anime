import { ActionFunction, LoaderFunction, redirect } from "remix";

export const loader: LoaderFunction = async () => {
  return redirect("/anime");
};

export default function Index() {
  return <div></div>;
}
