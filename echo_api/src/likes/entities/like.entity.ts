import { ApiProperty } from "@nestjs/swagger";
import { Like } from "@prisma/client";

export class LikeEntity implements Like {
    @ApiProperty()
    id: string;

    @ApiProperty()
    postId: string;

    @ApiProperty()
    userId: string;
}