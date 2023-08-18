import {
  Body,
  Controller,
  Get,
  HttpException,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { GetRequesterId } from 'src/common/auth/get_requester_id.decorator';
import { Guardian } from 'src/entities/guardian.entity';
import { UpdateGuardianRequestDto } from 'src/services/guardian/dto/update-guardian.dto';
import { GuardianService } from 'src/services/guardian/guardian.service';

@ApiTags('guardian')
@Controller('/api/guardian')
export class GuardianController {
  constructor(private readonly guardianService: GuardianService) {}
  @Get('/me')
  @UseGuards(AuthGuard('access'))
  async getMe(@GetRequesterId() requesterId: string): Promise<Guardian> {
    const guardian = await this.guardianService.findById(requesterId);
    if (!guardian) {
      throw new HttpException("Guardian doesn't exist", 404);
    } else {
      return guardian;
    }
  }

  @Put('/me')
  @UseGuards(AuthGuard('access'))
  async updateMe(
    @GetRequesterId() requesterId: string,
    @Body() request: UpdateGuardianRequestDto,
  ): Promise<void> {
    await this.guardianService.update({
      _id: requesterId,
      ...request,
    });
  }
}
