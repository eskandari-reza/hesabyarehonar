import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('tbl_acc_doc_master')
export class DocMaster {
  @PrimaryGeneratedColumn() id: number;
  @Column({ type: 'int', nullable: true }) serial: number;
  @Column({ type: 'timestamp', nullable: true }) date: Date;
  @Column({ type: 'varchar', length: 10, nullable: true }) tarikh: string;
  @Column({ type: 'varchar', length: 50, nullable: true }) doc_type: string;
  @Column({ type: 'int', nullable: true }) refrens: number;
  @Column({ type: 'boolean', nullable: true }) tax_ok: boolean;
  @Column({ type: 'decimal', precision: 18, scale: 3, nullable: true }) dtotal: number;
  @Column({ type: 'decimal', precision: 18, scale: 3, nullable: true }) ctotal: number;
  @Column({ type: 'text', nullable: true }) desc: string;
  @Column({ type: 'text', nullable: true }) mod_desc: string;
  @Column({ type: 'smallint', nullable: true }) issuetype: number;
  @Column({ type: 'smallint', nullable: true }) status: number;
  @Column({ type: 'smallint', nullable: true }) signature: number;
  @Column({ type: 'boolean', nullable: true }) del: boolean;
  @Column({ type: 'int' }) cui: number;
  @Column({ type: 'timestamp' }) cdt: Date;
  @Column({ type: 'int', nullable: true }) uui: number;
  @Column({ type: 'timestamp', nullable: true }) udt: Date;
  @Column({ type: 'int', nullable: true }) dui: number;
  @Column({ type: 'timestamp', nullable: true }) ddt: Date;
}
