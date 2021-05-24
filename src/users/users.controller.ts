import { Response } from 'express';
import { Body, Controller, Get, HttpStatus, Param, Post, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from './dto';
import { CreateUserPipe } from './pipe/create-user.pipe';
import { UsersService } from './users.service';


@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {
  }

  @Post()
  @UseGuards(AuthGuard())
  async createUser(
    @Body(CreateUserPipe) userDto: CreateUserDto,
    @Res() res: Response) {

    await this.usersService.createUser(userDto);

    return res.status(HttpStatus.NO_CONTENT).send();
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  async getUser(@Param('id') id: string) {
    return this.usersService.getUser({ id });
  }
}
