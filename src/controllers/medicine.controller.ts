import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Medicine } from 'src/entities/medicine.entity';
import { MedicineService } from 'src/services/medicine/medicine.service';

@ApiTags('medicine')
@Controller('/api/medicine')
export class MedicineController {
  constructor(private readonly medicineService: MedicineService) {}

  @Get('/')
  async getAllMedicine(): Promise<Medicine[]> {
    return await this.medicineService.findAll();
  }

  @Get('/:id')
  async getMedicineById(@Param('id') id: string): Promise<Medicine> {
    return await this.medicineService.findById(id);
  }

  //테스트용 약물 정보 생성 api
  @Post('/')
  async createMedicine(
    @Body() medicine: { name: string; detail: string },
  ): Promise<void> {
    await this.medicineService.create(medicine.name, medicine.detail);
  }

  //테스트용 약물 정보 삭제 api
  @Delete('/:id')
  async deleteMedicine(@Param('id') id: string): Promise<void> {
    await this.medicineService.delete(id);
  }
}
