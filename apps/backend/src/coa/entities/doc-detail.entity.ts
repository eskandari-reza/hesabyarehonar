import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('tbl_acc_doc_detail')
export class DocDetail {
  @PrimaryGeneratedColumn() id: number;
  @Column({ type: 'int', nullable: true }) master_id: number;
  @Column({ type: 'varchar', length: 50, nullable: true }) doc_type: string;
  @Column({ type: 'int', nullable: true }) coa_id: number;
  @Column({ type: 'int', nullable: true }) coa_id1: number;
  @Column({ type: 'int', nullable: true }) coa_id2: number;
  @Column({ type: 'int', nullable: true }) coa_id3: number;
  @Column({ type: 'int', nullable: true }) ofc_id: number;
  @Column({ type: 'int', nullable: true }) prj_id: number;
  @Column({ type: 'decimal', precision: 18, scale: 3, nullable: true }) debit: number;
  @Column({ type: 'decimal', precision: 18, scale: 3, nullable: true }) credit: number;
  @Column({ type: 'text', nullable: true }) desc: string;
  @Column({ type: 'boolean', nullable: true }) mod_flag: boolean;
  @Column({ type: 'int', nullable: true }) mod_id: number;
  @Column({ type: 'text', nullable: true }) mod_desc: string;
  @Column({ type: 'boolean', nullable: true }) cancel: boolean;
  @Column({ type: 'int', nullable: true }) cancelui: number;
  @Column({ type: 'timestamp', nullable: true }) canceldt: Date;
  @Column({ type: 'boolean', nullable: true }) del: boolean;
  @Column({ type: 'int' }) cui: number;
  @Column({ type: 'timestamp' }) cdt: Date;
  @Column({ type: 'int', nullable: true }) uui: number;
  @Column({ type: 'timestamp', nullable: true }) udt: Date;
  @Column({ type: 'int', nullable: true }) dui: number;
  @Column({ type: 'timestamp', nullable: true }) ddt: Date;
}
