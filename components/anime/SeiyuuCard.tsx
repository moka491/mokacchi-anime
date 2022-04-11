import { Seiyuu } from 'api/anilist/types'
import Card from 'components/shared/Card'

type Props = {
  seiyuu: Seiyuu
}

export default function SeiyuuCard({ seiyuu }: Props) {
  return (
    <Card>
      <div className="flex flex-row items-center gap-4">
        <img
          src={seiyuu.image.medium}
          className="h-8 w-8 rounded-full object-cover"
        />
        <span>
          <div className="text-textSecondary">Voiced by</div>
          <a
            className="text-textPrimary hover:text-primary text-lg"
            href={`https://anilist.co/staff/${seiyuu.id}`}
          >
            {seiyuu.name.full}
          </a>
        </span>
      </div>
    </Card>
  )
}
