import { Module, forwardRef } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { HobbyModule } from '../hobby/hobby.module';

@Module({
  imports: [forwardRef(() => HobbyModule)], // ✅ use forwardRef
  controllers: [StudentsController],
  providers: [StudentsService],
  exports: [StudentsService],
})
export class StudentsModule {}
