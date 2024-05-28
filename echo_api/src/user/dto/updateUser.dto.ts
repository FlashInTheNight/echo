import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class UpdateUserDto {

    @IsOptional()
    @IsString()
    @ApiProperty({ required: false })
    email?: string;

    @IsOptional()
    @IsString()
    @ApiProperty({ required: false })
    name?: string;

    @IsOptional()
    @ApiProperty({ required: false })
    dateOfBirth?: Date;

    @IsOptional()
    @IsString()
    @ApiProperty({ required: false })
    bio?: string;

    @IsOptional()
    @IsString()
    @ApiProperty({ required: false })
    location?: string;
}