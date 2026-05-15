import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import axios, { AxiosInstance } from "axios";

@Injectable()
export class TmdbService {
  private readonly client: AxiosInstance;

  constructor(private config: ConfigService) {
    const apiKey = this.config.get<string>("TMDB_API_KEY");
    this.client = axios.create({
      baseURL: "https://api.themoviedb.org/3",
      params: { api_key: apiKey, language: "en-US" },
    });
  }

  private async get<T>(
    path: string,
    params: Record<string, any> = {},
  ): Promise<T> {
    try {
      const { data } = await this.client.get<T>(path, { params });
      return data;
    } catch (err: any) {
      throw new InternalServerErrorException(
        `TMDB request failed: ${err.message}`,
      );
    }
  }

  getTrending(timeWindow: "day" | "week" = "week") {
    return this.get<any>(`/trending/movie/${timeWindow}`);
  }

  searchMovies(query: string, page = 1) {
    return this.get<any>("/search/movie", { query, page });
  }

  getMovieDetails(tmdbId: number) {
    return this.get<any>(`/movie/${tmdbId}`, {
      append_to_response: "credits,videos,similar",
    });
  }

  getGenres() {
    return this.get<any>("/genre/movie/list");
  }

  getMoviesByGenre(genreId: number, page = 1) {
    return this.get<any>("/discover/movie", {
      with_genres: genreId,
      sort_by: "popularity.desc",
      page,
    });
  }

  discoverMovies(page = 1) {
    return this.get<any>("/discover/movie", {
      sort_by: "release_date.desc",
      "release_date.lte": new Date().toISOString().slice(0, 10),
      "vote_count.gte": 10,
      page,
    });
  }

  getNowPlaying(page = 1) {
    return this.get<any>("/movie/now_playing", { page });
  }

  getTopRated(page = 1) {
    return this.get<any>("/movie/top_rated", { page });
  }

  getPersonDetails(personId: number) {
    return this.get<any>(`/person/${personId}`, {
      append_to_response: "movie_credits",
    });
  }
}
