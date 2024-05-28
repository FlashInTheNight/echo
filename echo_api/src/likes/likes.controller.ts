import { Body, Controller, Delete, Post, Req, UseGuards } from '@nestjs/common';
import { LikesService } from './likes.service';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateLikeDto } from './dto/like.dto';
import { LikeEntity } from './entities/like.entity';
import { DeleteLikeEntity } from './entities/deleteLike.entity';

@Controller('likes')
@ApiTags('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post('likePost')
  @ApiBearerAuth()
  @ApiOkResponse({ type: LikeEntity })
  @UseGuards(JwtAuthGuard)
  async likePost(
    @Body() { postId }: CreateLikeDto,
    @Req() req,
  ): Promise<LikeEntity> {
    const { user } = req;
    return await this.likesService.likePost(postId, user.id);
  }

  @Delete('unlikePost')
  @ApiBearerAuth()
  @ApiOkResponse({ type: DeleteLikeEntity })
  @UseGuards(JwtAuthGuard)
  async unlikePost(
    @Body() { postId }: CreateLikeDto,
    @Req() req,
  ): Promise<DeleteLikeEntity> {
    const { user } = req;
    return await this.likesService.unlikePost(postId, user.id);
  }
}
