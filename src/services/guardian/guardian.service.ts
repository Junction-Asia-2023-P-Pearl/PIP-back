import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Guardian } from 'src/entities/guardian.entity';
import { Repository } from 'typeorm';
import { GetLoginInfoResponse } from './dto/get-login-info.dto';
import { UpdateGuardianRequestDto } from './dto/update-guardian.dto';
import { CreateGuardianRequestDto } from './dto/create-guardian.dto';

@Injectable()
export class GuardianService {
  constructor(
    @InjectRepository(Guardian)
    private readonly guardianRepository: Repository<Guardian>,
  ) {}

  async getLoginInfo(loginId: string): Promise<GetLoginInfoResponse> {
    const guardian = await this.guardianRepository.findOne({
      where: { loginId: loginId },
      relations: ['patients'],
    });
    if (!guardian) return null;
    return {
      _id: guardian._id,
      loginId: guardian.loginId,
      password: guardian.password,
    };
  }

  async findById(id: string): Promise<Guardian> {
    return await this.guardianRepository.findOne({
      where: { _id: id },
      relations: ['patients'],
    });
  }

  async create(request: CreateGuardianRequestDto): Promise<void> {
    const { loginId, password, name, phoneNumber } = request;
    await this.guardianRepository.save({
      loginId,
      password,
      name,
      phoneNumber,
    });
  }

  async update(id: string, request: UpdateGuardianRequestDto): Promise<void> {
    const { name, phoneNumber } = request;
    await this.guardianRepository.update(
      { _id: id },
      {
        name,
        phoneNumber,
      },
    );
  }
}
