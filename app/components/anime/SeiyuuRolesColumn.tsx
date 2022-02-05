import { useContext, useEffect, useState } from "react";
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

  const [roleState, setRoleState] = useState<RolesState>({
    roles: [],
    rolesUserOnly: [],
  });

  const roles = showUserAnime ? roleState.rolesUserOnly : roleState.roles;

  useEffect(() => {
    if (!roles.length) {
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
  }, [showUserAnime]);

  return (
    <div className="flex flex-col gap-4">
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
