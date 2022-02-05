import { useContext, useEffect, useState } from "react";
import { getSeiyuuAnimeRoles } from "~/api/anilist";
import { Seiyuu, SeiyuuRole } from "~/api/anilist/types";
import { AuthContext } from "~/context/AuthContext";
import SeiyuuCard from "./SeiyuuCard";
import SeiyuuRoleCard from "./SeiyuuRoleCard";

type Props = {
  seiyuu: Seiyuu;
  excludeCharacterId?: number;
  onlyUserAnime?: boolean;
};

export default function SeiyuuOtherRolesColumn({
  seiyuu,
  excludeCharacterId,
  onlyUserAnime = false,
}: Props) {
  const { token } = useContext(AuthContext);

  const [otherRoles, setOtherRoles] = useState<SeiyuuRole[]>([]);

  useEffect(() => {
    getSeiyuuAnimeRoles(seiyuu.id, onlyUserAnime, token)
      .then((roles) =>
        roles.filter((r) => r.character.id !== excludeCharacterId)
      )
      .then((roles) => setOtherRoles(roles));
  }, [onlyUserAnime]);

  return (
    <div className="flex flex-col gap-4">
      <SeiyuuCard seiyuu={seiyuu} />
      {otherRoles.map((role) => (
        <SeiyuuRoleCard
          key={role.anime.id + " " + role.character.id}
          role={role}
        />
      ))}
    </div>
  );
}
