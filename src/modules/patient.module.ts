import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientController } from 'src/controllers/patient.controller';
import { Guardian } from 'src/entities/guardian.entity';
import { Patient } from 'src/entities/patient.entity';
import { PatientService } from 'src/services/patient/patient.service';

@Module({
  imports: [TypeOrmModule.forFeature([Patient, Guardian])],
  controllers: [PatientController],
  providers: [PatientService],
})
export class PatientModule {}
