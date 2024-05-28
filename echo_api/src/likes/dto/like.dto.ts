import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";


export class CreateLikeDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    postId: string;
}