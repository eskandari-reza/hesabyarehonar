// apps/backend/src/global/database/database.module.ts
import { Module, Global } from '@nestjs/common';
import { DataSourceManager } from '../data-source-manager.service';
import { WindowsSetting } from './financial/windows-setting.entity';
import { WeeklyDiscount } from './financial/weekly-discount.entity';
import { VatGp } from './financial/vat-gp.entity';
import { UserPermission } from './financial/user-permission.entity';
import { UserPerformance } from './financial/user-performance.entity';
import { UserGp } from './financial/user-gp.entity';
import { UserAccess } from './financial/user-access.entity';
import { User } from './financial/user.entity';
import { TaxGp } from './financial/tax-gp.entity';
import { SmsMessage } from './financial/sms-message.entity';
import { ShowDeleteForm } from './financial/show-delete-form.entity';
import { Sms } from './financial/sms.entity';
import { DocMaster } from './financial/doc-master.entity';
import { DocDetail } from './financial/doc-detail.entity';
import { DocDesc } from './financial/doc-desc.entity';
import { Coa } from './financial/coa.entity';
import { CoaGp } from './financial/coa-gp.entity';

export const FINANCIAL_YEAR_ENTITIES = [
  WindowsSetting,
  WeeklyDiscount,
  VatGp,
  UserPermission,
  UserPerformance,
  UserGp,
  UserAccess,
  User,
  TaxGp,
  SmsMessage,
  Sms,
  ShowDeleteForm,
  DocMaster,
  DocDetail,
  DocDesc,
  Coa,
  CoaGp,
];

@Global()
@Module({
  providers: [
    {
      provide: DataSourceManager,
      useFactory: () => new DataSourceManager(FINANCIAL_YEAR_ENTITIES),
    },
  ],
  exports: [DataSourceManager],
})
export class DatabaseModule {}
