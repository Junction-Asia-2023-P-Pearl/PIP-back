import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthPayload } from './auth.payload';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async generateToken({ user, isAdmin = false }): Promise<string> {
    return this.jwtService.sign({ ...user, isAdmin } as AuthPayload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '5w',
    });
  }

  async setRefreshToken({ user, res, isAdmin = false }): Promise<void> {
    const refreshToken = this.jwtService.sign(
      { ...user, isAdmin } as AuthPayload,
      {
        secret: process.env.JWT_SECRET,
        expiresIn: '2w',
      },
    );
    res.setHeader('Set-Cookie', `refreshToken=${refreshToken}`);
    return;
  }
}
