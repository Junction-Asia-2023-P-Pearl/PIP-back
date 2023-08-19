import { GenderEnum } from 'src/common/enums';

export interface CreatePatientRequestDto {
  name: string;
  birthDate: Date;
  gender: GenderEnum;
  height: number;
  weight: number;
  caution: string;
  guardianId: string;
}
