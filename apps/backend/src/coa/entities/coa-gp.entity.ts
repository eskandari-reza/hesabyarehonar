import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('tbl_coa_gp')
export class CoaGp {
  @PrimaryGeneratedColumn() id: number;
  @Column({ type: 'int', nullable: true }) type_id: number;
  @Column({ type: 'int', nullable: true }) parent_id: number;
  @Column({ type: 'varchar', length: 50, nullable: true }) code: string;
  @Column({ type: 'varchar', length: 100, nullable: true }) name: string;
  @Column({ type: 'text', nullable: true }) desc: string;
  @Column({ type: 'boolean', nullable: true }) del: boolean;
  @Column({ type: 'int' }) cui: number;
  @Column({ type: 'timestamp' }) cdt: Date;
  @Column({ type: 'int', nullable: true }) uui: number;
  @Column({ type: 'timestamp', nullable: true }) udt: Date;
  @Column({ type: 'int', nullable: true }) dui: number;
  @Column({ type: 'timestamp', nullable: true }) ddt: Date;
}
