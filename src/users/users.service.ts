import { Injectable, NotFoundException, Scope } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Prisma, Role, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto';


@Injectable({ scope: Scope.REQUEST })
export class UsersService {
  constructor(private prisma: PrismaService) {
  }

  async createUser(data: CreateUserDto): Promise<User> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(data.password, salt);

    return this.prisma.user.create({
      data: {
        name: data.name,
        phone: data.phone,
        username: data.username,
        password: hashedPassword,
        salt: salt,
        role: data.role.map(v => v as Role),
      },
    });
  }

  async getUser(where: Prisma.UserWhereUniqueInput): Promise<User | null> {
    const result = await this.prisma.user.findUnique({ where });

    if (result === null) throw new NotFoundException();

    return result;
  }

  async update(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    // TODO: create user if username is not unique
    // TODO: test and see what kind of exception it throws
    // TODO: check if failure occurs if not exist

    const { where, data } = params;
    return this.prisma.user.update({
      data,
      where,
    });
  }

  async delete(where: Prisma.UserWhereUniqueInput): Promise<User> {
    // TODO: check if failure occurs if not exist
    return this.prisma.user.delete({ where });
  }

  async users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByInput;
  }): Promise<User[]> {

    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }
}
