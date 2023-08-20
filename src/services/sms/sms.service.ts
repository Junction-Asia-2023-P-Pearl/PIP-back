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
    const message = `${patient.name} was given ${amount} mg of ${medicine.name}.`;
    await sendMsg(message, [patient.guardian.phoneNumber]);
  }
}
