// apps/api/src/coa/doc.service.ts
import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { DataSourceManager } from '../database/data-source-manager.service';
import { DocMaster } from '../database/entities';
import { DocDetail } from '../database/entities';
import { DocDesc } from '../database/entities';
import { CreateDocMasterDto } from '../coa/dto/doc-master.dto';
import { DocMasterDto } from '../coa/dto/doc-master.dto';
import { DocMasterWithDetailsDto } from '../coa/dto/doc-master.dto';
import { DocFilterDto } from '../coa/dto/doc-master.dto';
import { DocStatusUpdateDto } from '../coa/dto/doc-master.dto';
import { DocDetailDto } from './dto/doc-detail.dto';

@Injectable()
export class DocService {
  private readonly logger = new Logger(DocService.name);

  constructor(private readonly dsManager: DataSourceManager) {}

  /**
   * ثبت سند حسابداری جدید همراه با ردیف‌ها
   */
  async create(
    year: string,
    dto: CreateDocMasterDto,
    userId: number,
  ): Promise<DocMasterWithDetailsDto> {
    const ds = await this.dsManager.getDataSource(year);

    // اعتبارسنجی تراز بودن
    const totalDebit = (dto.details || []).reduce((sum, d) => sum + (d.debit || 0), 0);
    const totalCredit = (dto.details || []).reduce((sum, d) => sum + (d.credit || 0), 0);

    if (Math.abs(totalDebit - totalCredit) > 0.001) {
      throw new BadRequestException(
        `سند نامتوازن است. جمع بدهکار: ${totalDebit}، جمع بستانکار: ${totalCredit}`,
      );
    }

    return ds.transaction(async (manager) => {
      const masterRepo = manager.getRepository(DocMaster);
      const detailRepo = manager.getRepository(DocDetail);

      // ساخت master
      const master = masterRepo.create({
        serial: dto.serial,
        tarikh: dto.tarikh,
        docType: dto.docType,
        refrens: dto.refrens,
        taxOk: dto.taxOk ?? false,
        dtotal: totalDebit,
        ctotal: totalCredit,
        desc: dto.desc,
        modDesc: dto.modDesc,
        issuetype: dto.issuetype ?? 0,
        status: dto.status ?? 0,
        signature: dto.signature ?? 0,
        del: false,
        cui: userId,
        cdt: new Date(),
        date: new Date(),
      } as Partial<DocMaster>);

      const savedMaster = await masterRepo.save(master);

      // ساخت details با تبدیل صحیح undefined به null
      const details = (dto.details || []).map((detailDto) => {
        const detail = new DocDetail();
        detail.masterId = (savedMaster as DocMaster).id;
        detail.docType = detailDto.docType;
        detail.coaId = detailDto.coaId;
        detail.coaId1 = detailDto.coaId1 
        detail.coaId2 = detailDto.coaId2 
        detail.coaId3 = detailDto.coaId3 
        detail.ofcId = detailDto.ofcId 
        detail.prjId = detailDto.prjId 
        detail.debit = detailDto.debit;
        detail.credit = detailDto.credit;
        detail.desc = detailDto.desc 
        detail.modFlag = detailDto.modFlag 
        detail.modId = detailDto.modId 
        detail.modDesc = detailDto.modDesc 
        detail.cui = userId;
        detail.cdt = new Date();
        detail.del = false;
        detail.cancel = false;
        return detail;
      });

      const savedDetails = await detailRepo.save(details);

      this.logger.log(
        `سند ${savedMaster.id} با ${savedDetails.length} ردیف ثبت شد`,
      );

      return this.toDto(savedMaster, savedDetails);
    });
  }

