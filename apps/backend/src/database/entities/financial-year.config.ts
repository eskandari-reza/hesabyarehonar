import { DataSourceOptions } from 'typeorm';

export const FINANCIAL_DB_PREFIX = 'DB1';

/** فقط سال‌های ۴ رقمی شمسی مجاز هستند (whitelist برای جلوگیری از injection) */
const YEAR_PATTERN = /^\d{4}$/;

export function assertValidYear(year: number | string): string {
  const y = String(year).trim();
  if (!YEAR_PATTERN.test(y)) {
    throw new Error(`Invalid financial year: "${year}"`);
  }
  return y;
}

export function buildDatabaseName(year: number | string): string {
  return `${FINANCIAL_DB_PREFIX}${assertValidYear(year)}`;
}

export function buildYearDataSourceOptions(
  year: number | string,
  entities: DataSourceOptions['entities'],
): DataSourceOptions {
  return {
    type: 'postgres',
    host: process.env.DB_HOST ?? 'localhost',
    port: Number(process.env.DB_PORT ?? 5433), // پورت واقعی شما
    username: process.env.DB_USERNAME ?? 'postgres',
    password: process.env.DB_PASSWORD,
    database: buildDatabaseName(year),
    entities,
    synchronize: false,
    logging: process.env.NODE_ENV === 'development',
  };
}
