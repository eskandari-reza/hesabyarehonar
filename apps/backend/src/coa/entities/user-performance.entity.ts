import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tbl_user_performance')
export class UserPerformance {
  // bigint در TypeORM به‌صورت string برگردانده می‌شود
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string;

  @Column({ name: 'user_id', type: 'int', nullable: true })
  userId: number | null;

  @Column({ name: 'frm_name', type: 'varchar', length: 80, nullable: true })
  frmName: string | null;

  @Column({ name: 'opening_frm_dt', type: 'timestamp', nullable: true })
  openingFrmDt: Date | null;

  @Column({ name: 'closing_frm_dt', type: 'timestamp', nullable: true })
  closingFrmDt: Date | null;

  @Column({ name: 'opening_tarikh', type: 'varchar', length: 20, nullable: true })
  openingTarikh: string | null;

  @Column({ name: 'opening_saat', type: 'varchar', length: 20, nullable: true })
  openingSaat: string | null;

  @Column({ name: 'closeing_tarikh', type: 'varchar', length: 20, nullable: true })
  closeingTarikh: string | null;

  @Column({ name: 'closeing_saat', type: 'varchar', length: 30, nullable: true })
  closeingSaat: string | null;

  @Column({ name: 'Center_Branch_Satatus', type: 'smallint', nullable: true })
  centerBranchSatatus: number | null;

  @Column({ name: 'Branch_ID', type: 'int', nullable: true })
  branchId: number | null;
}
