import {
  Injectable,
  NotFoundException,
  ConflictException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { UserRole } from '@prisma/client';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  async create(createEventDto: CreateEventDto) {
    return this.prisma.event.create({
      data: createEventDto,
    });
  }

  async findAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const [events, totalCount] = await Promise.all([
      this.prisma.event.findMany({
        skip,
        take: limit,
        orderBy: {
          eventDate: 'asc',
        },
        include: {
          _count: {
            select: {
              registrations: true,
            },
          },
        },
      }),
      this.prisma.event.count(),
    ]);

    return {
      data: events,
      meta: {
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
      },
    };
  }

  async findOne(id: string) {
    const event = await this.prisma.event.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            registrations: true,
          },
        },
      },
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    return event;
  }

  async update(id: string, updateEventDto: UpdateEventDto, userRole: UserRole) {
    // Only admins can update events
    if (userRole !== UserRole.ADMIN) {
      throw new ForbiddenException('Only administrators can update events');
    }

    // Check if event exists
    const event = await this.prisma.event.findUnique({
      where: { id },
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    return this.prisma.event.update({
      where: { id },
      data: updateEventDto,
    });
  }

  async remove(id: string, userRole: UserRole) {
    // Only admins can delete events
    if (userRole !== UserRole.ADMIN) {
      throw new ForbiddenException('Only administrators can delete events');
    }

    // Check if event exists
    const event = await this.prisma.event.findUnique({
      where: { id },
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    return this.prisma.event.delete({
      where: { id },
    });
  }

  async registerForEvent(userId: string, eventId: string) {
    // Check if event exists
    const event = await this.prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    // Check if user is already registered
    const existingRegistration = await this.prisma.eventRegistration.findUnique(
      {
        where: {
          eventId_userId: {
            eventId,
            userId,
          },
        },
      },
    );

    if (existingRegistration) {
      throw new ConflictException('User is already registered for this event');
    }

    return this.prisma.eventRegistration.create({
      data: {
        event: { connect: { id: eventId } },
        user: { connect: { id: userId } },
      },
    });
  }

  async cancelRegistration(userId: string, eventId: string) {
    // Check if event exists
    const event = await this.prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    // Check if registration exists
    const registration = await this.prisma.eventRegistration.findUnique({
      where: {
        eventId_userId: {
          eventId,
          userId,
        },
      },
    });

    if (!registration) {
      throw new NotFoundException('Registration not found');
    }

    return this.prisma.eventRegistration.delete({
      where: {
        eventId_userId: {
          eventId,
          userId,
        },
      },
    });
  }

  async getRegisteredEvents(userId: string, page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const [registrations, totalCount] = await Promise.all([
      this.prisma.eventRegistration.findMany({
        where: {
          userId,
        },
        skip,
        take: limit,
        include: {
          event: true,
        },
        orderBy: {
          event: {
            eventDate: 'asc',
          },
        },
      }),
      this.prisma.eventRegistration.count({
        where: {
          userId,
        },
      }),
    ]);

    // Transform the data to return just the events
    const events = registrations.map((registration) => registration.event);

    return {
      data: events,
      meta: {
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
      },
    };
  }

  async getEventAttendees(
    eventId: string,
    page = 1,
    limit = 10,
    userRole: UserRole,
  ) {
    // Only admins can view attendees
    if (userRole !== UserRole.ADMIN) {
      throw new ForbiddenException(
        'Only administrators can view event attendees',
      );
    }

    // Check if event exists
    const event = await this.prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    const skip = (page - 1) * limit;

    const [registrations, totalCount] = await Promise.all([
      this.prisma.eventRegistration.findMany({
        where: {
          eventId,
        },
        skip,
        take: limit,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
        orderBy: {
          createdAt: 'asc',
        },
      }),
      this.prisma.eventRegistration.count({
        where: {
          eventId,
        },
      }),
    ]);

    // Transform the data to return just the users
    const attendees = registrations.map((registration) => registration.user);

    return {
      data: attendees,
      meta: {
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
      },
    };
  }
}
