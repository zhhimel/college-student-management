import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private adminUser = {
    username: 'admin',
    password: bcrypt.hashSync('admin123', 10),
  };

  constructor(private jwtService: JwtService) {}

  async login(username: string, password: string) {
    if (username !== this.adminUser.username) {
      throw new UnauthorizedException();
    }

    const isMatch = await bcrypt.compare(password, this.adminUser.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }

    const payload = { username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
