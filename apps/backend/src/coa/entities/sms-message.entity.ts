import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tbl_sms_message')
export class SmsMessage {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ name: 'frmName', type: 'varchar', length: 70, nullable: true })
  frmName: string | null;

  @Column({ name: 'SaveOrEdit', type: 'varchar', length: 10, nullable: true })
  saveOrEdit: string | null;

  @Column({ name: 'Message', type: 'text', nullable: true })
  message: string | null;

  @Column({ name: 'SendMode', type: 'varchar', length: 10, nullable: true })
  sendMode: string | null;

  @Column({ name: 'SendDay', type: 'int', nullable: true })
  sendDay: number | null;

  @Column({ name: 'SandTime', type: 'timestamp', nullable: true })
  sandTime: Date | null;

  @Column({ name: 'DayOfWeek', type: 'varchar', length: 20, nullable: true })
  dayOfWeek: string | null;

  @Column({ name: 'OnOrOff', type: 'boolean', nullable: true })
  onOrOff: boolean | null;

  @Column({ name: 'cui', type: 'int', nullable: true })
  cui: number | null;

  @Column({ name: 'cdt', type: 'timestamp', nullable: true })
  cdt: Date | null;

  @Column({ name: 'uui', type: 'int', nullable: true })
  uui: number | null;

  @Column({ name: 'udt', type: 'timestamp', nullable: true })
  udt: Date | null;
}
