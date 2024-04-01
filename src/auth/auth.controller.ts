import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthDto } from './dto'
import {
  ApiAcceptedResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger'
import { UserEntity } from '../user/entity/user.entity'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @ApiCreatedResponse({
    description:
      'Created user object as response',
    type: UserEntity,
  })
  signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto)
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  @ApiAcceptedResponse({
    description: 'Signin successful',
    schema: {
      example: {
        access_token: 'access-token',
      },
    },
  })
  signin(@Body() dto: AuthDto) {
    return this.authService.signin(dto)
  }
}
