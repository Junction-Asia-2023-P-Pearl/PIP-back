import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from 'src/entities/patient.entity';
import { Repository } from 'typeorm';
import { CreatePatientRequestDto } from './dto/create-patient.dto';
import { Guardian } from 'src/entities/guardian.entity';
import { UpdatePatientRequestDto } from './dto/update-patient.dto';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
    @InjectRepository(Guardian)
    private readonly guardianRepository: Repository<Guardian>,
  ) {}

  async checkPermission(
    guardianId: string,
    patientId: string,
  ): Promise<Boolean> {
    if (guardianId === 'admin') return true;
    else {
      const patient = await this.patientRepository.findOne({
        where: { _id: patientId },
        relations: ['guardian'],
      });
      return patient.guardian._id === guardianId;
    }
  }

  async findAll(): Promise<Patient[]> {
    return await this.patientRepository.find();
  }

  async findForGuardian(guardianId: string): Promise<Patient[]> {
    return await this.patientRepository.find({
      where: { guardian: { _id: guardianId } },
    });
  }

  async findById(id: string): Promise<Patient> {
    return await this.patientRepository.findOne({
      where: { _id: id },
      relations: ['guardian'],
    });
  }

  async create(request: CreatePatientRequestDto): Promise<void> {
    await this.patientRepository.insert({
      name: request.name,
      birthDate: request.birthDate,
      gender: request.gender,
      height: request.height,
      weight: request.weight,
      detail: request.detail,
      guardian: await this.guardianRepository.findOne({
        where: { _id: request.guardianId },
      }),
    });
  }

  async update(id: string, request: UpdatePatientRequestDto): Promise<void> {
    await this.patientRepository.update(
      { _id: id },
      {
        name: request.name,
        birthDate: request.birthDate,
        gender: request.gender,
        height: request.height,
        weight: request.weight,
        detail: request.detail,
        guardian: await this.guardianRepository.findOne({
          where: { _id: request.guardianId },
        }),
      },
    );
  }
}
