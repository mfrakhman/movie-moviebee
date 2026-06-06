import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ReviewsRepository } from './reviews.repository';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewsService {
  constructor(private repo: ReviewsRepository) {}

  getByMovie(tmdbId: number) {
    return this.repo.findByMovie(tmdbId);
  }

  getByUser(userId: string) {
    return this.repo.findByUser(userId);
  }

  getMyReview(tmdbId: number, userId: string) {
    return this.repo.findOne(tmdbId, userId);
  }

  getStats(tmdbId: number) {
    return this.repo.getStats(tmdbId);
  }

  upsert(
    tmdbId: number,
    userId: string,
    userEmail: string,
    displayName: string,
    avatarUrl: string,
    dto: CreateReviewDto,
  ) {
    return this.repo.upsert(tmdbId, userId, userEmail, displayName, avatarUrl, dto);
  }

  async update(tmdbId: number, userId: string, dto: UpdateReviewDto) {
    const existing = await this.repo.findOne(tmdbId, userId);
    if (!existing) throw new NotFoundException('Review not found');
    if (existing.userId !== userId) throw new ForbiddenException();
    return this.repo.update(tmdbId, userId, dto);
  }

  async delete(tmdbId: number, userId: string) {
    const existing = await this.repo.findOne(tmdbId, userId);
    if (!existing) throw new NotFoundException('Review not found');
    return this.repo.delete(tmdbId, userId);
  }
}
