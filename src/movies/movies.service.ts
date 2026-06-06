import { Injectable } from "@nestjs/common";
import { TmdbService } from "./tmdb/tmdb.service";
import { ReviewsService } from "./reviews/reviews.service";

@Injectable()
export class MoviesService {
  constructor(
    private tmdb: TmdbService,
    private reviews: ReviewsService,
  ) {}

  getTrending(timeWindow: "day" | "week" = "week") {
    return this.tmdb.getTrending(timeWindow);
  }

  search(query: string, include_adult = false, page = 1) {
    return this.tmdb.searchMovies(query, include_adult, page);
  }

  async getDetails(tmdbId: number) {
    const [movie, stats] = await Promise.all([
      this.tmdb.getMovieDetails(tmdbId),
      this.reviews.getStats(tmdbId),
    ]);
    return { ...movie, localStats: stats };
  }

  getGenres() {
    return this.tmdb.getGenres();
  }

  getByGenre(genreId: number, page = 1) {
    return this.tmdb.getMoviesByGenre(genreId, page);
  }

  getNowPlaying(page = 1) {
    return this.tmdb.getNowPlaying(page);
  }

  getTopRated(page = 1) {
    return this.tmdb.getTopRated(page);
  }

  discoverMovies(page = 1) {
    return this.tmdb.discoverMovies(page);
  }

  getPersonDetails(personId: number) {
    return this.tmdb.getPersonDetails(personId);
  }
}
