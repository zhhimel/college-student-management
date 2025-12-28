import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@UseGuards(JwtAuthGuard)
@Controller('students') 
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post() 
  create(@Body() dto: CreateStudentDto) {
    return this.studentsService.create(dto);
  }

  @Get() 
  findAll() {
    return this.studentsService.findAll();
  }
    @Get('count')
async getTotal() {
  return this.studentsService.getTotalStudents();
}
  @Get(':id') 
  findOne(@Param('id') id: string) {
    return this.studentsService.findOne(id);
  }

  @Patch(':id') 
  update(@Param('id') id: string, @Body() dto: UpdateStudentDto) {
    return this.studentsService.update(id, dto);
  }

  @Delete(':id') 
  remove(@Param('id') id: string) {
    return this.studentsService.remove(id);
  }


}
