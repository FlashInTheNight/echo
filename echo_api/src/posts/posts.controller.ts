import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PostsService } from './posts.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreatePostDto } from './dto/createPost.dto';
import { Post as PostDb, Prisma } from '@prisma/client';
import { createPostEntity } from './entities/createPost.entity';
import { getAllPostsEntity } from './entities/getAllPosts.entity';
import { getPostByIdEntity } from './entities/getPostById.entity';
import { DeletePostByIdEntity } from './entities/deletePostById.entity';

@Controller('posts')
@ApiTags('Posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post('create')
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: createPostEntity })
  @UseGuards(JwtAuthGuard)
  async createPost(
    @Body() createPostDto: CreatePostDto,
    @Req() req,
  ): Promise<PostDb> {
    const { user } = req;
    return await this.postsService.createPost(createPostDto, user.id);
  }

  @Get('get-all')
  @ApiBearerAuth()
  @ApiOkResponse({ type: [getAllPostsEntity] })
  @UseGuards(JwtAuthGuard)
  async getAllPosts(@Req() req): Promise<getAllPostsEntity[]> {
    const { user } = req;
    const posts = await this.postsService.getAllPosts(user.id);
    return posts.map((post) => new getAllPostsEntity(post));
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ type: getPostByIdEntity })
  @UseGuards(JwtAuthGuard)
  async getPostById(
    @Param('id') id: string,
    @Req() req,
  ): Promise<getPostByIdEntity> {
    const { user } = req;
    return new getPostByIdEntity(
      await this.postsService.getPostById(id, user.id),
    );
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ type: DeletePostByIdEntity })
  @UseGuards(JwtAuthGuard)
  async deletePost(
    @Param('id') id: string,
    @Req() req,
  ): Promise<[Prisma.BatchPayload, Prisma.BatchPayload, PostDb]> {
    const { user } = req;
    return await this.postsService.deletePost(id, user.id);
  }
}
