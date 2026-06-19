// apps/api/src/entities/doc-detail.entity.ts
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
import { DocMaster } from './doc-master.entity';
import { Coa } from './coa.entity';

@Entity('tbl_acc_doc_detail')
@Index(['masterId'])
@Index(['coaId'])
export class DocDetail {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  // ارجاع به سند اصلی
  @Column({ name: 'master_id', type: 'int', nullable: true })
  masterId: number;

  // نوع سند
  @Column({ name: 'doc_type', type: 'varchar', length: 50, nullable: true })
  docType: string;

  // حساب اصلی (تفصیلی سطح ۱)
  @Column({ name: 'coa_id', type: 'int', nullable: true })
  coaId: number;

  // تفصیلی سطح ۲
  @Column({ name: 'coa_id1', type: 'int', nullable: true })
  coaId1: number;

  // تفصیلی سطح ۳
  @Column({ name: 'coa_id2', type: 'int', nullable: true })
  coaId2: number;

  // تفصیلی سطح ۴
  @Column({ name: 'coa_id3', type: 'int', nullable: true })
  coaId3: number;

  // شناسه دفتر
  @Column({ name: 'ofc_id', type: 'int', nullable: true })
  ofcId: number;

  // شناسه پروژه
  @Column({ name: 'prj_id', type: 'int', nullable: true })
  prjId: number;

  // بدهکار
  @Column({ type: 'decimal', precision: 18, scale: 3, nullable: true })
  debit: number;

  // بستانکار
  @Column({ type: 'decimal', precision: 18, scale: 3, nullable: true })
  credit: number;

  // شرح ردیف
  @Column({ type: 'varchar', length: 'max', nullable: true })
  desc: string;

  // فلگ اصلاحی
  @Column({ name: 'mod_flag', type: 'bit', nullable: true })
  modFlag: boolean;

  // شناسه ردیف اصلی
  @Column({ name: 'mod_id', type: 'int', nullable: true })
  modId: number;

  // شرح اصلاح
  @Column({ name: 'mod_desc', type: 'varchar', length: 'max', nullable: true })
  modDesc: string;

  // لغو شده
  @Column({ type: 'bit', nullable: true })
  cancel: boolean;

  // کاربر لغوکننده
  @Column({ name: 'cancelui', type: 'int', nullable: true })
  cancelUserId: number;

  // تاریخ لغو
  @Column({ name: 'canceldt', type: 'timestamp', nullable: true })
  cancelAt: Date;

  // حذف منطقی
  @Column({ type: 'bit', nullable: true })
  del: boolean;

  // Audit Trail - ایجاد
  @Column({ name: 'cui', type: 'int' })
  createdUserId: number;

  @CreateDateColumn({ name: 'cdt', type: 'timestamp' })
  createdAt: Date;

  // Audit Trail - ویرایش
  @Column({ name: 'uui', type: 'int', nullable: true })
  updatedUserId: number;

  @UpdateDateColumn({ name: 'udt', type: 'timestamp', nullable: true })
  updatedAt: Date;

  // Audit Trail - حذف
  @Column({ name: 'dui', type: 'int', nullable: true })
  deletedUserId: number;

  @Column({ name: 'ddt', type: 'timestamp', nullable: true })
  deletedAt: Date;

  // روابط
  @ManyToOne('DocMaster', 'details')
  @JoinColumn({ name: 'master_id' })
  docMaster: DocMaster;

  @ManyToOne(() => Coa, { nullable: true })
  @JoinColumn({ name: 'coa_id' })
  coa: Coa;

  @ManyToOne(() => Coa, { nullable: true })
  @JoinColumn({ name: 'coa_id1' })
  coa1: Coa;

  @ManyToOne(() => Coa, { nullable: true })
  @JoinColumn({ name: 'coa_id2' })
  coa2: Coa;

  @ManyToOne(() => Coa, { nullable: true })
  @JoinColumn({ name: 'coa_id3' })
  coa3: Coa;
}
