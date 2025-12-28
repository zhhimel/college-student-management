import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { StudentsModule } from './students/students.module';
import { RedisModule } from './redis/redis.module';


@Module({
  imports: [
    AuthModule,
    StudentsModule,RedisModule

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
