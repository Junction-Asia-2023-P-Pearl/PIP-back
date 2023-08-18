import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicineReportController } from 'src/controllers/medicine-report.controller';
import { MedicineReport } from 'src/entities/medicine-report.entity';
import { Medicine } from 'src/entities/medicine.entity';
import { Patient } from 'src/entities/patient.entity';
import { MedicineReportService } from 'src/services/medicine-report/medicine-report.service';
import { SmsService } from 'src/services/sms/sms.service';

@Module({
  imports: [TypeOrmModule.forFeature([MedicineReport, Patient, Medicine])],
  controllers: [MedicineReportController],
  providers: [MedicineReportService, SmsService],
})
export class MedicineReportModule {}
