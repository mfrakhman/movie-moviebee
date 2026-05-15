import { Controller, Get, Param, ParseIntPipe, Query } from "@nestjs/common";
import { MoviesService } from "./movies.service";

@Controller("movies")
export class MoviesController {
  constructor(private service: MoviesService) {}

  /** GET /movies/trending?window=week */
  @Get("trending")
  getTrending(@Query("window") window: "day" | "week" = "week") {
    return this.service.getTrending(window);
  }

  /** GET /movies/now-playing */
  @Get("now-playing")
  getNowPlaying(@Query("page") page = 1) {
    return this.service.getNowPlaying(+page);
  }

  /** GET /movies/top-rated */
  @Get("top-rated")
  getTopRated(@Query("page") page = 1) {
    return this.service.getTopRated(+page);
  }

  /** GET /movies/genres */
  @Get("genres")
  getGenres() {
    return this.service.getGenres();
  }

  /** GET /movies/search?q=inception&page=1 */
  @Get("search")
  search(
    @Query("q") q: string,
    @Query("include_adult") include_adult = true,
    @Query("page") page = 1,
  ) {
    return this.service.search(q, include_adult, +page);
  }

  /** GET /movies/genre/:genreId?page=1 */
  @Get("genre/:genreId")
  getByGenre(
    @Param("genreId", ParseIntPipe) genreId: number,
    @Query("page") page = 1,
  ) {
    return this.service.getByGenre(genreId, +page);
  }

  /** GET /movies/discover?page=1 — date descending */
  @Get("discover")
  discover(@Query("page") page = 1) {
    return this.service.discoverMovies(+page);
  }

  /** GET /movies/person/:personId — person bio + movie credits */
  @Get("person/:personId")
  getPersonDetails(@Param("personId", ParseIntPipe) personId: number) {
    return this.service.getPersonDetails(personId);
  }

  /** GET /movies/:tmdbId — movie details + local stats */
  @Get(":tmdbId")
  getDetails(@Param("tmdbId", ParseIntPipe) tmdbId: number) {
    return this.service.getDetails(tmdbId);
  }
}
