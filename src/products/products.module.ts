import { Module } from '@nestjs/common';
import { UserModule } from 'src/users/users.module';

@Module({
  imports: [UserModule],
  controllers: [],
  providers: [],
})
export class ProductModule {}
