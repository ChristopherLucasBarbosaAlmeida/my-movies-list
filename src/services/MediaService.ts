import { MediaFilter } from "../types/MediaFilter";

export class MediaService {
  getMedias(filter?: MediaFilter) {}
  getFavorites(sessionId: string) {}
  addToFavorite(sessionId: string, mediaId: string) {}
  getReviews(mediaId: string) {}
  getMedia(mediaId: string) {}
  getGenres() {}
}
