import { useEffect, useState } from "react";
import { MoviesResponse } from "../types/MovieResponse";
import { axiosInstance } from "../libs/axios";

export function useMovie(genre: string, popularity: string) {
  const [response, setResponse] = useState<MoviesResponse>();

  useEffect(() => {
    (async () => {
      const response = await axiosInstance.get("discover/movie", {
        params: {
          with_genres: genre,
          sort_by: popularity,
        },
      });
      setResponse(response.data);
    })();
  }, [genre, popularity]);

  return { response };
}
