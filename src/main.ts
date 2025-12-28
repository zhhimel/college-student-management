import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { HobbyService } from './hobby/hobby.service';
import { ValidationPipe } from '@nestjs/common';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import * as cors from 'cors';
  

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    const ioAdapter = new IoAdapter(app);
  app.useWebSocketAdapter(ioAdapter);
 app.use(helmet()); 
  app.enableCors();  
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100,
    }),
  );

  const hobbyService = app.get(HobbyService);
  hobbyService.setSocketServer(ioAdapter['server']);
  await app.listen(process.env.PORT || 3001);
}
bootstrap();

