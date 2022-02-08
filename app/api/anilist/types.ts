export type Paginated<T> = {
  data: T;
  hasNextPage: boolean;
};

export type UserInfo = {
  id: string;
  name: string;
  avatar: {
    romaji: string;
  };
};

export type Anime = {
  id: number;
  title: {
    romaji: string;
    english: string;
  };
  coverImage: {
    medium: string;
  };
};

export type Character = {
  id: number;
  name: {
    full: string;
    native: string;
  };
  image: {
    medium: string;
  };
};

export type CharacterWithSeiyuus = Character & {
  seiyuus: Seiyuu[];
};

export type Seiyuu = {
  id: number;
  name: {
    full: string;
  };
  image: {
    medium: string;
  };
};

export type SeiyuuRole = {
  character: Character;
  anime: Anime;
};
