export type PaginatedData<T> = {
  page: number;
  results: T[];
  total_page: number;
  total_results: number;
};

export type PagedMovie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_avarage: number;
  vote_count: number;
};

export type PagedReview = {
  author: string;
  author_details: {
    name: string;
    username: string;
    avatar_path: string;
    rating: number;
  };
  content: string;
  created_at: string;
  id: string;
  updated_at: string;
  url: string;
};

export type PagedTvProgram = {
  adult: boolean;
  backdrop_path: string;
  genres_id: number[];
  id: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  poopularity: number;
  poster_path: string;
  first_air_date: string;
  name: string;
  vote_average_: number;
  vote_count: number;
};

export type PagedList = {
  description: string;
  favorite_count: number;
  id: number;
  item_count: number;
  iso_639_1: string;
  list_type: string;
  name: string;
  poster_path?: string;
};
