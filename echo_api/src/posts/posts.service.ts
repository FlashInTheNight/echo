import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './dto/createPost.dto';
import { Post, Prisma } from '@prisma/client';
import { getAllPostsEntity } from './entities/getAllPosts.entity';
import { getPostByIdEntity } from './entities/getPostById.entity';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async createPost({ content }: CreatePostDto, userId: string): Promise<Post> {
    const post = await this.prisma.post.create({
      data: {
        content,
        authorId: userId,
      },
    });

    return post;
  }

  async getAllPosts(userId): Promise<getAllPostsEntity[]> {
    // const posts = await this.prisma.post.findMany({
    //   include: {
    //     likes: true,
    //     author: {
    //       select: {
    //         id: true,
    //         email: true,
    //         name: true,
    //         avatarUrl: true,
    //         dateOfBirth: true,
    //         createdAt: true,
    //         updatedAt: true,
    //         bio: true,
    //         location: true,
    //         // password не включено
    //       },
    //     },
    //     comments: true,
    //   },
    //   orderBy: {
    //     createdAt: 'desc',
    //   },
    // });

    const posts = await this.prisma.post.findMany({
      include: {
        likes: true,
        author: true,
        comments: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    const postsWithLikeInfo = posts.map((post) => ({
      ...post,
      likedByUser: post.likes.some((like) => like.userId === userId),
    }));

    return postsWithLikeInfo;
  }

  async getPostById(postId: string, userId: string): Promise<getPostByIdEntity> {
    const post = await this.prisma.post.findUnique({
      where: { id: postId },
      include: {
        comments: {
          include: {
            user: true,
          }
        },
        likes: true,
        author: true
      },
    });

    const postWithLikeInfo = {
      ...post,
      likedByUser: post.likes.some(like => like.userId === userId)
    };

    return postWithLikeInfo
  }

  async deletePost(postId: string, userId: string): Promise<[Prisma.BatchPayload, Prisma.BatchPayload, Post]> {
    const post = await this.prisma.post.findUnique({ where: { id: postId } });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    if (post.authorId !== userId) {
      throw new UnauthorizedException('Unauthorized'); 
    }

    const transaction = await this.prisma.$transaction([
      this.prisma.comment.deleteMany({ where: { postId } }),
      this.prisma.like.deleteMany({ where: { postId } }),
      this.prisma.post.delete({ where: { id: postId } }),
    ]);

    return transaction
  }
}
