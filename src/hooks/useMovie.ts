import { useEffect, useState } from "react";
import { axiosInstance } from "../libs/axios";
import { Movie } from "../types/Movie";
import { ReviewsResponse } from "../types/ReviewsResponse";

export function useMovie(movieId?: string) {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [reviewsResponse, setReviewsResponse] = useState<ReviewsResponse | null>(null);

  useEffect(() => {
    (async () => {
      const response = await axiosInstance.get(`movie/${movieId}`);
      setMovie(response.data);
    })();
  }, [movieId]);

  useEffect(() => {
    (async () => {
      const response = await axiosInstance.get(`movie/${movieId}/reviews`);
      setReviewsResponse(response.data);
    })();
  }, [movieId]);

  return { movie, reviewsResponse };
}
