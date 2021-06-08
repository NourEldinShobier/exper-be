import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, Res } from '@nestjs/common';
import { Role } from '@prisma/client';
import { Response } from 'express';
import { Roles } from 'src/auth/roles.decorator';
import { CreateGroupDto, GetGroupsQuery, UpdateGroupDto } from './dtos-queries';
import { GroupsService } from './groups.service';

@Controller('groups')
export class GroupsController {
  constructor(private groupsService: GroupsService) {
  }

  @Post()
  @Roles(Role.ADMIN, Role.STUDENTS)
  async createGroup(@Body() groupDto: CreateGroupDto, @Res() res: Response) {

    await this.groupsService.createGroup({ ...groupDto });

    return res.status(HttpStatus.NO_CONTENT).send();
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.STUDENTS)
  async getGroup(@Param('id') id: string) {
    return this.groupsService.getGroup(id);
  }

  @Get()
  @Roles(Role.ADMIN, Role.STUDENTS)
  async getGroups(@Query() query: GetGroupsQuery) {
    return this.groupsService.getGroups({ ...query });
  }

  @Put()
  @Roles(Role.ADMIN, Role.STUDENTS)
  async updateGroup(@Body() groupDto: UpdateGroupDto, @Res() res: Response) {
    await this.groupsService.updateGroup({ ...groupDto });
    return res.status(HttpStatus.OK).send();
  }

  @Delete(':id')
  @Roles(Role.ADMIN, Role.STUDENTS)
  async deleteGroup(@Param('id') id: string, @Res() res: Response) {
    await this.groupsService.deleteGroup(id);
    return res.status(HttpStatus.OK).send();
  }
}
