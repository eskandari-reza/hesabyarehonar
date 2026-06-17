import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('tbl_user_permission')
export class UserPermission {
  // در SQL این ستون int NOT NULL بود (نه IDENTITY)، پس مقدارش دستی ست می‌شود
  @PrimaryColumn({ type: 'int' })
  id: number;

  @Column({ name: 'permissions_title', type: 'varchar', length: 100, nullable: true })
  permissionsTitle: string | null;

  @Column({ name: 'parent_id', type: 'int', nullable: true })
  parentId: number | null;

  @Column({ name: 'frm_name', type: 'varchar', length: 50, nullable: true })
  frmName: string | null;

  @Column({ name: 'permissions', type: 'varchar', length: 100, nullable: true })
  permissions: string | null;
}
