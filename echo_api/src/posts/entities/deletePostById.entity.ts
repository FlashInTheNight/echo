import { ApiProperty } from "@nestjs/swagger";
import { Post } from "@prisma/client";
import { count } from "console";

export class BatchPayload {
    @ApiProperty({type: () => Number})
    count: number;
}

export class DeletePostByIdEntity implements Post {
    @ApiProperty({type: () => BatchPayload})
    commentBatchPayload: BatchPayload;

    @ApiProperty({type: () => BatchPayload})
    likeBatchPayload: BatchPayload;

    @ApiProperty({ example: '662fbdd188df688850b5df27', description: 'The id of the entity.' })
    id: string;

    @ApiProperty()
    content: string;

    @ApiProperty()
    authorId: string;

    @ApiProperty()
    createdAt: Date;
}