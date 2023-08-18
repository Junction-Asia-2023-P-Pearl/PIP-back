import { HttpException, HttpStatus } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthPayload } from 'src/services/auth/auth.payload';
import AuthErrors from '../errors/auth.error';

export class JwtAdminAccessStrategy extends PassportStrategy(
  Strategy,
  'adminAccess',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  validate(payload: AuthPayload) {
    if (payload.isAdmin) {
      return payload;
    } else {
      throw new HttpException(AuthErrors.NOT_ADMIN, HttpStatus.UNAUTHORIZED);
    }
  }
}