  /**
   * بروزرسانی سند
   */
  async update(
    year: string,
    id: number,
    dto: CreateDocMasterDto,
    userId: number,
  ): Promise<DocMasterWithDetailsDto> {
    const ds = await this.dsManager.getDataSource(year);

    const totalDebit = (dto.details || []).reduce((sum, d) => sum + (d.debit || 0), 0);
    const totalCredit = (dto.details || []).reduce((sum, d) => sum + (d.credit || 0), 0);

    if (Math.abs(totalDebit - totalCredit) > 0.001) {
      throw new BadRequestException('سند نامتوازن است');
    }

    return ds.transaction(async (manager) => {
      const masterRepo = manager.getRepository(DocMaster);
      const detailRepo = manager.getRepository(DocDetail);

      const master = await masterRepo.findOne({ where: { id } });
      if (!master) {
        throw new NotFoundException(`سند ${id} یافت نشد`);
      }

      // بروزرسانی master
      Object.assign(master, {
        serial: dto.serial,
        tarikh: dto.tarikh,
        docType: dto.docType,
        refrens: dto.refrens,
        taxOk: dto.taxOk,
        dtotal: totalDebit,
        ctotal: totalCredit,
        desc: dto.desc,
        modDesc: dto.modDesc,
        issuetype: dto.issuetype,
        status: dto.status,
        signature: dto.signature,
        uui: userId,
        udt: new Date(),
      });

      const savedMaster = await masterRepo.save(master);

      // حذف ردیف‌های قبلی و افزودن ردیف‌های جدید
      if (dto.details && dto.details.length > 0) {
        await detailRepo.delete({ masterId: id });

        const newDetails = dto.details.map((detailDto) => {
          const detail = new DocDetail();
          detail.masterId = id;
          detail.docType = detailDto.docType;
          detail.coaId = detailDto.coaId;
          detail.coaId1 = detailDto.coaId1 
          detail.coaId2 = detailDto.coaId2 
          detail.coaId3 = detailDto.coaId3 
          detail.ofcId = detailDto.ofcId 
          detail.prjId = detailDto.prjId 
          detail.debit = detailDto.debit;
          detail.credit = detailDto.credit;
          detail.desc = detailDto.desc 
          detail.modFlag = detailDto.modFlag 
          detail.modId = detailDto.modId 
          detail.modDesc = detailDto.modDesc 
          detail.cui = master.cui;
          detail.cdt = master.cdt;
          detail.del = false;
          detail.cancel = false;
          return detail;
        });

        await detailRepo.save(newDetails);
      }

      const updatedDetails = await detailRepo.find({
        where: { masterId: id, del: false },
        order: { id: 'ASC' },
      });

      this.logger.log(`سند ${id} بروزرسانی شد`);

      return this.toDto(savedMaster, updatedDetails);
    });
  }

  /**
   * دریافت یک سند با ردیف‌هایش
   */
  async findOne(year: string, id: number): Promise<DocMasterWithDetailsDto> {
    const ds = await this.dsManager.getDataSource(year);
    const masterRepo = ds.getRepository(DocMaster);
    const detailRepo = ds.getRepository(DocDetail);

    const master = await masterRepo.findOne({ where: { id, del: false } });
    if (!master) {
      throw new NotFoundException(`سند ${id} یافت نشد`);
    }

    const details = await detailRepo.find({
      where: { masterId: id, del: false },
      order: { id: 'ASC' },
    });

    return this.toDto(master, details);
  }

  /**
   * لیست اسناد با فیلتر
   */
  async findAll(year: string, filter: DocFilterDto): Promise<DocMasterDto[]> {
    const ds = await this.dsManager.getDataSource(year);
    const repo = ds.getRepository(DocMaster);

    const qb = repo.createQueryBuilder('doc').where('doc.del = :del', { del: false });

    if (filter.docType) {
      qb.andWhere('doc.docType = :docType', { docType: filter.docType });
    }

    if (filter.fromDate) {
      qb.andWhere('doc.tarikh >= :fromDate', { fromDate: filter.fromDate });
    }

    if (filter.toDate) {
      qb.andWhere('doc.tarikh <= :toDate', { toDate: filter.toDate });
    }

    if (filter.status !== undefined) {
      qb.andWhere('doc.status = :status', { status: filter.status });
    }

    qb.orderBy('doc.id', 'DESC');

    if (filter.limit) {
      qb.take(filter.limit);
    }

    if (filter.offset) {
      qb.skip(filter.offset);
    }

    const masters = await qb.getMany();
    return masters.map((m) => this.toMasterDto(m));
  }

