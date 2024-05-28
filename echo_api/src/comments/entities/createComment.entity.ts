import { ApiProperty } from "@nestjs/swagger";
import { Comment } from "@prisma/client";


export class CreateCommentEntity implements Comment {
    @ApiProperty()
    id: string;

    @ApiProperty()
    postId: string;

    @ApiProperty()
    userId: string;

    @ApiProperty()
    content: string;
}