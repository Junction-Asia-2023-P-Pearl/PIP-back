import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GuardianController } from 'src/controllers/guardian.controller';
import { Guardian } from 'src/entities/guardian.entity';
import { GuardianService } from 'src/services/guardian/guardian.service';

@Module({
  imports: [TypeOrmModule.forFeature([Guardian])],
  controllers: [GuardianController],
  providers: [GuardianService],
})
export class GuardianModule {}
