import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Year } from '../database/entities/global/year.entity';
import { assertValidYear } from '../database/entities/financial-year.config';

@Injectable()
export class FinancialYearGuard implements CanActivate {
  constructor(
    @InjectRepository(Year)
    private readonly yearRepository: Repository<Year>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const year = request.query.year as string;

    // اعتبارسنجی فرمت سال (۴ رقمی)
    try {
      assertValidYear(year);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Invalid year format';
      throw new BadRequestException(message);
    }

    // بررسی وجود سال در دیتابیس تنظیمات
    const yearRecord = await this.yearRepository.findOne({
      where: { year: parseInt(year) },
    });

    if (!yearRecord) {
      throw new NotFoundException(`Financial year ${year} not found`);
    }

    // ذخیره اطلاعات سال در request برای استفاده در controller
    request.financialYear = year;
    request.yearRecord = yearRecord;

    return true;
  }
}
