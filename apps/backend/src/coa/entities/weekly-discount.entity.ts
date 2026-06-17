import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tbl_weekly_discounts')
export class WeeklyDiscount {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ name: 'gp_id', type: 'int', nullable: true })
  gpId: number | null;

  @Column({ name: 'goods_id', type: 'int', nullable: true })
  goodsId: number | null;

  @Column({ name: 'day_id', type: 'smallint', nullable: true })
  dayId: number | null;

  @Column({ name: 'discount_percentage', type: 'smallint', nullable: true })
  discountPercentage: number | null;

  @Column({ name: 'center_branch_ID', type: 'int', nullable: true })
  centerBranchId: number | null;

  @Column({ name: 'Branch1_Satatus', type: 'smallint', nullable: true })
  branch1Status: number | null;

  @Column({ name: 'Branch2_Satatus', type: 'smallint', nullable: true })
  branch2Status: number | null;

  @Column({ name: 'Branch3_Satatus', type: 'smallint', nullable: true })
  branch3Status: number | null;

  @Column({ name: 'Branch4_Satatus', type: 'smallint', nullable: true })
  branch4Status: number | null;

  @Column({ name: 'Branch5_Satatus', type: 'smallint', nullable: true })
  branch5Status: number | null;

  @Column({ name: 'Branch6_Satatus', type: 'smallint', nullable: true })
  branch6Status: number | null;

  @Column({ name: 'Branch7_Satatus', type: 'smallint', nullable: true })
  branch7Status: number | null;

  @Column({ name: 'del', type: 'boolean', nullable: true })
  del: boolean | null;

  @Column({ name: 'dui', type: 'int', nullable: true })
  dui: number | null;

  @Column({ name: 'ddt', type: 'timestamp', nullable: true })
  ddt: Date | null;

  @Column({ name: 'cui', type: 'int' })
  cui: number;

  @Column({ name: 'cdt', type: 'timestamp' })
  cdt: Date;

  @Column({ name: 'uui', type: 'int', nullable: true })
  uui: number | null;

  @Column({ name: 'udt', type: 'timestamp', nullable: true })
  udt: Date | null;
}
