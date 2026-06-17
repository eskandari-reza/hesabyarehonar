import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tbl_windows_Setting')
export class WindowsSetting {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ name: 'name', type: 'varchar', length: 50 })
  name: string;

  @Column({ name: 'width', type: 'int' })
  width: number;

  @Column({ name: 'height', type: 'int' })
  height: number;

  @Column({ name: 'locationX', type: 'int', nullable: true })
  locationX: number | null;

  @Column({ name: 'locationY', type: 'int', nullable: true })
  locationY: number | null;

  @Column({ name: 'color1Argb', type: 'int', nullable: true })
  color1Argb: number | null;

  @Column({ name: 'color2Argb', type: 'int', nullable: true })
  color2Argb: number | null;

  @Column({ name: 'type', type: 'varchar', length: 50, nullable: true })
  type: string | null;

  @Column({ name: 'fontname', type: 'varchar', length: 50, nullable: true })
  fontname: string | null;

  @Column({ name: 'fontsize', type: 'varchar', length: 50, nullable: true })
  fontsize: string | null;

  @Column({ name: 'user_id', type: 'int', nullable: true })
  userId: number | null;
}
