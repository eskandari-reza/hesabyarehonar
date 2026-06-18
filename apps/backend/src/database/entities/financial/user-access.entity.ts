import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tbl_user_access')
export class UserAccess {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ name: 'user_gp_id', type: 'int', nullable: true })
  userGpId: number | null;

  @Column({ name: 'permission_id', type: 'int', nullable: true })
  permissionId: number | null;

  @Column({ name: 'Center_Branch_Satatus', type: 'smallint', nullable: true })
  centerBranchSatatus: number | null;

  @Column({ name: 'del', type: 'boolean', nullable: true })
  del: boolean | null;

  @Column({ name: 'cui', type: 'int', nullable: true })
  cui: number | null;

  @Column({ name: 'cdt', type: 'timestamp', nullable: true })
  cdt: Date | null;

  @Column({ name: 'uui', type: 'int', nullable: true })
  uui: number | null;

  @Column({ name: 'udt', type: 'timestamp', nullable: true })
  udt: Date | null;

  @Column({ name: 'dui', type: 'int', nullable: true })
  dui: number | null;

  @Column({ name: 'ddt', type: 'timestamp', nullable: true })
  ddt: Date | null;
}
