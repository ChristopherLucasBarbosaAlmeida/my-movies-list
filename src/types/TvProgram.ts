export type TvProgram = {
  created_by: {
    id: number;
    credit_id: string;
    name: string;
    gender: number;
    profile_path: string;
  }[];
  episode_run_time: number[];
  first_air_data: string;
  genres: { id: number; name: string }[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: {
    id: number;
    overview: string;
    name: string;
    vote_average: number;
    vote_count: number;
    air_date: string;
    episode_number: number;
    episode_type: string;
    production_code: string;
    runtime: number;
    season_number: number;
    show_id: number;
    still_path: string;
  };
  name: string;
  next_episode_to_air?: string;
  networks: { id: number; logo_path: string; name: string; origin_country: string };
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: {
    id: number;
    logo_path: string;
    name: string;
    origin_county: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  };
  seasons: {
    air_data?: string;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    season_number: number;
    vote_average: number;
  }[];
  spoken_language: { english_name: string; iso_639_1: string; name: string };
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
};
