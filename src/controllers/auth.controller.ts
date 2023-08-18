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
import AuthErrors from 'src/common/errors/auth.error';
import DefaultErrors from 'src/common/errors/defualt.error';
import { compareCrypt, crypt } from 'src/common/utils/helper/crypt.helper';
import { AuthService } from 'src/services/auth/auth.service';

@Controller('/api/auth')
@ApiTags('인증 API')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
          AuthErrors.INVALID_CREDENTIALS,
          HttpStatus.UNAUTHORIZED,
        );
      }
    } /* else {
      const teacher = await this.teacherService.getTeacherByLoginId(id);
      if (teacher && (await compareCrypt(password, teacher.password))) {
        const token = await this.authService.generateToken({
          user: { _id: teacher._id },
        });
        await this.authService.setRefreshToken({
          user: { _id: teacher._id },
          res: response,
        });
        return response.status(200).json({
          token,
          _id: teacher._id,
          name: teacher.name,
        });
      } else {
        throw new HttpException(
          AuthErrors.INVALID_CREDENTIALS,
          HttpStatus.UNAUTHORIZED,
        );
      }
    }*/
  }

  @UseGuards(AuthGuard('refresh'))
  @Post('/refresh')
  async refresh(@Req() req: Request) {
    return this.authService.generateToken((req as any).user);
  }
}
