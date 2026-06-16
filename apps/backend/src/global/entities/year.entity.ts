import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('tbl_years')
export class Year {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'int', nullable: true })
  year: number;

  @Column({ type: 'int', nullable: true })
  company_id: number;
}
