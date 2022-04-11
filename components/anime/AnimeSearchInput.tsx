import { searchAnime } from 'api/anilist'
import { Anime } from 'api/anilist/types'
import TextInput from 'components/shared/TextInput'
import { ChangeEvent, useMemo, useState } from 'react'
import throttle from 'lodash.throttle'
import classes from 'utils/classes'
import AnimeListItem from 'components/anime/AnimeListItem'

export default function AnimeSearchInput({
  onAnimeSelected = (anime: Anime) => {},
}) {
  const [input, setInput] = useState('')
  const [results, setResults] = useState<Anime[]>([])

  const searchAnimeThrottled = useMemo(
    () =>
      throttle(
        (search) =>
          searchAnime(search).then((res) => {
            setResults(res)
          }),
        400
      ),
    []
  )

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value)
    searchAnimeThrottled(e.target.value)
  }

  function handleAnimeSelect(anime: Anime) {
    setInput(anime.title.romaji)
    onAnimeSelected(anime)
    setResults([])
  }

  return (
    <div className="relative w-full max-w-[400px] focus-within:drop-shadow-lg">
      <div
        className={classes(
          'bg-bgSecondary',
          results.length > 0 ? 'rounded-t' : 'rounded'
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
        <div className="absolute inset-x-0 z-10 max-h-[300px] overflow-auto rounded-b bg-bgSecondary">
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
  )
}
