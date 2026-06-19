// apps/api/src/entities/doc-master.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { DocDetail } from './doc-detail.entity';

@Entity('tbl_acc_doc_master')
@Index(['serial', 'tarikh'])
@Index(['status'])
export class DocMaster {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  // شماره سریال سند
  @Column({ type: 'int', nullable: true })
  serial: number;

  // تاریخ میلادی
  @Column({ type: 'timestamp', nullable: true })
  date: Date;

  // تاریخ شمسی (مثلاً "1405/03/29")
  @Column({ type: 'varchar', length: 10, nullable: true })
  tarikh: string;

  // نوع سند (رشته متنی دلخواه)
  @Column({ name: 'doc_type', type: 'varchar', length: 50, nullable: true })
  docType: string;

  // شماره مرجع
  @Column({ type: 'int', nullable: true })
  refrens: number;

  // تأیید مالیاتی
  @Column({ name: 'tax_ok', type: 'bit', nullable: true })
  taxOk: boolean;

  // جمع بدهکار
  @Column({ type: 'decimal', precision: 18, scale: 3, nullable: true })
  dtotal: number;

  // جمع بستانکار
  @Column({ type: 'decimal', precision: 18, scale: 3, nullable: true })
  ctotal: number;

  // شرح سند
  @Column({ type: 'varchar', length: 'max', nullable: true })
  desc: string;

  // شرح اصلاح
  @Column({ name: 'mod_desc', type: 'varchar', length: 'max', nullable: true })
  modDesc: string;

  // نوع صدور
  @Column({ type: 'smallint', nullable: true })
  issuetype: number;

  // وضعیت سند (0=پیش‌نویس، 1=ثبت‌شده، 2=تایید‌شده، -1=باطل)
  @Column({ type: 'smallint', nullable: true })
  status: number;

  // امضا
  @Column({ type: 'smallint', nullable: true })
  signature: number;

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
  @OneToMany('DocDetail', 'docMaster', { cascade: true })
  details: DocDetail[];
}
