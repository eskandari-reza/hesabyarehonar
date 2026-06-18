import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AcctDataSource } from './database/entities/global/acct.datasource';
import { Year } from './database/entities/global/year.entity';
import { Company } from './database/entities/global/company.entity';

async function bootstrap() {
  // ۱) اتصال به دیتابیس سراسری
  try {
    await AcctDataSource.initialize();
    console.log('✅ AcctDataSource (Accanting_Data) متصل شد');
  } catch (err) {
    console.error('❌ خطا در اتصال به Accanting_Data:', err);
    process.exit(1);
  }

  // ۲) کوئری تست — خواندن لیست شرکت‌ها و سال‌های مالی
  try {
    const companyRepo = AcctDataSource.getRepository(Company);
    const yearRepo = AcctDataSource.getRepository(Year);

    const companies = await companyRepo.find({
  select: {
    id: true,
    compani_name: true,
    economic_code: true,
  },
  where: { del: false },
});

    const years = await yearRepo.find({ order: { year: 'DESC' } });
    console.log(`📅 سال‌های مالی موجود:`);
    years.forEach((y) =>
      console.log(`   - شرکت ${y.company_id} → سال ${y.year}`),
    );
  } catch (err) {
    console.error('❌ خطا در کوئری تست:', err);
  }

  // ۳) راه‌اندازی اپ
  const app = await NestFactory.create(AppModule);
  app.enableCors({
  origin: ['http://localhost:3001', 'http://localhost:3000'],
  credentials: true,
});
  await app.listen(process.env.PORT || 3000);
  console.log(`🚀 اپ روی پورت ${process.env.PORT || 3000} بالا اومد`);
}
bootstrap();
