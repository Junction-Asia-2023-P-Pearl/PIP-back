import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { GetRequesterId } from 'src/common/auth/get_requester_id.decorator';
import { Patient } from 'src/entities/patient.entity';
import { CreatePatientRequestDto } from 'src/services/patient/dto/create-patient.dto';
import { UpdatePatientRequestDto } from 'src/services/patient/dto/update-patient.dto';
import { PatientService } from 'src/services/patient/patient.service';

@Controller('/api/patient')
@ApiTags('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Get('/')
  @UseGuards(AuthGuard('access'))
  async getAllPatient(
    @GetRequesterId() requesterId: string,
  ): Promise<Patient[]> {
    if (requesterId === 'admin') {
      return await this.patientService.findAll();
    } else {
      return await this.patientService.findForGuardian(requesterId);
    }
  }

  @Get('/:id')
  @UseGuards(AuthGuard('access'))
  async getPatient(
    @GetRequesterId() requesterId: string,
    @Param('id') id: string,
  ): Promise<Patient> {
    if (await this.patientService.checkPermission(requesterId, id)) {
      return await this.patientService.findById(id);
    } else {
      throw new ForbiddenException();
    }
  }

  @Post('/')
  @UseGuards(AuthGuard('adminAccess'))
  async createPatient(@Body() request: CreatePatientRequestDto): Promise<void> {
    await this.patientService.create(request);
  }

  @Put('/:id')
  @UseGuards(AuthGuard('adminAccess'))
  async updatePatient(
    @Param('id') id: string,
    @Body() request: UpdatePatientRequestDto,
  ): Promise<void> {
    await this.patientService.update(id, request);
  }
}