import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";


export class DeleteComment {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    commentId: string;
}