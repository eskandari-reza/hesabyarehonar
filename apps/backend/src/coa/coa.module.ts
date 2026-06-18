import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoaController } from './coa.controller';
import { CoaService } from './coa.service';
import { DataSourceManager } from '../database/entities/data-source-manager.service';
import { Year } from '../database/entities/global/year.entity';
import { Coa } from '../database/entities/financial/coa.entity';

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
        return new DataSourceManager([Coa]);
      },
    },
  ],
  exports: [CoaService],
})
export class CoaModule {}
