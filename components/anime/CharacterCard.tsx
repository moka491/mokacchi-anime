import { CharacterWithSeiyuus } from 'api/anilist/types'
import Card from '../shared/Card'

type Props = {
  character: CharacterWithSeiyuus
}

export default function SeiyuuCharacterCard({ character }: Props) {
  return (
    <Card>
      <div className="flex flex-col items-center">
        <img
          src={character.image.medium}
          className="mb-2 h-9 w-9 rounded-full object-cover"
        />
        <a
          className="text-textPrimary hover:text-primary"
          href={`https://anilist.co/character/${character.id}`}
        >
          {character.name.full}
        </a>
        <div className="text-textSecondary text-sm">
          {character.name.native}
        </div>
      </div>
    </Card>
  )
}
