import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiagnosisController } from 'src/controllers/diagnosis.controller';
import { Diagnosis } from 'src/entities/diagnosis.entity';
import { Patient } from 'src/entities/patient.entity';
import { DiagnosisService } from 'src/services/diagnosis/diagnosis.service';

@Module({
  imports: [TypeOrmModule.forFeature([Diagnosis, Patient])],
  controllers: [DiagnosisController],
  providers: [DiagnosisService],
})
export class DiagnosisModule {}
