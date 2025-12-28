import { Controller, Post, Body } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(private jwtService: JwtService) {}

  @Post('login')
  login(@Body() body: { username: string; password: string }) {
    // Dummy check
    if (body.username !== 'admin' || body.password !== 'admin123') {
      return { message: 'Invalid credentials' };
    }

    const payload = { username: body.username, sub: '1' };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
