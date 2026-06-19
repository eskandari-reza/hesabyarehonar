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
  masterId: number | null;
  docType: string | null;
  coaId: number | null;
  coaId1: number | null;
  coaId2: number | null;
  coaId3: number | null;
  ofcId: number | null;
  prjId: number | null;
  debit: number | null;
  credit: number | null;
  desc: string | null;
  modFlag: boolean | null;
  modId: number | null;
  modDesc: string | null;
  cancel: boolean | null;

  // فیلدهای audit
  cui: number;
  cdt: Date;
}
