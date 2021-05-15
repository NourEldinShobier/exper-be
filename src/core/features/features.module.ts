import { Module } from '@nestjs/common';

import { GroupsModule } from './groups/groups.module';
import { UsersModule } from './users/users.module';
import { StudentsModule } from './students/students.module';

@Module({
  imports: [GroupsModule, UsersModule, StudentsModule]
})
export class FeaturesModule { }
