import { Module } from '@nestjs/common';
import { ExceptionsModule } from './exceptions/exceptions.module';

@Module({
  imports: [ExceptionsModule]
})
export class SharedModule {}
