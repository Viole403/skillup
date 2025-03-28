import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { SubscribeNewsletterDto } from './dto/subscribe-newsletter.dto';

@Injectable()
export class NewsletterService {
  constructor(private prisma: PrismaService) {}

  async subscribe(subscribeNewsletterDto: SubscribeNewsletterDto) {
    const { email } = subscribeNewsletterDto;

    // Check if subscription already exists
    const existingSubscription =
      await this.prisma.newsletterSubscription.findUnique({
        where: { email },
      });

    if (existingSubscription) {
      // If subscription exists but is inactive, reactivate it
      if (!existingSubscription.active) {
        return this.prisma.newsletterSubscription.update({
          where: { email },
          data: { active: true },
        });
      }
      // If subscription is already active, throw an error
      throw new ConflictException(
        'Email is already subscribed to the newsletter',
      );
    }

    // Create new subscription
    return this.prisma.newsletterSubscription.create({
      data: {
        email,
        active: true,
      },
    });
  }

  async unsubscribe(email: string) {
    const subscription = await this.prisma.newsletterSubscription.findUnique({
      where: { email },
    });

    if (!subscription || !subscription.active) {
      throw new NotFoundException('Email is not subscribed to the newsletter');
    }

    return this.prisma.newsletterSubscription.update({
      where: { email },
      data: { active: false },
    });
  }

  async verifySubscription(email: string) {
    const subscription = await this.prisma.newsletterSubscription.findUnique({
      where: { email },
    });

    if (!subscription) {
      return { subscribed: false };
    }

    return { subscribed: subscription.active };
  }

  async getAllSubscribers(page = 1, limit = 100, activeOnly = true) {
    const skip = (page - 1) * limit;

    const where = activeOnly ? { active: true } : {};

    const [subscribers, totalCount] = await Promise.all([
      this.prisma.newsletterSubscription.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          subscribedAt: 'desc',
        },
      }),
      this.prisma.newsletterSubscription.count({
        where,
      }),
    ]);

    return {
      data: subscribers,
      meta: {
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
        activeOnly,
      },
    };
  }
}
