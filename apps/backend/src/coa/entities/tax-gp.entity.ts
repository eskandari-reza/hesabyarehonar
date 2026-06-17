import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tbl_tax_gp')
export class TaxGp {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ name: 'code', type: 'int', nullable: true })
  code: number | null;

  @Column({ name: 'name', type: 'varchar', length: 50, nullable: true })
  name: string | null;

  @Column({ name: 'defalt', type: 'boolean', nullable: true })
  defalt: boolean | null;

  @Column({ name: 'tax', type: 'real', nullable: true })
  tax: number | null;

  @Column({ name: 'avarez', type: 'real', nullable: true })
  avarez: number | null;

  @Column({ name: 'cui', type: 'int' })
  cui: number;

  @Column({ name: 'cdt', type: 'timestamp' })
  cdt: Date;

  @Column({ name: 'uui', type: 'int', nullable: true })
  uui: number | null;

  @Column({ name: 'udt', type: 'timestamp', nullable: true })
  udt: Date | null;
}
