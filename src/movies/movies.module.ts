import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { TmdbService } from './tmdb/tmdb.service';
import { ReviewsController } from './reviews/reviews.controller';
import { ReviewsService } from './reviews/reviews.service';
import { ReviewsRepository } from './reviews/reviews.repository';

@Module({
  controllers: [MoviesController, ReviewsController],
  providers: [MoviesService, TmdbService, ReviewsService, ReviewsRepository],
})
export class MoviesModule {}
