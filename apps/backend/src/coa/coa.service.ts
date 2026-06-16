// src/coa/coa.service.ts
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Coa } from "./entities/coa.entity";
import { CoaNodeDto } from "./dto/coa-node.dto";

@Injectable()
export class CoaService {
  constructor(
    @InjectRepository(Coa)
    private readonly repo: Repository<Coa>,
  ) {}

  async findAll(): Promise<CoaNodeDto[]> {
    const rows = await this.repo.find({ where: { del: false } });
    return rows.map((r) => ({
      id: r.id,
      parentId: r.parentId ?? null,
      code: r.code,
      name: r.name,
      detailed: r.detailed,
      balanceNature: r.blncNature === "debit" ? "debit" : "credit",
    }));
  }
}
