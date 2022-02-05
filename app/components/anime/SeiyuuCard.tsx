import { Seiyuu } from "~/api/anilist/types";

type Props = {
  seiyuu: Seiyuu;
};

export default function SeiyuuCard({ seiyuu }: Props) {
  return (
    <div className="p-3 rounded bg-bgSecondary flex flex-row items-center gap-4">
      <img
        src={seiyuu.image.medium}
        className="object-cover w-8 h-8 rounded-full"
      />
      <span>
        <div className="text-textSecondary">Voiced by</div>
        <div className="text-lg text-textPrimary">{seiyuu.name.full}</div>
      </span>
    </div>
  );
}
