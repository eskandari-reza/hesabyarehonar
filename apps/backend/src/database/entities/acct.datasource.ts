import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('tbl_sl')
export class Coa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'parent_id', type: 'int', nullable: true })
  parentId: number | null;

  @Column({ type: 'varchar', length: 20 })
  code: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'boolean', default: false })
  detailed: boolean;

  @Column({ name: 'blnc_nature', type: 'varchar', length: 10 })
  balanceNature: 'debit' | 'credit';

  @Column({ name: 'company_id', type: 'int' })
  companyId: number;
}
