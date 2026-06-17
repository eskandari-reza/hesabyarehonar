import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tbl_sms')
export class Sms {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ name: 'sendNumber', type: 'varchar', length: 20, nullable: true })
  sendNumber: string | null;

  @Column({ name: 'massage', type: 'text', nullable: true })
  massage: string | null;

  @Column({ name: 'frm', type: 'varchar', length: 100, nullable: true })
  frm: string | null;

  @Column({ name: 'status', type: 'varchar', length: 30, nullable: true })
  status: string | null;

  @Column({ name: 'status_id', type: 'varchar', length: 50, nullable: true })
  statusId: string | null;

  @Column({ name: 'ofc_id', type: 'int', nullable: true })
  ofcId: number | null;

  @Column({ name: 'frmStatuse', type: 'varchar', length: 50, nullable: true })
  frmStatuse: string | null;

  @Column({ name: 'date', type: 'timestamp', nullable: true })
  date: Date | null;

  @Column({ name: 'tarikh', type: 'varchar', length: 20, nullable: true })
  tarikh: string | null;

  @Column({ name: 'SendOrRecive', type: 'varchar', length: 10, nullable: true })
  sendOrRecive: string | null;

  @Column({ name: 'cui', type: 'int', nullable: true })
  cui: number | null;
}
