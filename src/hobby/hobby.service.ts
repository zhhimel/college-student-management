import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Queue, Worker } from 'bullmq';
import Redis from 'ioredis';
import { StudentsService } from '../students/students.service';
import { Server, Socket } from 'socket.io';

const hobbies = ['Reading', 'Travelling', 'Movies', 'Games'];

@Injectable()
export class HobbyService {
  private queue: Queue;
  private io: Server;

constructor(
  @Inject(forwardRef(() => StudentsService))
  private readonly studentsService: StudentsService,
) {
const connection = new Redis({
  host: 'localhost',
  port: 6379,
  maxRetriesPerRequest: null, // ✅ important for BullMQ
});    this.queue = new Queue('hobby-queue', { connection });

    new Worker(
      'hobby-queue',
      async job => {
        const { studentId } = job.data;
        const student = this.studentsService.findOne(studentId);
        student.hobby = hobbies[Math.floor(Math.random() * hobbies.length)];
        student.updatedAt = new Date();

        this.io?.to('students').emit('student-updated', student);
        return student;
      },
      { connection },
    );
  }

  setSocketServer(io: Server) {
    this.io = io;
  }

  async enqueueStudent(studentId: string) {
    await this.queue.add('assign-hobby', { studentId });
  }
}
