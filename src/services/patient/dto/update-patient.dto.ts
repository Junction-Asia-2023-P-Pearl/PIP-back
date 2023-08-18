import { GenderEnum } from 'src/common/enums';

export interface UpdatePatientRequestDto {
  name: string;
  birthDate: Date;
  gender: GenderEnum;
  height: number;
  weight: number;
  detail: string;
  guardianId: string;
}
