import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  providers: [UsersService, PrismaService],
  controllers: [UsersController],
  imports: [PrismaService, AuthModule],
})
export class UsersModule { }
