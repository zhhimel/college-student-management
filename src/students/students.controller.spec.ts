import { Test, TestingModule } from '@nestjs/testing';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { HobbyService } from '../hobby/hobby.service';

describe('StudentsController', () => {
  let controller: StudentsController;

  const redisMock = { incr: jest.fn(), decr: jest.fn() };
  const hobbyMock = { enqueueStudent: jest.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentsController],
      providers: [
        StudentsService,
        { provide: 'REDIS_CLIENT', useValue: redisMock },
        { provide: HobbyService, useValue: hobbyMock },
      ],
    }).compile();

    controller = module.get<StudentsController>(StudentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a student', async () => {
    const dto = { name: 'Alice', age: 20, gender: 'Female',hobby:'gardening', course: 'CSE', admissionDate: '2025-01-01' };
    const student = await controller.create(dto);
    expect(student.name).toBe(dto.name);
  });
});
