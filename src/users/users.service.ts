import { ConflictException, Injectable, InternalServerErrorException, NotFoundException, Scope } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Prisma, Role, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginatedData } from 'src/shared/interfaces';


@Injectable({ scope: Scope.REQUEST })
export class UsersService {
  constructor(private prisma: PrismaService) {
  }

  async createUser(params: {
    name: string,
    username: string,
    password: string,
    phone?: string,
    role: string[],
  }) {
    try {
      const { name, username, password, phone, role } = params;
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      await this.prisma.user.create({
        data: {
          name, phone, username,
          password: hashedPassword,
          salt: salt,
          role: role.map(v => v as Role),
        },
      });

    } catch (e) {
      if (e.code === 'P2002') throw new ConflictException('Account with provided username already exists');

      throw new InternalServerErrorException();
    }
  }

  async getUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    const result = await this.prisma.user.findUnique({ where });

    if (result === null) throw new NotFoundException();

    return result;
  }

  async getUsers(params: { pageNumber?: number, pageSize?: number }): Promise<PaginatedData> {
    const { pageNumber, pageSize } = params;
    const recordsCount = await this.prisma.user.count();
    const totalPages = Math.ceil(recordsCount / pageSize);
    const skip = (pageNumber - 1) * pageSize;

    const users = await this.prisma.user.findMany({
      skip,
      take: pageSize,
      select: {
        id: true, name: true, phone: true, username: true,
        createdAt: true, updatedAt: true, role: true,
      },
    });

    return {
      data: users,
      pageSize,
      pageNumber,
      totalPages,
      hasNextPage: pageNumber < totalPages,
      hasPreviousPage: pageNumber > 1,
    };
  }

  async updateUser(params: {
    id?: string,
    name?: string,
    phone?: string,
    password?: string,
    role?: string[],
  }) {
    try {
      const { id, name, phone, password, role } = params;
      const mappedRole = role != undefined ? role.map(v => v as Role) : undefined;

      await this.prisma.user.update({
        data: { name, phone, password, role: mappedRole },
        where: { id },
      });

    } catch (e) {
      if (e.code === 'P2025') throw new NotFoundException(e.meta.cause);

      throw new InternalServerErrorException();
    }
  }

  async deleteUser(id: string) {
    try {
      await this.prisma.user.delete({ where: { id } });

    } catch (e) {
      if (e.code === 'P2025') throw new NotFoundException(e.meta.cause);

      throw new InternalServerErrorException();
    }
  }
}
