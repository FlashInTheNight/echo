import { Body, Controller, Get, Param, Post, Put, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/user.dto';
import { UserEntity } from './entities/user.entity';
import { LoginUserDto } from './dto/login.dto';
import { LoginEntity } from './entities/login.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UsersEntity } from './entities/users.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/configs/multer.config';
import { UpdateUserDto } from './dto/updateUser.dto';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/sign-up')
  @ApiCreatedResponse({ type: UserEntity })
  async signupUser(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return new UserEntity(await this.userService.createUser(createUserDto));
  }

  @Post('/login')
  @ApiOkResponse({ type: LoginEntity })
  signinUser(@Body() {email, password}: LoginUserDto) {
    return this.userService.login(email, password);
  }

  @Get('/current')
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  @UseGuards(JwtAuthGuard)
  async getCurrentUser(@Req() req): Promise<UserEntity> {
    const { user } = req;
    return new UserEntity( await this.userService.getCurrentUser(user));
  }

  @Get('/follower/:id')
  @ApiBearerAuth()
  @ApiOkResponse({ type: UsersEntity })
  @UseGuards(JwtAuthGuard)
  async getUserById(@Param('id') id: string, @Req() req): Promise<UsersEntity> {
    const { user } = req;
    return new UsersEntity( await this.userService.getUserById(id, user.id));
  }

  @Put('/follower/:id')
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('avatar', multerOptions))
  async upload(@Param('id') id: string, @UploadedFile() file: Express.Multer.File, @Req() req, @Body() updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const { user } = req;
    return new UserEntity( await this.userService.updateUser(updateUserDto, file, id, user.id));
  }
}
