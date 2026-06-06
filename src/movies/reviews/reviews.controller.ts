import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Headers,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Controller('movies')
export class ReviewsController {
  constructor(private service: ReviewsService) {}

  /** GET /movies/:tmdbId/reviews — list all reviews for a movie */
  @Get(':tmdbId/reviews')
  getByMovie(@Param('tmdbId', ParseIntPipe) tmdbId: number) {
    return this.service.getByMovie(tmdbId);
  }

  /** GET /movies/:tmdbId/reviews/stats — rating stats for a movie */
  @Get(':tmdbId/reviews/stats')
  getStats(@Param('tmdbId', ParseIntPipe) tmdbId: number) {
    return this.service.getStats(tmdbId);
  }

  /** GET /movies/:tmdbId/reviews/mine — current user's review */
  @Get(':tmdbId/reviews/mine')
  getMyReview(
    @Param('tmdbId', ParseIntPipe) tmdbId: number,
    @Headers('x-user-id') userId: string,
  ) {
    return this.service.getMyReview(tmdbId, userId);
  }

  /** POST /movies/:tmdbId/reviews — create or update review (upsert) */
  @Post(':tmdbId/reviews')
  upsert(
    @Param('tmdbId', ParseIntPipe) tmdbId: number,
    @Headers('x-user-id') userId: string,
    @Headers('x-user-email') userEmail: string,
    @Headers('x-user-display-name') displayName: string,
    @Headers('x-user-avatar-url') avatarUrl: string,
    @Body() dto: CreateReviewDto,
  ) {
    return this.service.upsert(tmdbId, userId, userEmail, displayName, avatarUrl, dto);
  }

  /** PUT /movies/:tmdbId/reviews — update existing review */
  @Put(':tmdbId/reviews')
  update(
    @Param('tmdbId', ParseIntPipe) tmdbId: number,
    @Headers('x-user-id') userId: string,
    @Body() dto: UpdateReviewDto,
  ) {
    return this.service.update(tmdbId, userId, dto);
  }

  /** DELETE /movies/:tmdbId/reviews — delete own review */
  @Delete(':tmdbId/reviews')
  @HttpCode(204)
  delete(
    @Param('tmdbId', ParseIntPipe) tmdbId: number,
    @Headers('x-user-id') userId: string,
  ) {
    return this.service.delete(tmdbId, userId);
  }

  /** GET /movies/reviews/mine — all reviews by the current user */
  @Get('reviews/mine')
  getMyReviews(@Headers('x-user-id') userId: string) {
    return this.service.getByUser(userId);
  }
}
