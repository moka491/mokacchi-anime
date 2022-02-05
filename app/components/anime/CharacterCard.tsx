import { CharacterWithSeiyuus } from "~/api/anilist/types";
import Card from "../shared/Card";

type Props = {
  character: CharacterWithSeiyuus;
};

export default function SeiyuuCharacterCard({ character }: Props) {
  return (
    <Card>
      <div className="flex flex-col items-center">
        <img
          src={character.image.medium}
          className="object-cover mb-2 rounded-full w-9 h-9"
        />
        <a
          className="text-textPrimary hover:text-primary"
          href={`https://anilist.co/character/${character.id}`}
        >
          {character.name.full}
        </a>
        <div className="text-sm text-textSecondary">
          {character.name.native}
        </div>
      </div>
    </Card>
  );
}
