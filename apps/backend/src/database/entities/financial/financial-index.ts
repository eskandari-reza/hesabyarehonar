import { User } from './user.entity';
import { Sms } from './sms.entity';
import { Coa } from './coa.entity'; // ✅ اضافه شد
import { CoaGp } from './coa-gp.entity';
import { DocDetail } from './doc-detail.entity';
import { DocMaster } from './doc-master.entity';
import { ShowDeleteForm } from './show-delete-form.entity';
import { SmsMessage } from './sms-message.entity';
import { TaxGp } from './tax-gp.entity';
import { UserAccess } from './user-access.entity';
import { UserGp } from './user-gp.entity';
import { UserPerformance } from './user-performance.entity';
import { UserPermission } from './user-permission.entity';
import { VatGp } from './vat-gp.entity';
import { WeeklyDiscount } from './weekly-discount.entity';
import { WindowsSetting } from './windows-setting.entity';

export const COA_ENTITIES = [
  Coa, // ✅ اضافه شد
  User,
  Sms,
  CoaGp,
  DocDetail,
  DocMaster,
  ShowDeleteForm,
  SmsMessage,
  TaxGp,
  UserAccess,
  UserGp,
  UserPerformance,
  UserPermission,
  VatGp,
  WeeklyDiscount,
  WindowsSetting,
];

export * from './coa.entity'; // ✅ اضافه شد
export * from './user.entity';
export * from './sms.entity';
export * from './coa-gp.entity';
export * from './doc-detail.entity';
export * from './doc-master.entity';
export * from './show-delete-form.entity';
export * from './sms-message.entity';
export * from './tax-gp.entity';
export * from './user-access.entity';
export * from './user-gp.entity';
export * from './user-performance.entity';
export * from './user-permission.entity';
export * from './vat-gp.entity';
export * from './weekly-discount.entity';
export * from './windows-setting.entity';