  /**
   * حذف منطقی سند
   */
  async remove(year: string, id: number, userId: number): Promise<void> {
    const ds = await this.dsManager.getDataSource(year);

    await ds.transaction(async (manager) => {
      const masterRepo = manager.getRepository(DocMaster);
      const detailRepo = manager.getRepository(DocDetail);

      const master = await masterRepo.findOne({ where: { id } });
      if (!master) {
        throw new NotFoundException(`سند ${id} یافت نشد`);
      }

      master.del = true;
      master.dui = userId;
      master.ddt = new Date();
      await masterRepo.save(master);

      await detailRepo.update(
        { masterId: id },
        { del: true, dui: userId, ddt: new Date() },
      );

      this.logger.log(`سند ${id} حذف شد`);
    });
  }

  /**
   * لغو سند
   */
  async cancel(year: string, id: number, userId: number): Promise<void> {
    const ds = await this.dsManager.getDataSource(year);
    const detailRepo = ds.getRepository(DocDetail);

    await detailRepo.update(
      { masterId: id },
      { cancel: true, cancelui: userId, canceldt: new Date() },
    );

    this.logger.log(`سند ${id} لغو شد`);
  }

  /**
   * تغییر وضعیت سند
   */
  async updateStatus(
    year: string,
    id: number,
    dto: DocStatusUpdateDto,
    userId: number,
  ): Promise<void> {
    const ds = await this.dsManager.getDataSource(year);
    const repo = ds.getRepository(DocMaster);

    const master = await repo.findOne({ where: { id } });
    if (!master) {
      throw new NotFoundException(`سند ${id} یافت نشد`);
    }

    master.status = dto.status;
    master.uui = userId;
    master.udt = new Date();

    await repo.save(master);
  }

  /**
   * دریافت توضیحات از tbl_acc_doc_desc
   */
  async getDescriptions(year: string, type?: string): Promise<string[]> {
    const ds = await this.dsManager.getDataSource(year);
    const repo = ds.getRepository(DocDesc);

    const qb = repo.createQueryBuilder('desc').select('desc.docDesc');

    if (type) {
      qb.where('desc.type = :type', { type });
    }

    const results = await qb.getMany();
    return results.map((r) => r.docDesc);
  }

  // ────────────────────────────────────────────────────────────────
  // Helper methods
  // ────────────────────────────────────────────────────────────────

  private toDto(
    master: DocMaster,
    details: DocDetail[],
  ): DocMasterWithDetailsDto {
    return {
      id: master.id,
      serial: master.serial,
      date: master.date,
      tarikh: master.tarikh,
      docType: master.docType,
      refrens: master.refrens,
      taxOk: master.taxOk,
      dtotal: master.dtotal,
      ctotal: master.ctotal,
      desc: master.desc,
      modDesc: master.modDesc,
      issuetype: master.issuetype,
      status: master.status,
      signature: master.signature,
      cui: master.cui,
      cdt: master.cdt,
      details: details.map((d) => this.toDetailDto(d)),
    };
  }

  private toMasterDto(master: DocMaster): DocMasterDto {
    return {
      id: master.id,
      serial: master.serial,
      date: master.date,
      tarikh: master.tarikh,
      docType: master.docType,
      refrens: master.refrens,
      taxOk: master.taxOk,
      dtotal: master.dtotal,
      ctotal: master.ctotal,
      desc: master.desc,
      modDesc: master.modDesc,
      issuetype: master.issuetype,
      status: master.status,
      signature: master.signature,
      cui: master.cui,
      cdt: master.cdt,
    };
  }

  private toDetailDto(detail: DocDetail): DocDetailDto {
    return {
      id: detail.id,
      masterId: detail.masterId,
      docType: detail.docType,
      coaId: detail.coaId,
      coaId1: detail.coaId1 ?? null,
      coaId2: detail.coaId2 ?? null,
      coaId3: detail.coaId3 ?? null,
      ofcId: detail.ofcId ?? null,
      prjId: detail.prjId ?? null,
      debit: detail.debit,
      credit: detail.credit,
      desc: detail.desc ?? null,
      modFlag: detail.modFlag,
      modId: detail.modId ?? null,
      modDesc: detail.modDesc ?? null,
      cancel: detail.cancel ?? false,
      cui: detail.cui,
      cdt: detail.cdt,
    };
  }
}
