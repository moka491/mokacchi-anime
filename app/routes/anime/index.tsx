import { useContext, useState } from "react";
import { getAnimeCharactersAndSeiyuus } from "~/api/anilist";
import { Anime, CharacterWithSeiyuus } from "~/api/anilist/types";
import AnimeSearchInput from "~/components/anime/AnimeSearchInput";
import SeiyuuCard from "~/components/anime/SeiyuuCard";
import SeiyuuCharacterCard from "~/components/anime/SeiyuuCharacterCard";
import SeiyuuOtherRolesColumn from "~/components/anime/SeiyuuOtherRolesColumn";
import Checkbox from "~/components/shared/Checkbox";
import { AuthContext } from "~/context/AuthContext";

export default function SeiyuuLookup() {
  const { loggedIn } = useContext(AuthContext);

  const [characterResults, setCharacterResults] = useState<
    CharacterWithSeiyuus[]
  >([]);

  const [onlyUserAnime, setOnlyUserAnime] = useState(false);

  function onAnimeSelected(anime: Anime) {
    getAnimeCharactersAndSeiyuus(anime.id).then((res) =>
      setCharacterResults(res)
    );
  }

  return (
    <div>
      <div className="flex items-center justify-center gap-8">
        <AnimeSearchInput onAnimeSelected={onAnimeSelected} />
        <Checkbox
          label="Only my Anime"
          disabled={!loggedIn}
          checked={onlyUserAnime}
          onChange={(e) => setOnlyUserAnime(e.target.checked)}
        />
      </div>

      <div className="grid grid-flow-col gap-4 mt-4 overflow-auto">
        {characterResults.map((character) => (
          <div key={character.id} className="w-[250px] flex flex-col gap-4">
            <SeiyuuCharacterCard character={character} />

            {character.seiyuus[0] && (
              <SeiyuuOtherRolesColumn
                seiyuu={character.seiyuus[0]}
                excludeCharacterId={character.id}
                onlyUserAnime={onlyUserAnime}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
