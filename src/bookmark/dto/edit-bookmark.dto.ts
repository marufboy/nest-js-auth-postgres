import { ApiProperty } from "@nestjs/swagger"
import { IsOptional, IsString } from "class-validator"

export class EditBookmarkDto {
    @ApiProperty({
        description: 'Title of the bookmark saved',
        example: 'Judulnya pengen ganteng',
        required: false
    })
    @IsString()
    @IsOptional()
    title?: string

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
    @IsOptional()
    link?: string
}