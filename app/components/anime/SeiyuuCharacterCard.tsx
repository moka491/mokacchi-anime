import { CharacterWithSeiyuus } from "~/api/anilist/types";
import Card from "../shared/Card";

type Props = {
  character: CharacterWithSeiyuus;
};

export default function SeiyuuCharacterCard({ character }: Props) {
  return (
    <div className="p-3 rounded bg-bgSecondary flex flex-col items-center gap-4">
      <img
        src={character.image.medium}
        className="object-cover rounded-full w-9 h-9"
      />
      <span>
        <div className="text-textPrimary">{character.name.full}</div>
        <div className="text-sm text-textSecondary">
          {character.name.native}
        </div>
      </span>
    </div>
  );
}
