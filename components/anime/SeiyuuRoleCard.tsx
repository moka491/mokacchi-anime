import { SeiyuuRole } from 'api/anilist/types'
import Card from 'components/shared/Card'

type Props = {
  role: SeiyuuRole
}

export default function SeiyuuRoleCard({ role }: Props) {
  return (
    <Card>
      <div className="grid grid-cols-[max-content_auto] items-center gap-4">
        <img
          src={role.character.image.medium}
          className="h-8 w-8 rounded-full object-cover"
        />
        <div>
          <div>
            <a
              className=" text-textPrimary hover:text-primary"
              href={`https://anilist.co/character/${role.character.id}`}
            >
              {role.character.name.full}
            </a>
          </div>
          <div>
            <a
              className="text-textSecondary hover:text-primary text-sm"
              href={`https://anilist.co/anime/${role.anime.id}`}
            >
              {role.anime.title.romaji}
            </a>
          </div>
        </div>
      </div>
    </Card>
  )
}
