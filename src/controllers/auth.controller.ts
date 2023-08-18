import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { compareCrypt, crypt } from 'src/common/utils/helper/crypt.helper';
import { AuthService } from 'src/services/auth/auth.service';
import { GuardianService } from 'src/services/guardian/guardian.service';

@Controller('/api/auth')
@ApiTags('인증 API')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly guardianService: GuardianService,
  ) {}

  @Post('/login')
  async login(
    @Body() input: { id: string; password: string },
    @Res() response: Response,
  ) {
    const adminId = process.env.ADMIN_ID;
    const { id, password } = input;
    if (id === adminId) {
      const adminPassword = await crypt(process.env.ADMIN_PASSWORD);
      if (await compareCrypt(password, adminPassword)) {
        const token = await this.authService.generateToken({
          user: { _id: 'admin' },
          isAdmin: true,
        });
        await this.authService.setRefreshToken({
          user: { _id: 'admin' },
          res: response,
          isAdmin: true,
        });
        return response
          .status(200)
          .json({ token, _id: 'admin', name: '관리자' });
      } else {
        throw new HttpException(
          'Invalid credentials.',
          HttpStatus.UNAUTHORIZED,
        );
      }
    } else {
      const guardian = await this.guardianService.getLoginInfo(id);
      if (guardian && (await compareCrypt(password, guardian.password))) {
        const token = await this.authService.generateToken({
          user: { _id: guardian._id },
        });
        await this.authService.setRefreshToken({
          user: { _id: guardian._id },
          res: response,
        });
        return response.status(200).json({
          token,
          _id: guardian._id,
        });
      } else {
        throw new HttpException(
          'Invalied credentials.',
          HttpStatus.UNAUTHORIZED,
        );
      }
    }
  }

  @UseGuards(AuthGuard('refresh'))
  @Post('/refresh')
  async refresh(@Req() req: Request) {
    return this.authService.generateToken((req as any).user);
  }
}
