import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tbl_vat_gp')
export class VatGp {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ name: 'code', type: 'int', nullable: true })
  code: number | null;

  @Column({ name: 'name', type: 'varchar', length: 50, nullable: true })
  name: string | null;

  @Column({ name: 'name2', type: 'varchar', length: 50, nullable: true })
  name2: string | null;

  @Column({ name: 'defalt', type: 'boolean', nullable: true })
  defalt: boolean | null;

  @Column({ name: 'vat', type: 'real', nullable: true })
  vat: number | null;

  @Column({ name: 'Complications', type: 'real', nullable: true })
  complications: number | null;

  @Column({ name: 'del', type: 'boolean', nullable: true })
  del: boolean | null;

  @Column({ name: 'cui', type: 'int' })
  cui: number;

  @Column({ name: 'cdt', type: 'timestamp' })
  cdt: Date;

  @Column({ name: 'uui', type: 'int', nullable: true })
  uui: number | null;

  @Column({ name: 'udt', type: 'timestamp', nullable: true })
  udt: Date | null;

  @Column({ name: 'dui', type: 'int', nullable: true })
  dui: number | null;

  @Column({ name: 'ddt', type: 'timestamp', nullable: true })
  ddt: Date | null;
}
