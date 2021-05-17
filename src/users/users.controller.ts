import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserPipe } from './pipe/create-user.pipe';
import { CreateUserDto } from './dto';
import { UsersService } from './users.service';
import { Role } from '@prisma/client';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Post("create")
    async createUser(@Body(CreateUserPipe) userDto: CreateUserDto) {

        return this.usersService.create({
            name: userDto.name,
            phone: userDto.phone,
            username: userDto.username,
            password: userDto.password,
            role: userDto.role.map(v => v as Role),
        });
    }
}
