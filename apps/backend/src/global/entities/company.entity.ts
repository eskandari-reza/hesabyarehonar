import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('tbl_company')
export class Company {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  compani_name: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  modir_name: string;

  @Column({ type: 'varchar', length: 15, nullable: true })
  mobile: string;

  @Column({ type: 'varchar', length: 15, nullable: true })
  mobile2: string;

  @Column({ type: 'varchar', length: 15, nullable: true })
  tell: string;

  @Column({ type: 'varchar', length: 15, nullable: true })
  tell2: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  province: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  city: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  address: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  economic_code: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  kargah_no: string;

  @Column({ type: 'varchar', length: 15, nullable: true })
  code_posti: string;

  @Column({ type: 'varchar', length: 30, nullable: true })
  record_no: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  reports_header1: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  reports_header2: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  reports_header3: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  reports_footer1: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  reports_footer2: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  reports_footer3: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  webService_UserName: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  webService_Password: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  Behsashe_Key: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  webService_Number: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  HowSend: string;

  @Column({ type: 'boolean', nullable: true })
  del: boolean;

  @Column({ type: 'int', nullable: true })
  cui: number;

  @Column({ type: 'timestamp', nullable: true })
  cdt: Date;

  @Column({ type: 'int', nullable: true })
  uui: number;

  @Column({ type: 'timestamp', nullable: true })
  udt: Date;

  @Column({ type: 'int', nullable: true })
  dui: number;

  @Column({ type: 'timestamp', nullable: true })
  ddt: Date;

  @Column({ type: 'double precision', nullable: true })
  lat: number;

  @Column({ type: 'double precision', nullable: true })
  lng: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  tax_id: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  UserName: string;

  @Column({ type: 'text', nullable: true })
  PrivateKey: string;

  @Column({ type: 'boolean', nullable: true })
  IsSandBox: boolean;

  @Column({ type: 'smallint', nullable: true })
  tax_type: number;

  @Column({ type: 'int', nullable: true })
  sbc: number;
}
