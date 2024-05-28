import { ApiProperty } from "@nestjs/swagger";
import { Prisma } from "@prisma/client";

export class DeleteLikeEntity implements Prisma.BatchPayload {
    @ApiProperty()
    count: number;
}