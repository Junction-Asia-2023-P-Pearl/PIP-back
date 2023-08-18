import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Medicine } from 'src/entities/medicine.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class MedicineService {
  constructor(
    @InjectRepository(Medicine)
    private readonly medicineRepository: Repository<Medicine>,
  ) {}

  async findAll(): Promise<Medicine[]> {
    return await this.medicineRepository.find();
  }

  async findForSearch(search: string): Promise<Medicine> {
    return await this.medicineRepository.findOne({
      where: { name: Like(`%${search}%`) },
    });
  }

  async findById(id: string): Promise<Medicine> {
    return await this.medicineRepository.findOne({ where: { _id: id } });
  }

  async create(name: string, detail: string): Promise<void> {
    await this.medicineRepository.insert({ name, detail });
  }

  async delete(id: string): Promise<void> {
    await this.medicineRepository.delete({ _id: id });
  }
}
