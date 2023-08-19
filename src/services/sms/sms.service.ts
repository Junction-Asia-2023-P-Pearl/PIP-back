import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { sendMsg } from 'src/common/utils/helper/sms.helper';
import { Medicine } from 'src/entities/medicine.entity';
import { Patient } from 'src/entities/patient.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SmsService {
  constructor(
    @InjectRepository(Medicine)
    private readonly medicineRepository: Repository<Medicine>,
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
  ) {}

  async sendMedicineReport({
    patientId,
    medicineId,
    amount,
  }: {
    patientId: string;
    medicineId: string;
    amount: number;
  }): Promise<void> {
    const patient = await this.patientRepository.findOne({
      where: { _id: patientId },
      relations: ['guardian'],
    });
    const medicine = await this.medicineRepository.findOne({
      where: { _id: medicineId },
    });
    const message = `${patient.name}님에게 ${medicine.name}을 ${amount}mg 만큼 투여했습니다.`;
    await sendMsg(message, [patient.guardian.phoneNumber]);
  }
}
