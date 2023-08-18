import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from 'src/controllers/auth.controller';
import { Guardian } from 'src/entities/guardian.entity';
import { AuthService } from 'src/services/auth/auth.service';
import { GuardianService } from 'src/services/guardian/guardian.service';

@Module({
  imports: [TypeOrmModule.forFeature([Guardian])],
  controllers: [AuthController],
  providers: [AuthService, JwtService, GuardianService],
})
export class AuthModule {}
