import { Body, Controller, Delete, Param, Post, Req, UseGuards } from '@nestjs/common';
import { FollowsService } from './follows.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FollowUserDto } from './dto/followUser.dto';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FollowUserEntity } from './entities/followUser.entity';

@Controller('follows')
@ApiTags('follows')
export class FollowsController {
  constructor(private readonly followsService: FollowsService) {}

  @Post('follow')
  @ApiBearerAuth()
  @ApiOkResponse({ type: FollowUserEntity })
  @UseGuards(JwtAuthGuard)
  async followUser(
    @Body() { followingId }: FollowUserDto,
    @Req() req,
  ): Promise<FollowUserEntity> {
    const { user } = req;
    return await this.followsService.followUser(followingId, user.id);
  }

  @Delete('/unfollow')
  @ApiBearerAuth()
  @ApiOkResponse({ type: FollowUserEntity })
  @UseGuards(JwtAuthGuard)
  async unfollowUser(
    @Body() { followingId }: FollowUserDto,
    @Req() req,
  ): Promise<FollowUserEntity> {
    const { user } = req;
    return await this.followsService.unfollowUser(followingId, user.id);
  }
}
