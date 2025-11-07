import { Module } from '@nestjs/common';
import { UsersModule } from 'src/app/users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [],
  providers: [],
})
export class ProductModule {}
