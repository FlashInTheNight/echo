import { ApiProperty } from '@nestjs/swagger';
import { Comment, Like, User } from '@prisma/client';
import { UserEntity } from 'src/user/entities/user.entity';


export class LikeEntity implements Like {
  @ApiProperty()
  id: string;

  @ApiProperty()
  postId: string;

  @ApiProperty()
  userId: string;
}

export class CommentEntity implements Comment {
  @ApiProperty()
  id: string;

  @ApiProperty()
  postId: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  content: string;
}

export class getAllPostsEntity {
  constructor({ author, ...data }: Partial<getAllPostsEntity>) {
    Object.assign(this, data);
    if (author) {
      this.author = new UserEntity(author);
    }
  }

  @ApiProperty()
  id: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  authorId: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty({ type: [LikeEntity], default: [] })
  likes: LikeEntity[];

  @ApiProperty({ type: UserEntity })
  author: UserEntity;

  @ApiProperty({ type: [CommentEntity], default: [] })
  comments: CommentEntity[];

  @ApiProperty({ default: false })
  likedByUser: boolean;
}
