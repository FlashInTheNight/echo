import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import { CreateUserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import * as jdenticon from 'jdenticon';
import * as fs from 'fs';
import * as path from 'path';
import { LoginEntity } from './entities/login.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async createUser(CreateUserDto: CreateUserDto): Promise<User> {
    const { email, password, name } = CreateUserDto;

    // Хешируем пароль
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // Генерируем аватар для нового пользователя
    const png = jdenticon.toPng(name, 200);
    const avatarName = `${name}_${Date.now()}.png`;
    const avatarPath = path.join(__dirname, '/../../uploads', avatarName);
    fs.writeFileSync(avatarPath, png);

    // Создаем пользователя
    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        avatarUrl: `/uploads/${avatarName}`,
      },
    });

    return user;
  }

  async login(email: string, password: string): Promise<LoginEntity> {
    const user = await this.prisma.user.findUnique({
      where: {
        email
      }
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('User not found');
    }

   return {
    accessToken: this.jwtService.sign({ userId: user.id })
   }
  }

  async getCurrentUser(currentUser: User): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: currentUser.id
      },
      include: {
        followers: {
          include: {
            follower: true
          }
        },
        following: {
          include: {
            following: true
          }
        }
      }
    })

    if(!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async getUserById(id: string, userId: string): Promise<User & { isFollowing: boolean }> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        followers: true,
        following: true
      }
    });

    // провериит на 404 ошибку

    // Проверяем, подписан ли текущий пользователь на другого пользователя
    const isFollowing = await this.prisma.follows.findFirst({
      where: {
        AND: [
          { followerId: userId },
          { followingId: id }
        ]
      }
    })

    return {...user, isFollowing: Boolean(isFollowing)}
  }

  async updateUser(updateUserDto, file, id, currentUserId): Promise<User> {
    const { email, name, dateOfBirth, bio, location } = updateUserDto;
    
    let filePath;

    if (file && file.path) {
      filePath = file.path;
    }

    // Проверка, что пользователь обновляет свою информацию
    if(id !== currentUserId) {
      throw new UnauthorizedException('You are not authorized to update this user');
    }

    if (email) {
      const existingUser = await this.prisma.user.findUnique({
        where: {
          email
        }
      });

      if (existingUser && existingUser.id !== id) {
        throw new ConflictException('This email already in use');
      }
    }

    const user = await this.prisma.user.update({
      where: {
        id
      },
      data: {
        email: email || undefined,
        name: name || undefined,
        avatarUrl: filePath ? `/${filePath}` : undefined,
        dateOfBirth: dateOfBirth || undefined,
        bio: bio || undefined,
        location: location || undefined,
      }
    })

    return user;
  }
}

