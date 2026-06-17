import { Company } from './company.entity';
import { Year } from './year.entity';
// ... بقیه importها

export const Global_ENTITIES = [
  Company,
  Year,
  // ... بقیه
];

export * from './company.entity';
export * from './year.entity';
// ...
