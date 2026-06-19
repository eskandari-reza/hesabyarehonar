import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsOptional,
  IsBoolean,
  IsArray,
  ValidateNested,
  IsDate,
  IsInt,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { DocDetailDto } from './doc-detail.dto';

export class DocFilterDto {
@ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(1)
  limit?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(0)
  offset?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  fromDate?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  toDate?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  docType?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  ofcId?: number;

  // این سه تا رو اضافه کن
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  status?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  cui?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  cdt?: string;
}

export class DocMasterDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsNumber()
  serial: number;

  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  date: Date;

  @ApiProperty()
  @IsString()
  tarikh: string;

  @ApiProperty()
  @IsString()
  docType: string;

  @ApiProperty()
  @IsNumber()
  refrens: number;

  @ApiProperty()
  @IsBoolean()
  taxOk: boolean;

  @ApiProperty()
  @IsNumber()
  dtotal: number;

  @ApiProperty()
  @IsNumber()
  ctotal: number;

  @ApiProperty()
  @IsString()
  desc: string;

  @ApiProperty()
  @IsString()
  modDesc: string;

  @ApiProperty()
  @IsNumber()
  issuetype: number;

  @ApiProperty()
  @IsNumber()
  status: number;

  @ApiProperty()
  @IsNumber()
  signature: number;

  @ApiProperty()
  @IsNumber()
  cui: number;

  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  cdt: Date | null;

  @ApiPropertyOptional({ type: [DocDetailDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DocDetailDto)
  details?: DocDetailDto[];
}

export class DocMasterWithDetailsDto extends DocMasterDto {
  @ApiProperty({ type: [DocDetailDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DocDetailDto)
  declare details: DocDetailDto[];
}

export class CreateDocMasterDto {
  @ApiProperty()
  @IsNumber()
  serial: number;

  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  date: Date;

  @ApiProperty()
  @IsString()
  tarikh: string;

  @ApiProperty()
  @IsString()
  docType: string;

  @ApiProperty()
  @IsNumber()
  refrens: number;

  @ApiProperty()
  @IsBoolean()
  taxOk: boolean;

  @ApiProperty()
  @IsString()
  desc: string;

  @ApiProperty()
  @IsString()
  modDesc: string;

  @ApiProperty()
  @IsNumber()
  issuetype: number;

  @ApiProperty()
  @IsNumber()
  cui: number;
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  status?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  signature?: number;

  @ApiPropertyOptional({ type: [DocDetailDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DocDetailDto)
  details?: DocDetailDto[];
}
export class DocStatusUpdateDto {
  @ApiProperty()
  @IsNumber()
  status: number;

  @ApiProperty()
  @IsNumber()
  signature: number;
}
