import { AuthModule } from './auth.module';
import { DiagnosisModule } from './diagnosis.module';
import { GuardianModule } from './guardian.module';
import { MedicineReportModule } from './medicine-report.module';
import { MedicineModule } from './medicine.module';
import { PatientModule } from './patient.module';

export default [
  AuthModule,
  GuardianModule,
  MedicineModule,
  PatientModule,
  MedicineReportModule,
  DiagnosisModule,
];
