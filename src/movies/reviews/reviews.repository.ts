import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewsRepository {
  constructor(private prisma: PrismaService) {}

  findByMovie(tmdbId: number) {
    return this.prisma.review.findMany({
      where: { tmdbId },
      orderBy: { createdAt: 'desc' },
    });
  }

  findByUser(userId: string) {
    return this.prisma.review.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  findOne(tmdbId: number, userId: string) {
    return this.prisma.review.findUnique({
      where: { tmdbId_userId: { tmdbId, userId } },
    });
  }

  upsert(
    tmdbId: number,
    userId: string,
    userEmail: string,
    dto: CreateReviewDto,
  ) {
    return this.prisma.review.upsert({
      where: { tmdbId_userId: { tmdbId, userId } },
      create: { tmdbId, userId, userEmail, ...dto },
      update: { ...dto, userEmail },
    });
  }

  update(tmdbId: number, userId: string, dto: UpdateReviewDto) {
    return this.prisma.review.update({
      where: { tmdbId_userId: { tmdbId, userId } },
      data: dto,
    });
  }

  delete(tmdbId: number, userId: string) {
    return this.prisma.review.delete({
      where: { tmdbId_userId: { tmdbId, userId } },
    });
  }

  async getStats(tmdbId: number) {
    const result = await this.prisma.review.aggregate({
      where: { tmdbId },
      _avg: { rating: true },
      _count: { rating: true },
    });
    return {
      averageRating: result._avg.rating
        ? Math.round(result._avg.rating * 10) / 10
        : null,
      reviewCount: result._count.rating,
    };
  }
}
