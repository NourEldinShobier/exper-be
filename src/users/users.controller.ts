import { Response } from 'express';
import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, Res, UseGuards } from '@nestjs/common';
import { Role } from '@prisma/client';
import { Roles } from 'src/auth/roles.decorator';
import { CreateUserDto, GetUsersQuery, UpdateUserDto } from './dtos-queries';
import { UsersService } from './users.service';
import { JwtAuthGuard, RolesGuard } from 'src/auth/guards';


@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {
  }

  @Post()
  @Roles(Role.ADMIN)
  async createUser(@Body() userDto: CreateUserDto, @Res() res: Response) {

    await this.usersService.createUser({ ...userDto });

    return res.status(HttpStatus.NO_CONTENT).send();
  }

  @Get(':id')
  @Roles(Role.ADMIN)
  async getUser(@Param('id') id: string) {
    return this.usersService.getUser(id);
  }

  @Get()
  @Roles(Role.ADMIN)
  async getUsers(@Query() query: GetUsersQuery) {
    return this.usersService.getUsers({ ...query });
  }

  @Put()
  @Roles(Role.ADMIN)
  async updateUser(@Body() userDto: UpdateUserDto, @Res() res: Response) {
    await this.usersService.updateUser({ ...userDto });
    return res.status(HttpStatus.OK).send();
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  async deleteUser(@Param('id') id: string, @Res() res: Response) {
    await this.usersService.deleteUser(id);
    return res.status(HttpStatus.OK).send();
  }
}

