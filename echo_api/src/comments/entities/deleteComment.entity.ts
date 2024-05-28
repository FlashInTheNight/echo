import { ApiProperty } from "@nestjs/swagger";


export class DeleteCommentEntity {
    @ApiProperty()
    message: string;
}