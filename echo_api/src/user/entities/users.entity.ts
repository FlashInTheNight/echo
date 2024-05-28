import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UsersEntity implements User {
  constructor(partial: Partial<UsersEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @Exclude()
  password: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  avatarUrl: string | null;

  @ApiProperty()
  dateOfBirth: Date | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  bio: string | null;

  @ApiProperty()
  location: string | null;

  @ApiProperty()
  isFollowing: boolean;
}
