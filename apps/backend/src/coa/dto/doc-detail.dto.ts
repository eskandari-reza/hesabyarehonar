// apps/api/src/coa/dto/doc-detail.dto.ts
import { IsNotEmpty, IsNumber, IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateDocDetailDto {
  @IsNotEmpty()
  @IsString()
  docType: string;

  @IsNotEmpty()
  @IsNumber()
  coaId: number;

  @IsOptional()
  @IsNumber()
  coaId1?: number;

  @IsOptional()
  @IsNumber()
  coaId2?: number;

  @IsOptional()
  @IsNumber()
  coaId3?: number;

  @IsOptional()
  @IsNumber()
  ofcId?: number;

  @IsOptional()
  @IsNumber()
  prjId?: number;

  @IsNotEmpty()
  @IsNumber()
  debit: number;

  @IsNotEmpty()
  @IsNumber()
  credit: number;

  @IsOptional()
  @IsString()
  desc?: string;

  @IsOptional()
  @IsBoolean()
  modFlag?: boolean;

  @IsOptional()
  @IsNumber()
  modId?: number;

  @IsOptional()
  @IsString()
  modDesc?: string;
}

export class DocDetailDto {
  id: number;
  masterId: number;
  docType: string;
  coaId: number;
  coaId1: number;
  coaId2: number;
  coaId3: number;
  ofcId: number;
  prjId: number;
  debit: number;
  credit: number;
  desc: string;
  modFlag: boolean;
  modId: number;
  modDesc: string;
  cancel: boolean;
  
  // فیلدهای audit
  cui: number;
  cdt: Date;
}
