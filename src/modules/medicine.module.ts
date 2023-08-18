import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicineController } from 'src/controllers/medicine.controller';
import { Medicine } from 'src/entities/medicine.entity';
import { MedicineService } from 'src/services/medicine/medicine.service';

@Module({
  imports: [TypeOrmModule.forFeature([Medicine])],
  controllers: [MedicineController],
  providers: [MedicineService],
})
export class MedicineModule {}
