import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoaController } from './coa.controller';
import { CoaService } from './coa.service';
import { DataSourceManager } from '../database/data-source-manager.service';
import { Year } from '../database/entities/global/year.entity';
import { Coa } from '../database/entities/financial/coa.entity';
import { DocMaster } from '../database/entities/financial/doc-master.entity';
import { DocDetail } from '../database/entities/financial/doc-detail.entity';
import { DocDesc } from '../database/entities/financial/doc-desc.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Year]),
  ],
  controllers: [CoaController],
  providers: [
    CoaService,
    {
      provide: DataSourceManager,
      useFactory: () => {
        // تمامی موجودیت‌های مالی که در دیتابیس سال مالی استفاده می‌شوند
        return new DataSourceManager([
          Coa,
          DocMaster,
          DocDetail,
          DocDesc,
        ]);
      },
    },
  ],
  exports: [CoaService, DataSourceManager],
})
export class CoaModule {}
