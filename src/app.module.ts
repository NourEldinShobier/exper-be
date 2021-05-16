import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { ServerModule } from './server/server.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [UsersModule, PrismaModule, ServerModule, SharedModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
