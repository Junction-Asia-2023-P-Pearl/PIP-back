import { IsNumber, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Medicine } from './medicine.entity';
import { Patient } from './patient.entity';

@Entity()
export class MedicineReport {
  @IsString()
  @PrimaryGeneratedColumn('uuid')
  _id: string;

  @IsNumber()
  @Column()
  amount: number;

  @ManyToOne(() => Medicine, (medicine) => medicine.medicineReports)
  @JoinColumn({ name: 'medicine_id' })
  medicine: Medicine;

  @ManyToOne(() => Patient, (patient) => patient.medicineReports)
  @JoinColumn({ name: 'patient_id' })
  patient: Patient;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'update_at' })
  updatedAt: Date;
}
