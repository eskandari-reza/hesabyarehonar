// apps/api/src/entities/index.ts
import { Company } from './global/company.entity';
import { Year } from './global/year.entity';
import { User } from './financial/user.entity';
import { Sms } from './financial/sms.entity';
import { Coa } from './financial/coa.entity';
import { CoaGp } from './financial/coa-gp.entity';
import { DocDetail } from './financial/doc-detail.entity';
import { DocMaster } from './financial/doc-master.entity';
import { DocDesc } from './financial/doc-desc.entity';
import { ShowDeleteForm } from './financial/show-delete-form.entity';
import { SmsMessage } from './financial/sms-message.entity';
import { TaxGp } from './financial/tax-gp.entity';
import { UserAccess } from './financial/user-access.entity';
import { UserGp } from './financial/user-gp.entity';
import { UserPerformance } from './financial/user-performance.entity';
import { UserPermission } from './financial/user-permission.entity';
import { VatGp } from './financial/vat-gp.entity';
import { WeeklyDiscount } from './financial/weekly-discount.entity';
import { WindowsSetting } from './financial/windows-setting.entity';

export const Global_ENTITIES = [
  Company,
  Year,
];

export const FINANCIAL_ENTITIES = [
  Coa,
  CoaGp,
  DocMaster,
  DocDetail,
  DocDesc,
  User,
  UserAccess,
  UserGp,
  UserPerformance,
  UserPermission,
  Sms,
  SmsMessage,
  TaxGp,
  VatGp,
  WeeklyDiscount,
  WindowsSetting,
  ShowDeleteForm,
];

// Export all entities for TypeORM
export const ALL_ENTITIES = [
  ...Global_ENTITIES,
  ...FINANCIAL_ENTITIES,
];

// Re-export individual entities
export * from './global/company.entity';
export * from './global/year.entity';
export * from './financial/coa.entity';
export * from './financial/coa-gp.entity';
export * from './financial/doc-master.entity';
export * from './financial/doc-detail.entity';
export * from './financial/doc-desc.entity';
export * from './financial/user.entity';
export * from './financial/user-access.entity';
export * from './financial/user-gp.entity';
export * from './financial/user-performance.entity';
export * from './financial/user-permission.entity';
export * from './financial/sms.entity';
export * from './financial/sms-message.entity';
export * from './financial/tax-gp.entity';
export * from './financial/vat-gp.entity';
export * from './financial/weekly-discount.entity';
export * from './financial/windows-setting.entity';
export * from './financial/show-delete-form.entity';
