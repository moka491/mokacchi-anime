import { Anime } from 'api/anilist/types'

type Props = {
  anime: Anime
  onClick: React.MouseEventHandler<HTMLDivElement>
}

export default function AnimeListItem({ anime, ...props }: Props) {
  return (
    <div
      className="bg-bgSecondary hover:bg-bgPrimary flex cursor-pointer gap-3 px-3 py-2"
      {...props}
    >
      <img
        className="h-[44px] w-[27px] rounded object-cover"
        src={anime.coverImage.medium}
      />
      <div>
        <div className="text-textPrimary">{anime.title.romaji}</div>
        <div className="text-textSecondary text-sm">{anime.title.english}</div>
      </div>
    </div>
  )
}
