// apps/backend/src/global/database/database.module.ts
import { Module, Global } from '@nestjs/common';
import { DataSourceManager } from './data-source-manager.service';
// لیست entityهای مشترک دیتابیس‌های سال مالی را ایمپورت کن
// import { ChartOfAccount } from '...';
import { WindowsSetting } from '../../coa/entities/windows-setting.entity';
import { WeeklyDiscount } from '../../coa/entities/weekly-discount.entity';
import { VatGp } from '../../coa/entities/vat-gp.entity';
import { UserPermission } from '../../coa/entities/user-permission.entity';
import { UserPerformance } from '../../coa/entities/user-performance.entity';
import { UserGp } from '../../coa/entities/user-gp.entity';
import { UserAccess } from '../../coa/entities/user-access.entity';
import { User } from '../../coa/entities/user.entity';
import { TaxGp } from '../../coa/entities/tax-gp.entity';
import { SmsMessage } from '../../coa/entities/sms-message.entity';
import { ShowDeleteForm } from '../../coa/entities/show-delete-form.entity';
import { Sms } from '../../coa/entities/sms.entity';
import { DocMaster } from '../../coa/entities/doc-master.entity';
import { DocDetail } from '../../coa/entities/doc-detail.entity';

export const FINANCIAL_YEAR_ENTITIES = [
  WindowsSetting,//
  WeeklyDiscount,//
  VatGp,//
  UserPermission,//
  UserPerformance,//
  UserGp,//
  UserAccess,//
  User,//
  TaxGp,//
  SmsMessage,//
  User,//
  Sms,//
  ShowDeleteForm,//
];
@Global()
@Module({
  providers: [
    {
      provide: DataSourceManager,
      useFactory: () =>
        new DataSourceManager([
          // ChartOfAccount, ...
        ]),
    },
  ],
  exports: [DataSourceManager],
})
export class DatabaseModule {}
