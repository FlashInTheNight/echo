import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCommentDto } from './dto/createComment.dto';
import { Comment } from '@prisma/client';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  async createComment({ postId, content }: CreateCommentDto, userId: string): Promise<Comment> {
    const comment = await this.prisma.comment.create({
      data: {
        postId,
        userId,
        content
      },
    });

    return comment
  }

  async deleteComment(commentId: string, userId: string): Promise<{ message: string }> {
    // Check if comment exists
    const comment = await this.prisma.comment.findUnique({ where: { id: commentId } });

    if (!comment) {
      throw new HttpException('this comment does not exist', HttpStatus.NOT_FOUND);
    }

    // Check if the user is the owner of the comment
    if (comment.userId !== userId) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    // Delete the comment
    await this.prisma.comment.delete({ where: { id: commentId } });

    return { message: 'Comment deleted successfully' };
  }
}
