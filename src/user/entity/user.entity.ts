import { ApiHideProperty, ApiProperty } from '@nestjs/swagger'
import { User } from '@prisma/client'

export class UserEntity implements User{
  @ApiProperty({ example: 1 })
  id: number

  @ApiProperty({ example: new Date() })
  createdAt: Date

  @ApiProperty({ example: new Date() })
  updatedAt: Date

  @ApiProperty({ example: 'pengenganteng@gmail.com' })
  email: string

  @ApiHideProperty() 
  hash: string | null

  @ApiProperty({
    example: 'pengen',
    required: false,
    nullable: true,
  })
  firstName: string | null

  @ApiProperty({
    example: 'ganteng',
    required: false,
    nullable: true,
  })
  lastName: string | null
}
