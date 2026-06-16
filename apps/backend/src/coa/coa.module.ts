// src/coa/coa.module.ts
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Coa } from "./entities/coa.entity";
import { CoaService } from "./coa.service";
import { CoaController } from "./coa.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Coa])],
  controllers: [CoaController],
  providers: [CoaService],
})
export class CoaModule {}
