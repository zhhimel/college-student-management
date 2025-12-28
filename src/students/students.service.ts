import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { randomUUID } from 'crypto';
import { Student } from './student.interface';
import { HobbyService } from '../hobby/hobby.service';
import Redis from 'ioredis';

@Injectable()
export class StudentsService {
  private students: Student[] = [];

constructor(
  @Inject('REDIS_CLIENT') private readonly redis: Redis,
  @Inject(forwardRef(() => HobbyService))
  private readonly hobbyService: HobbyService,
) {}


  async create(dto: CreateStudentDto) {
    const student: Student = {
    id: randomUUID(),
    ...dto,
    isDeleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  this.students.push(student);
  await this.redis.incr('student_count');

  
  await this.hobbyService.enqueueStudent(student.id);

  return student;
  }

  findAll() {
    return this.students.filter(s => !s.isDeleted);
  }

  findOne(id: string) {
    const student = this.students.find(
      s => s.id === id && !s.isDeleted,
    );
    if (!student) throw new NotFoundException('Student not found');
    return student;
  }

async update(id: string, dto: UpdateStudentDto) {
  const student = this.findOne(id);
  Object.assign(student, dto, { updatedAt: new Date() });

  await this.hobbyService.enqueueStudent(student.id);

  return student;
}

  async remove(id: string) {
    const student = this.findOne(id);
    student.isDeleted = true;
    student.updatedAt = new Date();

    await this.redis.decr('student_count');

    return { message: 'Student deleted successfully' };
  }

  async getTotalStudents() {
    const count = await this.redis.get('student_count');
    return { totalStudents: parseInt(count ?? '0', 10) };
  }
}
