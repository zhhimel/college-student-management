import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { HobbyService } from './hobby/hobby.service';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    const ioAdapter = new IoAdapter(app);
  app.useWebSocketAdapter(ioAdapter);

  const hobbyService = app.get(HobbyService);
  hobbyService.setSocketServer(ioAdapter['server']);
  await app.listen(process.env.PORT || 3001);
}
bootstrap();

