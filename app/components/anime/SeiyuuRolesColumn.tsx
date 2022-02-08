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
  rolesUserOnly: SeiyuuRole[];
};

export default function SeiyuuOtherRolesColumn({
  seiyuu,
  excludeCharacterId,
  showUserAnime = false,
}: Props) {
  const { token } = useContext(AuthContext);
  const { ref, inView } = useInView();

  const [roleState, setRoleState] = useState<RolesState>({
    roles: [],
    rolesUserOnly: [],
  });

  const roles = showUserAnime ? roleState.rolesUserOnly : roleState.roles;

  useEffect(() => {
    // only load data if not already cached and the component is in view
    if (!roles.length && inView) {
      getSeiyuuAnimeRoles(
        seiyuu.id,
        showUserAnime,
        showUserAnime ? token : null
      )
        .then((roles) =>
          roles.filter((r) => r.character.id !== excludeCharacterId)
        )
        .then((roles) => {
          setRoleState(
            showUserAnime
              ? { ...roleState, rolesUserOnly: roles }
              : { ...roleState, roles }
          );
        });
    }
  }, [showUserAnime, inView]);

  return (
    <div ref={ref} className="flex flex-col gap-4">
      <SeiyuuCard seiyuu={seiyuu} />

      {roles.map((role) => (
        <SeiyuuRoleCard
          key={role.anime.id + " " + role.character.id}
          role={role}
        />
      ))}
    </div>
  );
}
