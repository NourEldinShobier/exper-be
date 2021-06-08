import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { ServerModule } from './server/server.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { GroupsModule } from './groups/groups.module';


@Module({
  imports: [
    UsersModule, PrismaModule, ServerModule, SharedModule, AuthModule, GroupsModule,
    //10 requests from the same IP can be made to a single endpoint in 1 minute.
    //ThrottlerModule.forRoot({ ttl: 60, limit: 20 }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }
