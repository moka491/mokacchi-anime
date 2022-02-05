import { Anime } from "~/api/anilist/types";

type Props = {
  anime: Anime;
};

export default function AnimeListItem({ anime, ...props }: Props) {
  return (
    <div
      className="flex gap-3 px-3 py-2 cursor-pointer bg-bgSecondary hover:bg-bgPrimary"
      {...props}
    >
      <img
        className="rounded w-[27px] h-[44px] object-cover"
        src={anime.coverImage.medium}
      />
      <div>
        <div className="text-textPrimary">{anime.title.romaji}</div>
        <div className="text-sm text-textSecondary">{anime.title.english}</div>
      </div>
    </div>
  );
}
