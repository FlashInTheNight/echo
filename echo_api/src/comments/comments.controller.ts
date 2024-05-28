import { Body, Controller, Delete, Post, Req, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateCommentDto } from './dto/createComment.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateCommentEntity } from './entities/createComment.entity';
import { DeleteComment } from './dto/deleteComment.dto';
import { DeleteCommentEntity } from './entities/deleteComment.entity';

@Controller('comments')
@ApiTags('Comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post('create')
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: CreateCommentEntity })
  @UseGuards(JwtAuthGuard)
  async createComment(
    @Body() createCommentDto: CreateCommentDto,
    @Req() req,
  ): Promise<CreateCommentEntity> {
    const { user } = req;
    return await this.commentsService.createComment(createCommentDto, user.id);
  }

  @Delete('delete')
  @ApiBearerAuth()
  @ApiOkResponse({ type: DeleteCommentEntity })
  @UseGuards(JwtAuthGuard)
  async deleteComment(@Body() { commentId }: DeleteComment, @Req() req): Promise<DeleteCommentEntity> {
    const { user } = req;
    return await this.commentsService.deleteComment(commentId, user.id);
  }
}
