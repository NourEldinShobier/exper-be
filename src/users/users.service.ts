import { Injectable, Scope } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable({ scope: Scope.REQUEST })
export class UsersService {
    constructor(private prisma: PrismaService) { }

    async user(where: Prisma.UserWhereUniqueInput): Promise<User> {
        // TODO: check if failure occurs if not exist

        return this.prisma.user.findUnique({ where });
    }

    async create(data: Prisma.UserCreateInput): Promise<User> {
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(data.password, salt);

        return this.prisma.user.create({ data: { ...data, password: hash } });
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
