import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt/jwt-auth.guard';

@Controller()
export class AppController {

  @UseGuards(JwtAuthGuard)
  @Get('protected')
  protectedRoute() {
    return { message: 'You are authenticated' };
  }
}
