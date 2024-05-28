import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class LoginUserDto {
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({ example: 'ivan@example.ru' })
    email: string;
  
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @ApiProperty({ example: '123456' })
    password: string;
  }