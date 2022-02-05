import { Seiyuu, SeiyuuRole } from "~/api/anilist/types";
import Card from "../shared/Card";

type Props = {
  role: SeiyuuRole;
};

export default function SeiyuuRoleCard({ role }: Props) {
  return (
    <Card>
      <div className="grid grid-cols-[max-content_auto] items-center gap-4">
        <img
          src={role.character.image.medium}
          className="object-cover w-8 h-8 rounded-full"
        />
        <span>
          <div className="text-textPrimary">{role.character.name.full}</div>
          <div className="text-sm text-textSecondary">
            {role.anime.title.romaji}
          </div>
        </span>
      </div>
    </Card>
  );
}
