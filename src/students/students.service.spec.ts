import { Test, TestingModule } from '@nestjs/testing';
import { StudentsService } from './students.service';
import { HobbyService } from '../hobby/hobby.service';

describe('StudentsService', () => {
  let service: StudentsService;
  let redisMock: any;
  let hobbyMock: any;

  beforeEach(async () => {
    redisMock = { incr: jest.fn(), decr: jest.fn() }; // mock Redis
    hobbyMock = { enqueueStudent: jest.fn() };       // mock HobbyService

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentsService,
        { provide: 'REDIS_CLIENT', useValue: redisMock },
        { provide: HobbyService, useValue: hobbyMock },
      ],
    }).compile();

    service = module.get<StudentsService>(StudentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a student', async () => {
    const studentDto = {
      name: 'Alice',
      age: 20,
      hobby:'gardening',
      gender: 'Female',
      course: 'CSE',
      admissionDate: '2025-01-01',
    };
    const student = await service.create(studentDto);
    expect(student.name).toBe(studentDto.name);
  });

  it('should find all students', async () => {
    const students = await service.findAll();
    expect(Array.isArray(students)).toBe(true);
  });

  it('should soft delete a student', async () => {
    const student = await service.create({
      name: 'Bob',
      age: 21,
      hobby:'football',
      gender: 'Male',
      course: 'EEE',
      admissionDate: '2025-01-01',
    });
    const result = await service.remove(student.id);
    expect(result).toEqual({ message: 'Student deleted successfully' });
  });
});
