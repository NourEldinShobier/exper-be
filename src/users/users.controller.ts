import { Response } from 'express';
import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, Res, UseGuards } from '@nestjs/common';
import { Role } from '@prisma/client';
import { Roles } from './roles.decorator';
import { CreateUserDto, GetUsersQuery, UpdateUserDto } from './dtos-queries';
import { CreateUserPipe } from './pipes/create-user.pipe';
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

    await this.usersService.createUser({ ...userDto });

    return res.status(HttpStatus.NO_CONTENT).send();
  }

  @Get(':id')
  @Roles(Role.ADMIN)
  async getUser(@Param('id') id: string) {
    return this.usersService.getUser({ id });
  }

  @Get()
  @Roles(Role.ADMIN)
  async getUsers(@Query() query: GetUsersQuery) {
    return this.usersService.getUsers({ ...query });
  }

  @Put()
  @Roles(Role.ADMIN)
  async updateUser(
    @Body(CreateUserPipe) userDto: UpdateUserDto,
    @Res() res: Response,
  ) {


    // TODO: create a pipe(CreateUserPipe) to check if target user exist


    await this.usersService.updateUser({ ...userDto });

    return res.status(HttpStatus.NO_CONTENT).send();
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  async deleteUser(@Param('id') id: string) {
    //return this.usersService.getUser({ id });
  }
}

