import { ApiProperty } from '@nestjs/swagger'
import { Bookmark } from '@prisma/client'

export class BookmarkEntity implements Bookmark {
  @ApiProperty({ example: 1 })
  id: number

  @ApiProperty({ example: new Date() })
  createdAt: Date

  @ApiProperty({ example: new Date() })
  updatedAt: Date

  @ApiProperty({
    example: 'Judulnya pengen ganteng',
    required: true,
  })
  title: string

  @ApiProperty({
    example: 'Judulnya pengen ganteng',
    required: false,
    nullable: true
  })
  description: string | null

  @ApiProperty({
    example: 'http://google.com',
    required: true,
  })
  link: string

  @ApiProperty({ example: 1 })
  userId: number
}
