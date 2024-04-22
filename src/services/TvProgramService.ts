import { AxiosResponse } from "axios";
import { axiosInstance } from "../libs/axios";
import { TvProgram } from "../types/TvProgram";
import { PagedReview, PagedTvProgram, PaginatedData } from "../types/PaginatedData";
import { MediaFilter } from "../types/MediaFilter";
import { MediaService } from "./MediaService";

class TvProgramService extends MediaService {
  async getMedia(mediaId: string) {
    const response: AxiosResponse<TvProgram> = await axiosInstance.get(`/tv/${mediaId}`);
    return response.data;
  }

  async addToFavorite(sessionId: string, mediaId: string) {
    await axiosInstance.post(`/account/${sessionId}/favorite`, {
      media_type: "tv",
      media_id: mediaId,
      favorite: true,
    });
  }

  async getReviews(mediaId: string) {
    const response: AxiosResponse<PaginatedData<PagedReview>> = await axiosInstance.get(
      `tv/${mediaId}/reviews`
    );
    return response.data;
  }

  async getFavorites(sessionId: string) {
    const response: AxiosResponse<PaginatedData<PagedTvProgram>> = await axiosInstance.get(
      `/account/${sessionId}/favorite/tv`
    );
    return response.data;
  }

  async getMedias(filter?: MediaFilter) {
    const response: AxiosResponse<PaginatedData<PagedTvProgram>> = await axiosInstance.get(
      "/tv/popular",
      {
        params: {
          filter,
        },
      }
    );
    return response.data;
  }
}

export const tvProgramService = new TvProgramService();
