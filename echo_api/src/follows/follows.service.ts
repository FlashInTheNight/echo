import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FollowsService {
  constructor(private prisma: PrismaService) {}

  async followUser(followingId: string, userId: string): Promise<{ message: string }> {
    if (followingId === userId) {
      throw new HttpException('You cannot follow yourself', HttpStatus.BAD_REQUEST);
    }

    const existingSubscription = await this.prisma.follows.findFirst({
      where: {
         AND: [
           {
             followerId: userId
           },
           {
             followingId
           }
         ]
      }
     })

    if (existingSubscription) {
      throw new HttpException('You are already following this user', HttpStatus.BAD_REQUEST);
    }

    await this.prisma.follows.create({
      data: {
        follower: { connect: { id: userId } },
        following: { connect: { id: followingId } },
      },
    });

    return { message: 'Subscription created successfully' };
  }

  async unfollowUser(followingId: string, userId: string): Promise<{ message: string }> {
    const follows = await this.prisma.follows.findFirst({
      where: {
        AND: [{ followerId: userId }, { followingId: followingId }]
      },
    });

    if (!follows) {
      throw new HttpException('You are not following this user', HttpStatus.BAD_REQUEST);
    }

    await this.prisma.follows.delete({
      where: { id: follows.id },
    });

    return { message: 'Subscription deleted successfully' };
  }
}
