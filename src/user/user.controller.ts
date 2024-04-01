import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { EditUserDto } from './dto';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './entity/user.entity';

@UseGuards(JwtGuard)
@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UserController {   
    constructor(private userService: UserService) {}

    @Get('me')
    @ApiOkResponse({
        description: "Get user object as response",
        type: UserEntity
    })
    getUser(@GetUser() user: User) {
        return user
    }

    @Patch()
    @ApiOkResponse({
        description: "update successfull user object as response",
        type: UserEntity
    })
    editUser(@GetUser('id') userId: number, @Body() dto: EditUserDto) {
        return this.userService.editUser(userId, dto)
    }
}
