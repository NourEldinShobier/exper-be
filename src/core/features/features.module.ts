import { Module } from '@nestjs/common';
import { GroupModule } from './group/group.module';
import { UserModule } from './user/user.module';
import { StudentModule } from './student/student.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [GroupModule, UserModule, StudentModule, SharedModule]
})
export class FeaturesModule {}
