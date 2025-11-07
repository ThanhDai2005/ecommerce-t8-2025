import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsController } from './products/products.controller';
import { LoggerModule } from '../logger/logger.module';
import { LoggingInterceptor } from '../logger/logging.interceptor';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { CatchEverythingFilter } from 'src/catch-everything/catch-everything.filter';
import { ZodExceptionFilter } from 'src/catch-everything/zod-exception/zod-exception.filter';
import { ApiUtilModule } from 'src/common/utils/api-util/api-util.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'src/common/prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ZodSerializerInterceptor, ZodValidationPipe } from 'nestjs-zod';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      // validate: validate
    }),
    LoggerModule,
    PrismaModule,
    UsersModule,
    ApiUtilModule,
    AuthModule,
  ],
  controllers: [AppController, ProductsController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    ZodExceptionFilter,
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ZodSerializerInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: CatchEverythingFilter,
    },
  ],
})
export class AppModule {}
