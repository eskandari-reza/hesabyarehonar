// apps/backend/src/global/database/acct.datasource.ts
import { DataSource } from 'typeorm';
import { Year } from './year.entity';
import { Company } from './company.entity';

export const AcctDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5433', 10),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || '',
  database: 'Accanting_Data',
  entities: [Year, Company],
  synchronize: false, // دیتابیس موجوده، هرگز true نکن
});
