import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MedicineReport } from 'src/entities/medicine-report.entity';
import { Medicine } from 'src/entities/medicine.entity';
import { Patient } from 'src/entities/patient.entity';
import { Repository } from 'typeorm';
import { CreateMedicineReportRequestDto } from './dto/create.dto';

@Injectable()
export class MedicineReportService {
  constructor(
    @InjectRepository(MedicineReport)
    private readonly medicineReportRepository: Repository<MedicineReport>,
    @InjectRepository(Medicine)
    private readonly medicineRepository: Repository<Medicine>,
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
  ) {}

  async create(request: CreateMedicineReportRequestDto): Promise<void> {
    await this.medicineReportRepository.insert({
      amount: request.amount,
      medicine: await this.medicineRepository.findOne({
        where: { _id: request.medicineId },
      }),
      patient: await this.patientRepository.findOne({
        where: { _id: request.patientId },
      }),
    });
  }
}
