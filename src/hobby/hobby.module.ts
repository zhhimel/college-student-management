import { Module, forwardRef } from '@nestjs/common';
import { HobbyService } from './hobby.service';
import { StudentsModule } from '../students/students.module';

@Module({
  imports: [forwardRef(() => StudentsModule)], // ✅ forwardRef here too
  providers: [HobbyService],
  exports: [HobbyService],
})
export class HobbyModule {}
