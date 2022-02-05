import { useMemo, useState } from "react";
import { searchAnime } from "~/api/anilist";
import { Anime } from "~/api/anilist/types";
import classes from "~/utils/classes";
import TextInput from "../shared/TextInput";
import AnimeListItem from "./AnimeListItem";
import throttle from "lodash.throttle";

export default function AnimeSearchInput({
  onAnimeSelected = (anime: Anime) => {},
}) {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<Anime[]>([]);

  const searchAnimeThrottled = useMemo(
    () =>
      throttle(
        (search) =>
          searchAnime(search).then((res) => {
            setResults(res);
          }),
        400
      ),
    []
  );

  function handleInputChange(e) {
    setInput(e.target.value);
    searchAnimeThrottled(e.target.value);
  }

  function handleAnimeSelect(anime: Anime) {
    setInput(anime.title.romaji);
    onAnimeSelected(anime);
    setResults([]);
  }

  return (
    <div className="max-w-[400px] w-full relative focus-within:drop-shadow-lg">
      <div
        className={classes(
          "bg-bgSecondary",
          results.length > 0 ? "rounded-t" : "rounded"
        )}
      >
        <TextInput
          fullWidth
          placeholder="Search for Anime..."
          onChange={handleInputChange}
          value={input}
        />
      </div>

      {results.length > 0 && (
        <div className="absolute bg-bgSecondary inset-x-0 max-h-[300px] overflow-auto rounded-b z-10">
          {results.map((anime) => (
            <AnimeListItem
              key={anime.id}
              anime={anime}
              onClick={() => handleAnimeSelect(anime)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
