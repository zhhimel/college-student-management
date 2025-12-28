import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { randomUUID } from 'crypto';
import { Student } from './student.interface';

@Injectable()
export class StudentsService {
  private students: Student[] = [];

  create(dto: CreateStudentDto) {
    const student = {
      id: randomUUID(),
      ...dto,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.students.push(student);
    return student;
  }

  findAll() {
    return this.students.filter(s => !s.isDeleted);
  }

  findOne(id: string) {
    const student = this.students.find(
      s => s.id === id && !s.isDeleted,
    );
    if (!student) {
      throw new NotFoundException('Student not found');
    }
    return student;
  }

  update(id: string, dto: UpdateStudentDto) {
    const student = this.findOne(id);

    Object.assign(student, dto, {
      updatedAt: new Date(),
    });

    return student;
  }

  remove(id: string) {
    const student = this.findOne(id);
    student.isDeleted = true;
    student.updatedAt = new Date();
    return { message: 'Student deleted successfully' };
  }
}
