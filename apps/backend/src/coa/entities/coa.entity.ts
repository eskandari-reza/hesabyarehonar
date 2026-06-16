// src/coa/entities/coa.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("tbl_coa")
export class Coa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "type_id", nullable: true })
  typeId: number;

  @Column({ name: "gp_id", nullable: true })
  gpId: number;

  @Column()
  code: string;

  @Column()
  name: string;

  @Column({ name: "desc", nullable: true })
  description: string;

  @Column({ name: "trx_nature", nullable: true })
  trxNature: string;

  @Column({ name: "blnc_nature", nullable: true })
  blncNature: string; // در فرانت → balanceNature

  @Column({ default: false })
  detailed: boolean;

  @Column({ name: "cost_id", nullable: true })
  costId: number;

  @Column({ name: "parent_id", nullable: true })
  parentId: number;

  // system fields
  @Column({ default: false })
  del: boolean;
}
