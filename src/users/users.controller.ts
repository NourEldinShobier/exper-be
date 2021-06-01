import { Response } from 'express';
import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { Role } from '@prisma/client';
import { Roles } from './roles.decorator';
import { CreateUserDto } from './dto';
import { CreateUserPipe } from './pipe/create-user.pipe';
import { UsersService } from './users.service';
import { JwtAuthGuard, RolesGuard } from 'src/auth/guards';


@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {
  }

  @Post()
  @Roles(Role.ADMIN)
  async createUser(
    @Body(CreateUserPipe) userDto: CreateUserDto,
    @Res() res: Response,
  ) {

    await this.usersService.createUser(userDto);

    return res.status(HttpStatus.NO_CONTENT).send();
  }

  @Get()
  @Roles(Role.ADMIN)
  async getUsers() {
    return this.usersService.getUsers();
  }

  @Put(':id')
  @Roles(Role.ADMIN)
  async updateUser(@Param('id') id: string) {
    //return this.usersService.getUser({ id });
  }

  @Get(':id')
  @Roles(Role.ADMIN)
  async getUser(@Param('id') id: string) {
    //return this.usersService.getUser({ id });
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  async deleteUser(@Param('id') id: string) {
    //return this.usersService.getUser({ id });
  }
}
