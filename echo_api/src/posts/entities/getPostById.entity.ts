import { Post } from "@prisma/client"
import { CommentEntity, LikeEntity } from "./getAllPosts.entity"
import { ApiProperty } from "@nestjs/swagger"
import { UserEntity } from "src/user/entities/user.entity"

export class getPostByIdEntity implements Post {
    constructor({ author, ...data }: getPostByIdEntity) {
        Object.assign(this, data);
          this.author = new UserEntity(author);
      }

    @ApiProperty({ type: String })
    id: string

    @ApiProperty({ type: String })
    content: string

    @ApiProperty({ type: String })
    authorId: string

    @ApiProperty({ type: Date })
    createdAt: Date

    @ApiProperty({ type: LikeEntity, isArray: true })
    likes: LikeEntity[]

    @ApiProperty({ type: UserEntity })
    author: UserEntity

    @ApiProperty({ type: CommentEntity, isArray: true })
    comments: CommentEntity[]

    @ApiProperty({ type: Boolean })
    likedByUser: boolean
}