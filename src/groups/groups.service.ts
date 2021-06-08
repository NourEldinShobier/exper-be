import { Injectable, InternalServerErrorException, NotFoundException, Scope } from '@nestjs/common';
import { Group } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginatedData } from 'src/shared/interfaces';


@Injectable({ scope: Scope.REQUEST })
export class GroupsService {
  constructor(private prisma: PrismaService) {
  }

  async createGroup(params: { name: string, day: string }) {
    try {
      const { name, day } = params;
      await this.prisma.group.create({ data: { name, day } });

    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async getGroup(id: string): Promise<Group> {
    const result = await this.prisma.group.findUnique({ where: { id } });

    if (result === null) throw new NotFoundException();

    return result;
  }

  async getGroups(params: { pageNumber?: number, pageSize?: number }): Promise<PaginatedData> {
    const { pageNumber, pageSize } = params;
    const recordsCount = await this.prisma.group.count();
    const totalPages = Math.ceil(recordsCount / pageSize);
    const skip = (pageNumber - 1) * pageSize;

    const groups = await this.prisma.group.findMany({
      skip,
      take: pageSize,
      select: {
        id: true, name: true, day: true,
        createdAt: true, updatedAt: true,
      },
    });

    return {
      data: groups,
      pageSize,
      pageNumber,
      totalPages,
      hasNextPage: pageNumber < totalPages,
      hasPreviousPage: pageNumber > 1,
    };
  }

  async updateGroup(params: { id: string, name: string, day: string }) {
    try {
      const { id, name, day } = params;

      await this.prisma.group.update({
        data: { name, day },
        where: { id },
      });

    } catch (e) {
      if (e.code === 'P2025') throw new NotFoundException(e.meta.cause);

      throw new InternalServerErrorException();
    }
  }

  async deleteGroup(id: string) {
    try {
      await this.prisma.group.delete({ where: { id } });

    } catch (e) {
      if (e.code === 'P2025') throw new NotFoundException(e.meta.cause);

      throw new InternalServerErrorException();
    }
  }
}
