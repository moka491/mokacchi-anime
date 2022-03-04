import { useContext, useEffect } from "react";
import { getUserActivities } from "~/api/anilist";
import { getAll } from "~/api/anilist/utils";
import Button from "~/components/shared/Button";
import ProgressBar from "~/components/shared/ProgressBar";
import { AuthContext } from "~/context/AuthContext";

export default function DateFix() {
  const { loggedIn } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      for await (const pageResp of getAll((page) =>
        getUserActivities(86735, page)
      )) {
        console.log(pageResp);
      }
    })();
  }, []);

  return (
    <div className="container mx-auto ">
      <div className="flex flex-col items-center my-6">
        {!loggedIn && (
          <>
            <div className="text-textSecondary">
              To use this tool, please login to your AniList account
            </div>
            <Button label="Login" />
          </>
        )}
      </div>

      <div className="text-textPrimary">
        Downloading activity data... (52/63)
      </div>
      <div className="w-full">
        <ProgressBar progress={52} max={63} />
      </div>
    </div>
  );
}
