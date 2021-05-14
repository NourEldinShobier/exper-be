import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/features/prisma/prisma.service';
import { User, Prisma } from '@prisma/client';
import { Scope } from '@nestjs/common';


@Injectable({ scope: Scope.DEFAULT })
export class UserService {
    constructor(private prisma: PrismaService) { }

    async user(where: Prisma.UserWhereUniqueInput): Promise<User | null> {
        return this.prisma.user.findUnique({ where });
    }

    async create(data: Prisma.UserCreateInput): Promise<User> {
        // TODO: create user if username is not unique
        // TODO: test and see what kind of exception it throws
        return this.prisma.user.create({ data });
    }

    async update(params: {
        where: Prisma.UserWhereUniqueInput;
        data: Prisma.UserUpdateInput;
    }): Promise<User> {
        // TODO: create user if username is not unique
        // TODO: test and see what kind of exception it throws

        const { where, data } = params;
        return this.prisma.user.update({
            data,
            where,
        });
    }

    async delete(where: Prisma.UserWhereUniqueInput): Promise<User> {
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
