import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private service: MoviesService) {}

  /** GET /movies/trending?window=week */
  @Get('trending')
  getTrending(@Query('window') window: 'day' | 'week' = 'week') {
    return this.service.getTrending(window);
  }

  /** GET /movies/now-playing */
  @Get('now-playing')
  getNowPlaying(@Query('page') page = 1) {
    return this.service.getNowPlaying(+page);
  }

  /** GET /movies/top-rated */
  @Get('top-rated')
  getTopRated(@Query('page') page = 1) {
    return this.service.getTopRated(+page);
  }

  /** GET /movies/genres */
  @Get('genres')
  getGenres() {
    return this.service.getGenres();
  }

  /** GET /movies/search?q=inception&page=1 */
  @Get('search')
  search(@Query('q') q: string, @Query('page') page = 1) {
    return this.service.search(q, +page);
  }

  /** GET /movies/genre/:genreId?page=1 */
  @Get('genre/:genreId')
  getByGenre(
    @Param('genreId', ParseIntPipe) genreId: number,
    @Query('page') page = 1,
  ) {
    return this.service.getByGenre(genreId, +page);
  }

  /** GET /movies/:tmdbId — movie details + local stats */
  @Get(':tmdbId')
  getDetails(@Param('tmdbId', ParseIntPipe) tmdbId: number) {
    return this.service.getDetails(tmdbId);
  }
}
