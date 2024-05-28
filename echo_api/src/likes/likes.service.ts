import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Like, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LikesService {
  constructor(private prisma: PrismaService) {}

  async likePost(postId: string, userId: string): Promise<Like> {
    const existingLike = await this.prisma.like.findFirst({
      where: { postId, userId },
    });

    if(existingLike) {
      throw new HttpException('You already liked this post', HttpStatus.BAD_REQUEST);
    }

    const like = await this.prisma.like.create({ 
      data: { postId, userId },
    });

    return like;
  }

  async unlikePost(postId: string, userId: string): Promise<Prisma.BatchPayload> {
    const existingLike = await this.prisma.like.findFirst({
      where: { postId, userId },
    });

    if(!existingLike) {
      throw new HttpException('You have not liked this post', HttpStatus.BAD_REQUEST);
    }

    const like = await this.prisma.like.deleteMany({
      where: { postId, userId },
    });

    return like;
  }
}
