import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsOptional, IsString } from "class-validator"

export class EditUserDto {
    @ApiProperty({
        description: 'Email of the user',
        example: 'pengenganteng@gmail.com',
        required: false
      })
    @IsEmail()
    @IsOptional()
    email?: string

    @ApiProperty({
        description: 'first name of the user',
        example: 'pengen',
        required: false
      })
    @IsString()
    @IsOptional()
    firstName?: string

    @ApiProperty({
        description: 'last name of the user',
        example: 'ganteng',
        required: false
      })
    @IsString()
    @IsOptional()
    lastName?: string
}