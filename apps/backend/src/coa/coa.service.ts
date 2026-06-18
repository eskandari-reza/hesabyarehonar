import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, IsNull } from 'typeorm';
import { DataSourceManager } from '../database/data-source-manager.service';
import { Coa } from '../database/entities/financial/coa.entity';
import { CoaNodeDto } from './dto/coa-node.dto';

@Injectable()
export class CoaService {
  constructor(
    private readonly dataSourceManager: DataSourceManager,
  ) {}

  private async getCoaRepository(year: string): Promise<Repository<Coa>> {
    const dataSource = await this.dataSourceManager.getDataSource(year);
    return dataSource.getRepository(Coa);
  }

  async findAll(year: string): Promise<CoaNodeDto[]> {
    const repository = await this.getCoaRepository(year);
    const records = await repository.find({
      where: { del: false },
      order: { code: 'ASC' },
    });
    return records.map((r) => this.mapToDto(r));
  }

  async findOne(year: string, id: number): Promise<CoaNodeDto> {
    const repository = await this.getCoaRepository(year);
    const record = await repository.findOne({ 
      where: { id, del: false } 
    });
    
    if (!record) {
      throw new NotFoundException(`CoA node with ID ${id} not found`);
    }
    
    return this.mapToDto(record);
  }

  async findChildren(year: string, parentId: number): Promise<CoaNodeDto[]> {
    const repository = await this.getCoaRepository(year);
    const records = await repository.find({
      where: { parentId, del: false },
      order: { code: 'ASC' },
    });
    return records.map((r) => this.mapToDto(r));
  }

  async findRoots(year: string): Promise<CoaNodeDto[]> {
    const repository = await this.getCoaRepository(year);
    const records = await repository.find({
      where: { parentId: IsNull(), del: false }, // اصلاح: استفاده از IsNull()
      order: { code: 'ASC' },
    });
    return records.map((r) => this.mapToDto(r));
  }

  private mapToDto(entity: Coa): CoaNodeDto {
    return {
      id: entity.id,
      parentId: entity.parentId,
      code: entity.code,
      name: entity.name,
      detailed: entity.detailed,
      balanceNature: this.mapBalanceNature(entity.blncNature), // اصلاح: تبدیل number به string
    };
  }

  /**
   * تبدیل عدد به "debit" یا "credit"
   */
private mapBalanceNature(value: number | null): "debit" | "credit" {
  if (value === null) return "debit"; // یا throw error
  return value === 1 ? "debit" : "credit";
}

}
