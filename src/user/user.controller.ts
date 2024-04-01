import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { EditUserDto } from './dto';
import { UserService } from './user.service';
import { ApiAcceptedResponse } from '@nestjs/swagger';
import { UserEntity } from './entity/user.entity';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {   
    constructor(private userService: UserService) {}

    @Get('me')
    @ApiAcceptedResponse({
        description: "Get user object as response",
        type: UserEntity
    })
    getUser(@GetUser() user: User) {
        return user
    }

    @Patch()
    @ApiAcceptedResponse({
        description: "update successfull user object as response",
        type: UserEntity
    })
    editUser(@GetUser('id') userId: number, @Body() dto: EditUserDto) {
        return this.userService.editUser(userId, dto)
    }
}
