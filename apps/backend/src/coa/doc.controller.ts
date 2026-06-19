// apps/api/src/coa/doc.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';

import { DocService } from './doc.service';
import { CurrentUserId } from './decorators/current-user-id.decorator';
import {
  CreateDocMasterDto,
  DocMasterDto,
  DocMasterWithDetailsDto,
  DocFilterDto,
  DocStatusUpdateDto,
} from './dto/doc-master.dto';


/**
 * Controller برای مدیریت اسناد حسابداری
 * مسیر: /coa/:year/docs
 */
@Controller('coa/:year/docs')
export class DocController {
  constructor(private readonly docService: DocService) {}

  /**
   * ثبت سند جدید
   * POST /coa/1405/docs
   */
@Post()
async create(
  @Param('year') year: string,
  @Body() dto: CreateDocMasterDto,
  @CurrentUserId() userId: number,
): Promise<DocMasterWithDetailsDto> {
  return this.docService.create(year, dto, userId);
}


  /**
   * لیست اسناد با فیلتر
   * GET /coa/1405/docs?docType=sale&fromDate=1405/01/01
   */
  @Get()
  async findAll(
    @Param('year') year: string,
    @Query() filter: DocFilterDto,
  ): Promise<DocMasterDto[]> {
    return this.docService.findAll(year, filter);
  }

  /**
   * دریافت یک سند با ردیف‌ها
   * GET /coa/1405/docs/123
   */
  @Get(':id')
  async findOne(
    @Param('year') year: string,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DocMasterWithDetailsDto> {
    return this.docService.findOne(year, id);
  }

  /**
   * بروزرسانی سند
   * PUT /coa/1405/docs/123
   */
@Put(':id')
async update(
  @Param('year') year: string,
  @Param('id', ParseIntPipe) id: number,
  @Body() dto: CreateDocMasterDto,
  @CurrentUserId() userId: number,
): Promise<DocMasterWithDetailsDto> {
  return this.docService.update(year, id, dto, userId);
}


  /**
   * حذف منطقی سند
   * DELETE /coa/1405/docs/123
   */
@Delete(':id')
@HttpCode(HttpStatus.NO_CONTENT)
async remove(
  @Param('year') year: string,
  @Param('id', ParseIntPipe) id: number,
  @CurrentUserId() userId: number,
): Promise<void> {
  await this.docService.remove(year, id, userId);
}


  /**
   * لغو سند
   * POST /coa/1405/docs/123/cancel
   */
@Post(':id/cancel')
@HttpCode(HttpStatus.NO_CONTENT)
async cancel(
  @Param('year') year: string,
  @Param('id', ParseIntPipe) id: number,
  @CurrentUserId() userId: number,
): Promise<void> {
  await this.docService.cancel(year, id, userId);
}


  /**
   * تغییر وضعیت سند
   * PATCH /coa/1405/docs/123/status
   */
@Post(':id/status')
@HttpCode(HttpStatus.NO_CONTENT)
async updateStatus(
  @Param('year') year: string,
  @Param('id', ParseIntPipe) id: number,
  @Body() dto: DocStatusUpdateDto,
  @CurrentUserId() userId: number,
): Promise<void> {
  await this.docService.updateStatus(year, id, dto, userId);
}


  /**
   * دریافت لیست توضیحات
   * GET /coa/1405/docs/descriptions?type=sale
   */
  @Get('descriptions/list')
  async getDescriptions(
    @Param('year') year: string,
    @Query('type') type?: string,
  ): Promise<string[]> {
    return this.docService.getDescriptions(year, type);
  }
}
