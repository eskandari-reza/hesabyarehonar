import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tbl_user_GP')
export class UserGp {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ name: 'code', type: 'int', nullable: true })
  code: number | null;

  @Column({ name: 'name', type: 'varchar', length: 50, nullable: true })
  name: string | null;

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
