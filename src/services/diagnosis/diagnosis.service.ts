import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Diagnosis } from 'src/entities/diagnosis.entity';
import { Patient } from 'src/entities/patient.entity';
import { Repository } from 'typeorm';
import { CreateDiagnosisRequestDto } from './dto/create.dto';

@Injectable()
export class DiagnosisService {
  constructor(
    @InjectRepository(Diagnosis)
    private readonly diagnosisRepository: Repository<Diagnosis>,
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
  ) {}

  async findById(id: string): Promise<Diagnosis> {
    return await this.diagnosisRepository.findOne({
      where: { _id: id },
      relations: ['patient'],
    });
  }

  async findByPatientId(patientId: string): Promise<Diagnosis[]> {
    return await this.diagnosisRepository.find({
      where: { patient: { _id: patientId } },
      order: { createdAt: 'DESC' },
      relations: ['patient'],
    });
  }

  async create(request: CreateDiagnosisRequestDto): Promise<void> {
    await this.diagnosisRepository.insert({
      doctorName: request.doctorName,
      title: request.title,
      contents: request.contents,
      patient: await this.patientRepository.findOne({
        where: { _id: request.patientId },
      }),
    });
  }
}
