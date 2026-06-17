import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('tbl_show_delete_form')
export class ShowDeleteForm {
  @PrimaryColumn({ type: 'int' })
  id: number;

  @Column({ name: 'show', type: 'boolean' })
  show: boolean;

  @Column({ name: 'sale', type: 'boolean' })
  sale: boolean;

  @Column({ name: 'buy', type: 'boolean' })
  buy: boolean;

  @Column({ name: 'treasury', type: 'boolean' })
  treasury: boolean;

  @Column({ name: 'inve', type: 'boolean' })
  inve: boolean;

  @Column({ name: 'salary', type: 'boolean' })
  salary: boolean;

  @Column({ name: 'production', type: 'boolean' })
  production: boolean;
}
