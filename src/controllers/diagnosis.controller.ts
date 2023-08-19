import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Diagnosis } from 'src/entities/diagnosis.entity';
import { DiagnosisService } from 'src/services/diagnosis/diagnosis.service';
import { CreateDiagnosisRequestDto } from 'src/services/diagnosis/dto/create.dto';

@ApiTags('diagnosis')
@Controller('/api/diagnosis')
export class DiagnosisController {
  constructor(private readonly diagnosisService: DiagnosisService) {}

  @Get('/:id')
  async getDiagnosisById(@Param('id') id: string): Promise<Diagnosis> {
    return await this.diagnosisService.findById(id);
  }

  @Get('/patient/:patientId')
  async getDiagnosisByPatientId(
    @Param('patientId') patientId: string,
  ): Promise<Diagnosis[]> {
    return await this.diagnosisService.findByPatientId(patientId);
  }

  @Post('/')
  async createDiagnosis(
    @Body() request: CreateDiagnosisRequestDto,
  ): Promise<void> {
    await this.diagnosisService.create(request);
  }
}
