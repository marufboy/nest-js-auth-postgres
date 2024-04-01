import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsOptional, IsString } from "class-validator"

export class CreateBookmarkDto {
    @ApiProperty({
        description: 'Title of the bookmark saved',
        example: 'Judulnya pengen ganteng',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    title: string

    @ApiProperty({
        description: 'Description of the bookmark saved',
        example: 'contoh description',
        required: false
    })
    @IsString()
    @IsOptional()
    description?: string

    @ApiProperty({
        description: 'Link of the bookmark saved',
        example: 'http://google.com',
        required: false
    })
    @IsString()
    @IsNotEmpty()
    link: string
}