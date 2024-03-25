import { useEffect, useState } from "react";
import { GenreResponse } from "../types/Genre";
import { axiosInstance } from "../libs/axios";

export function useGenres() {
  const [genres, setGenres] = useState<GenreResponse>();

  useEffect(() => {
    (async () => {
      const response = await axiosInstance.get("genre/movie/list");
      setGenres(response.data);
    })();
  }, []);

  return genres?.genres ?? [];
}
