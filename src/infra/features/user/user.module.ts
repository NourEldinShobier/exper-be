import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/infra/features/prisma/prisma.module';
import { UserService } from './user.service';

@Module({
  providers: [UserService],
  imports: [PrismaModule]
})
export class UserModule { }
