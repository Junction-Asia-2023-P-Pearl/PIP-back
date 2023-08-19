import { IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Patient } from './patient.entity';

@Entity()
export class Diagnosis {
  @IsString()
  @PrimaryGeneratedColumn('uuid')
  _id: string;

  @IsString()
  @Column({ name: 'doctor_name' })
  doctorName: string;

  @IsString()
  @Column()
  title: string;

  @IsString()
  @Column()
  contents: string;

  @ManyToOne(() => Patient, (patient) => patient.diagnoses)
  @JoinColumn({ name: 'patient_id' })
  patient: Patient;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'update_at' })
  updatedAt: Date;
}
