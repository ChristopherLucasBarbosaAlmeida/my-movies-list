import { AxiosResponse } from "axios";
import { axiosInstance } from "../libs/axios";
import { PagedMovie, PagedReview, PaginatedData } from "../types/PaginatedData";
import { Movie } from "../types/Movie";
import { MediaFilter } from "../types/MediaFilter";
import { MediaService } from "./MediaService";
import { Genre } from "../types/Genre";

class MovieService implements MediaService {
  async getMedias(filter?: MediaFilter) {
    const response: AxiosResponse<PaginatedData<PagedMovie>> = await axiosInstance.get(
      "/discover/movie",
      {
        params: {
          with_genres: filter?.withGenres,
          sort_by: filter?.sortBy,
        },
      }
    );
    return response.data;
  }

  async getFavorites(sessionId: string) {
    const response: AxiosResponse<PaginatedData<PagedMovie>> = await axiosInstance.get(
      `/account/${sessionId}/favorite/movies`
    );
    return response.data;
  }

  async addToFavorite(sessionId: string, mediaId: string) {
    await axiosInstance.post(`/account/${sessionId}/favorite`, {
      media_type: "movie",
      media_id: mediaId,
      favorite: true,
    });
  }

  async getReviews(mediaId: string) {
    const response: AxiosResponse<PaginatedData<PagedReview>> = await axiosInstance.get(
      `/movie/${mediaId}/reviews`
    );
    return response.data;
  }

  async getMedia(mediaId: string) {
    const response: AxiosResponse<Movie> = await axiosInstance.get(`/movie/${mediaId}`);
    return response.data;
  }

  async getGenres(): Promise<Genre> {
    const response: AxiosResponse<Genre> = await axiosInstance.get("/genre/movie/list");
    return response.data;
  }
}

export const movieService = new MovieService();
