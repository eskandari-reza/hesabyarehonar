import { Controller, Get, Param, UseGuards, Req, ParseIntPipe } from '@nestjs/common';
import { CoaService } from './coa.service';
import { FinancialYearGuard } from '../guards/financial-year.guard';

@Controller('coa')
@UseGuards(FinancialYearGuard)
export class CoaController {
  constructor(private readonly coaService: CoaService) {}

  /**
   * GET /coa?year=1403
   * دریافت تمام نودها
   */
  @Get()
  async findAll(@Req() request: any) {
    const year = request.financialYear;
    return this.coaService.findAll(year);
  }

  /**
   * GET /coa/roots?year=1403
   * دریافت نودهای ریشه
   */
  @Get('roots')
  async findRoots(@Req() request: any) {
    const year = request.financialYear;
    return this.coaService.findRoots(year);
  }

  /**
   * GET /coa/:id?year=1403
   * دریافت یک نود
   */
  @Get(':id')
  async findOne(
    @Req() request: any,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const year = request.financialYear;
    return this.coaService.findOne(year, id);
  }

  /**
   * GET /coa/:id/children?year=1403
   * دریافت فرزندان یک نود
   */
  @Get(':id/children')
  async findChildren(
    @Req() request: any,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const year = request.financialYear;
    return this.coaService.findChildren(year, id);
  }
}
