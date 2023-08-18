import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { sendMsg } from 'src/common/utils/helper/sms.helper';
import { CreateMedicineReportRequestDto } from 'src/services/medicine-report/dto/create.dto';
import { MedicineReportService } from 'src/services/medicine-report/medicine-report.service';
import { SmsService } from 'src/services/sms/sms.service';

@ApiTags('medicine-report')
@Controller('/api/medicine-report')
export class MedicineReportController {
  constructor(
    private readonly medicineReportService: MedicineReportService,
    private readonly smsService: SmsService,
  ) {}

  @Post('/')
  async createMedicineReport(
    @Body() request: CreateMedicineReportRequestDto,
  ): Promise<void> {
    await this.medicineReportService.create(request);
    await this.smsService.sendMedicineReport(request);
  }
}
