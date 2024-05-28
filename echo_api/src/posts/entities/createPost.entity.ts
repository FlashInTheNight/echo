import { ApiProperty } from "@nestjs/swagger";
import { Post } from "@prisma/client";

export class createPostEntity implements Post {
    @ApiProperty()
    id: string;

    @ApiProperty()
    content: string;

    @ApiProperty()
    authorId: string;

    @ApiProperty()
    createdAt: Date;
    
    @ApiProperty()
    updatedAt: Date;

    @ApiProperty()
    likedByUser: boolean;
}