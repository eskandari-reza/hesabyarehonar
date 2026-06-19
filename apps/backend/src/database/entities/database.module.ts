// apps/backend/src/global/database/database.module.ts
import { Module, Global } from '@nestjs/common';
import { DataSourceManager } from '../data-source-manager.service';
// لیست entityهای مشترک دیتابیس‌های سال مالی را ایمپورت کن
// import { ChartOfAccount } from '...';
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
