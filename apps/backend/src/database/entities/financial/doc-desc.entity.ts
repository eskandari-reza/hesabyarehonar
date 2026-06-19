// apps/api/src/database/entities/financial/doc-desc.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

@Entity('tbl_acc_doc_desc')
export class DocDesc {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  // شرح سند (lookup)
  @Column({ name: 'doc_desc', type: 'varchar', length: 'max', nullable: true })
  docDesc: string;

  // نوع
  @Column({ type: 'varchar', length: 50, nullable: true })
  type: string;
}
