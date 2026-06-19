// apps/api/src/database/entities/financial/doc-detail.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { DocMaster } from '../financial/doc-master.entity';
import { Coa } from './coa.entity';

@Entity('tbl_acc_doc_detail')
@Index(['masterId'])
@Index(['coaId'])
export class DocDetail {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  // ارجاع به سند اصلی
  @Column({ name: 'master_id', type: 'int', nullable: true })
  masterId: number | null;

  // نوع سند
  @Column({ name: 'doc_type', type: 'varchar', length: 50, nullable: true })
  docType: string | null;

  // حساب اصلی (تفصیلی سطح ۱)
  @Column({ name: 'coa_id', type: 'int', nullable: true })
  coaId: number | null;

  // تفصیلی سطح ۲
  @Column({ name: 'coa_id1', type: 'int', nullable: true })
  coaId1: number | null;

  // تفصیلی سطح ۳
  @Column({ name: 'coa_id2', type: 'int', nullable: true })
  coaId2: number | null;

  // تفصیلی سطح ۴
  @Column({ name: 'coa_id3', type: 'int', nullable: true })
  coaId3: number | null;

  // شناسه دفتر
  @Column({ name: 'ofc_id', type: 'int', nullable: true })
  ofcId: number | null;

  // شناسه پروژه
  @Column({ name: 'prj_id', type: 'int', nullable: true })
  prjId: number | null;

  // بدهکار
  @Column({ type: 'decimal', precision: 18, scale: 3, nullable: true })
  debit: number | null;

  // بستانکار
  @Column({ type: 'decimal', precision: 18, scale: 3, nullable: true })
  credit: number | null;

  // شرح ردیف
  @Column({ type: 'varchar', length: 'max', nullable: true })
  desc: string | null;

  // فلگ اصلاحی
  @Column({ name: 'mod_flag', type: 'bit', nullable: true })
  modFlag: boolean | null;

  // شناسه ردیف اصلی
  @Column({ name: 'mod_id', type: 'int', nullable: true })
  modId: number | null;

  // شرح اصلاح
  @Column({ name: 'mod_desc', type: 'varchar', length: 'max', nullable: true })
  modDesc: string | null;

  // لغو شده
  @Column({ type: 'bit', nullable: true })
  cancel: boolean | null;

  // کاربر لغوکننده
  @Column({ name: 'cancelui', type: 'int', nullable: true })
  cancelui: number | null;

  // تاریخ لغو
  @Column({ name: 'canceldt', type: 'timestamp', nullable: true })
  canceldt: Date | null;

  // حذف منطقی
  @Column({ type: 'bit', nullable: true })
  del: boolean | null;

  // Audit Trail - ایجاد
  @Column({ name: 'cui', type: 'int' })
  cui: number;

  @CreateDateColumn({ name: 'cdt', type: 'timestamp' })
  cdt: Date;

  // Audit Trail - ویرایش
  @Column({ name: 'uui', type: 'int', nullable: true })
  uui: number | null;

  @UpdateDateColumn({ name: 'udt', type: 'timestamp', nullable: true })
  udt: Date | null;

  // Audit Trail - حذف
  @Column({ name: 'dui', type: 'int', nullable: true })
  dui: number | null;

  @Column({ name: 'ddt', type: 'timestamp', nullable: true })
  ddt: Date | null;

  // روابط
  @ManyToOne(() => DocMaster, (master) => master.details, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'master_id' })
  docMaster: DocMaster;

  @ManyToOne(() => Coa, { nullable: true })
  @JoinColumn({ name: 'coa_id' })
  coa: Coa | null;

  @ManyToOne(() => Coa, { nullable: true })
  @JoinColumn({ name: 'coa_id1' })
  coa1: Coa | null;

  @ManyToOne(() => Coa, { nullable: true })
  @JoinColumn({ name: 'coa_id2' })
  coa2: Coa | null;

  @ManyToOne(() => Coa, { nullable: true })
  @JoinColumn({ name: 'coa_id3' })
  coa3: Coa | null;
}
