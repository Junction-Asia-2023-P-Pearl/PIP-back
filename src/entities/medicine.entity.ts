import { IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MedicineReport } from './medicine-report.entity';

@Entity()
export class Medicine {
  @IsString()
  @PrimaryGeneratedColumn('uuid')
  _id: string;

  @IsString()
  @Column()
  name: string;

  @IsString()
  @Column()
  detail: string;

  @OneToMany(() => MedicineReport, (medicineReport) => medicineReport.medicine)
  medicineReports: MedicineReport[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'update_at' })
  updatedAt: Date;
}
