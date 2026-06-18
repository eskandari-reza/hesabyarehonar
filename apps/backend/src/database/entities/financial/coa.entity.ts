// apps/api/src/entities/coa.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("tbl_coa")
export class Coa {
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Column({ name: "type_id", type: "int", nullable: true })
  typeId: number;

  @Column({ name: "gp_id", type: "int", nullable: true })
  gpId: number;

  @Column({ type: "varchar", length: 20 })
  code: string;

  @Column({ type: "nvarchar", length: 100 })
  name: string;

  @Column({ name: "desc", type: "nvarchar", length: 200, nullable: true })
  description: string;

  @Column({ name: "trx_nature", type: "int", nullable: true })
  trxNature: number;

  @Column({ name: "blnc_nature", type: "int", nullable: true })
  blncNature: number;

  @Column({ type: "bit", default: false })
  detailed: boolean;

  @Column({ name: "cost_id", type: "int", nullable: true })
  costId: number;

  @Column({ name: "parent_id", type: "int", nullable: true })
  parentId: number;

  @Column({ type: "bit", default: false })
  del: boolean;

  // Audit fields (optional)
  @Column({ name: "cui", type: "int", nullable: true })
  createUserId: number;

  @Column({ name: "cdt", type: "datetime", nullable: true })
  createDateTime: Date;

  @Column({ name: "uui", type: "int", nullable: true })
  updateUserId: number;

  @Column({ name: "udt", type: "datetime", nullable: true })
  updateDateTime: Date;

  @Column({ name: "dui", type: "int", nullable: true })
  deleteUserId: number;

  @Column({ name: "ddt", type: "datetime", nullable: true })
  deleteDateTime: Date;
}
