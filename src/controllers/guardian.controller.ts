import {
  Body,
  Controller,
  Get,
  HttpException,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetRequesterId } from 'src/common/auth/get_requester_id.decorator';
import { crypt } from 'src/common/utils/helper/crypt.helper';
import { Guardian } from 'src/entities/guardian.entity';
import { CreateGuardianRequestDto } from 'src/services/guardian/dto/create-guardian.dto';
import { UpdateGuardianRequestDto } from 'src/services/guardian/dto/update-guardian.dto';
import { GuardianService } from 'src/services/guardian/guardian.service';

@ApiTags('guardian')
@Controller('/api/guardian')
export class GuardianController {
  constructor(private readonly guardianService: GuardianService) {}
  @Get('/me')
  async getMe(@GetRequesterId() requesterId: string): Promise<Guardian> {
    const guardian = await this.guardianService.findById(requesterId);
    if (!guardian) {
      throw new HttpException("Guardian doesn't exist", 404);
    } else {
      return guardian;
    }
  }

  @Put('/me')
  async updateMe(
    @GetRequesterId() requesterId: string,
    @Body() request: UpdateGuardianRequestDto,
  ): Promise<void> {
    await this.guardianService.update(requesterId, request);
  }

  @Post('/')
  async create(@Body() request: CreateGuardianRequestDto): Promise<void> {
    const hashedPwd = await crypt(request.password);
    await this.guardianService.create({
      ...request,
      password: hashedPwd,
    });
  }
}
