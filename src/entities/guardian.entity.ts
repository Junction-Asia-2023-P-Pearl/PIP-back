import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { IsString } from 'class-validator';
import { Patient } from './patient.entity';

@Unique(['loginId'])
@Entity()
export class Guardian {
  @IsString()
  @PrimaryGeneratedColumn('uuid')
  _id: string;

  @IsString()
  @Column()
  name: string;

  @IsString()
  @Column({ name: 'login_id' })
  loginId: string;

  @IsString()
  @Column({ name: 'password' })
  password: string;

  @IsString()
  @Column({ name: 'phone_number' })
  phoneNumber: string;

  @OneToMany(() => Patient, (patient) => patient.guardian)
  patients: Patient[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'update_at' })
  updatedAt: Date;
}
