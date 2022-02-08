import { useContext, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { getSeiyuuAnimeRoles } from "~/api/anilist";
import { Seiyuu, SeiyuuRole } from "~/api/anilist/types";
import { AuthContext } from "~/context/AuthContext";
import SeiyuuCard from "./SeiyuuCard";
import SeiyuuRoleCard from "./SeiyuuRoleCard";

type Props = {
  seiyuu: Seiyuu;
  excludeCharacterId?: number;
  showUserAnime?: boolean;
};

type RolesState = {
  roles: SeiyuuRole[];
  page: number;
  hasNextPage: boolean;
};

export default function SeiyuuOtherRolesColumn({
  seiyuu,
  excludeCharacterId,
  showUserAnime = false,
}: Props) {
  const { token } = useContext(AuthContext);
  const [visibleHookRef, inView] = useInView({});

  const [entries, setEntries] = useState<RolesState>({
    roles: [],
    page: 1,
    hasNextPage: true,
  });

  const [userEntries, setUserEntries] = useState<RolesState>({
    roles: [],
    page: 1,
    hasNextPage: true,
  });

  const state = showUserAnime ? userEntries : entries;

  useEffect(() => {
    // if end of list is in sight and there's more data, load and cache it
    if (state.hasNextPage && inView) {
      getSeiyuuAnimeRoles(
        seiyuu.id,
        showUserAnime,
        state.page,
        showUserAnime ? token : null
      ).then((resp) => {
        const filteredRoles = resp.data?.filter(
          (r) => r.character.id !== excludeCharacterId
        );

        if (showUserAnime) {
          setUserEntries({
            roles: [...userEntries.roles, ...filteredRoles],
            page: userEntries.page + 1,
            hasNextPage: resp.hasNextPage,
          });
        } else {
          setEntries({
            roles: [...entries.roles, ...filteredRoles],
            page: entries.page + 1,
            hasNextPage: resp.hasNextPage,
          });
        }
      });
    }
  }, [inView]);

  return (
    <div className="flex flex-col gap-4">
      <SeiyuuCard seiyuu={seiyuu} />

      {state.roles.map((role) => (
        <SeiyuuRoleCard
          key={role.anime.id + " " + role.character.id}
          role={role}
        />
      ))}
      <div ref={visibleHookRef}>
        {inView
          ? `in view, page: ${state.page}, hasNextPage: ${state.hasNextPage}`
          : "not in view"}
      </div>
    </div>
  );
}
