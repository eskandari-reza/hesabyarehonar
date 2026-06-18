// apps/backend/src/global/database/data-source-manager.service.ts
import {
  Injectable,
  Logger,
  OnModuleDestroy,
} from '@nestjs/common';
import { DataSource, DataSourceOptions } from 'typeorm';import {
  buildYearDataSourceOptions,
  assertValidYear,
  buildDatabaseName,
} from '../database/entities/financial-year.config';

@Injectable()
export class DataSourceManager implements OnModuleDestroy {
  private readonly logger = new Logger(DataSourceManager.name);

  /** کش اتصال‌ها به ازای هر سال مالی (دائمی) */
  private readonly cache = new Map<string, DataSource>();

  /** قفل برای جلوگیری از ساخت همزمان چند اتصال برای یک سال */
  private readonly initializing = new Map<string, Promise<DataSource>>();

  constructor(
  private readonly entities: DataSourceOptions['entities'],
  ) {}

  /**
   * گرفتن DataSource مربوط به یک سال مالی.
   * اگر قبلاً ساخته شده باشد از کش برمی‌گردد، در غیر این صورت ساخته و کش می‌شود.
   */
  async getDataSource(year: number | string): Promise<DataSource> {
    const key = assertValidYear(year);

    const cached = this.cache.get(key);
    if (cached?.isInitialized) {
      return cached;
    }

    // اگر اتصال در حال ساخت است، منتظر همان بمان (جلوگیری از race condition)
    const pending = this.initializing.get(key);
    if (pending) {
      return pending;
    }

    const promise = this.createAndCache(key);
    this.initializing.set(key, promise);

    try {
      return await promise;
    } finally {
      this.initializing.delete(key);
    }
  }

  private async createAndCache(year: string): Promise<DataSource> {
    const options = buildYearDataSourceOptions(year, this.entities);
    const dataSource = new DataSource(options);

    await dataSource.initialize();
    this.cache.set(year, dataSource);

    this.logger.log(`DataSource initialized: ${buildDatabaseName(year)}`);
    return dataSource;
  }
  

  /** بستن یک اتصال خاص (برای استفاده‌ی آینده / TTL) */
  async destroy(year: number | string): Promise<void> {
    const key = assertValidYear(year);
    const ds = this.cache.get(key);
    if (ds?.isInitialized) {
      await ds.destroy();
      this.logger.log(`DataSource destroyed: ${buildDatabaseName(key)}`);
    }
    this.cache.delete(key);
  }

  /** بستن همه‌ی اتصال‌ها هنگام خاموش شدن اپلیکیشن */
  async onModuleDestroy(): Promise<void> {
    await Promise.all(
      [...this.cache.values()]
        .filter((ds) => ds.isInitialized)
        .map((ds) => ds.destroy()),
    );
    this.cache.clear();
  }
}
