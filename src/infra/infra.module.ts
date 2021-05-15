import { Module } from '@nestjs/common';
import { PrismaModule } from './features/prisma/prisma.module';
import { UserService } from './features/user/user.service';
import { UserModule } from './features/user/user.module';
import { MongoModule } from './features/mongo/mongo.module';

@Module({
  imports: [PrismaModule, UserModule, MongoModule],
  providers: [UserService]
})
export class InfraModule { }
