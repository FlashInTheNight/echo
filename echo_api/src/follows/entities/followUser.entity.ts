import { ApiProperty } from "@nestjs/swagger";

export class FollowUserEntity {
    @ApiProperty()
    message: string;
}