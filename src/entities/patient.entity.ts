import { IsDate, IsEnum, IsNumber, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Guardian } from './guardian.entity';
import { MedicineReport } from './medicine-report.entity';
import { GenderEnum } from 'src/common/enums';
import { Diagnosis } from './diagnosis.entity';

@Entity()
export class Patient {
  @IsString()
  @PrimaryGeneratedColumn('uuid')
  _id: string;

  @IsString()
  @Column()
  name: string;

  @IsDate()
  @Column({ name: 'birth_date' })
  birthDate: Date;

  @IsEnum(['M', 'W'])
  @Column()
  gender: GenderEnum;

  @IsNumber()
  @Column()
  height: number;

  @IsNumber()
  @Column()
  weight: number;

  @IsString()
  @Column({ name: 'caution' })
  caution: string;

  @ManyToOne(() => Guardian, (guardian) => guardian.patients)
  @JoinColumn({ name: 'guardian_id' })
  guardian: Guardian;

  @OneToMany(() => MedicineReport, (medicineReport) => medicineReport.patient)
  medicineReports: MedicineReport[];

  @OneToMany(() => Diagnosis, (diagnosis) => diagnosis.patient)
  diagnoses: Diagnosis[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'update_at' })
  updatedAt: Date;
}
