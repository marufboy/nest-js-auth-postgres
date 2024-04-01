import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class AuthDto {
    @ApiProperty({
        description: 'Email of the user',
        example: 'pengenganteng@gmail.com'
      })
    @IsEmail()
    @IsNotEmpty()
    email: string

    @ApiProperty({
        description: 'Password of the user',
        example: 'pengenganteng'
      })
    @IsString()
    @IsNotEmpty()
    password: string
}

