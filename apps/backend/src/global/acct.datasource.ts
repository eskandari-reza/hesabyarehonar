import { DataSource } from 'typeorm';
import { Year } from './entities/year.entity';
import { Company } from './entities/company.entity';

export const AcctDataSource = new DataSource({
  type: 'mssql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '1433', 10),
  username: process.env.DB_USER || 'sa',
  password: process.env.DB_PASS || '',
  database: 'Accanting_Data',
  entities: [Year, Company],
  synchronize: false, // دیتابیس موجوده، هرگز true نکن
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
});
