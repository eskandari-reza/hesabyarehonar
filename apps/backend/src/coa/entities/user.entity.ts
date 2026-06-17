import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('tbl_user')
export class User {
  // id بدون IDENTITY است؛ مقدار دستی ست می‌شود
  @PrimaryColumn({ type: 'int' })
  id: number;

  @Column({ name: 'code', type: 'int', nullable: true })
  code: number | null;

  @Column({ name: 'name', type: 'varchar', length: 30, nullable: true })
  name: string | null;

  // desc کلمه‌ی رزرو SQL است؛ TypeORM آن را نقل‌قول می‌کند
  @Column({ name: 'desc', type: 'varchar', length: 300, nullable: true })
  desc: string | null;

  @Column({ name: 'user_name', type: 'varchar', length: 30, nullable: true })
  userName: string | null;

  @Column({ name: 'pass', type: 'varchar', length: 100, nullable: true })
  pass: string | null;

  @Column({ name: 'accesse_gp_id', type: 'int', nullable: true })
  accesseGpId: number | null;

  @Column({ name: 'defult_chash_id', type: 'int', nullable: true })
  defultChashId: number | null;

  @Column({ name: 'defult_depot_id', type: 'int', nullable: true })
  defultDepotId: number | null;

  @Column({ name: 'defult_payk_id', type: 'int', nullable: true })
  defultPaykId: number | null;

  @Column({ name: 'defult_ofc_id', type: 'int', nullable: true })
  defultOfcId: number | null;

  @Column({ name: 'defult_sale_ofc_id', type: 'int', nullable: true })
  defultSaleOfcId: number | null;

  @Column({ name: 'defult_client', type: 'varchar', length: 50, nullable: true })
  defultClient: string | null;

  @Column({ name: 'defult_bank', type: 'int', nullable: true })
  defultBnk: number | null;
  @Column({ name: 'defult_Cost_ofc', type: 'int', nullable: true })
  defultCostOfc: number | null;

@Column({ name: 'defult_Scales', type: 'int', nullable: true })

defultScales: number | null;

@Column({ name: 'EntitledTOReceive', type: 'boolean', nullable: true })

entitledToReceive: boolean | null;

@Column({ name: 'AllowedTOReception', type: 'boolean', nullable: true })

allowedToReception: boolean | null;

@Column({ name: 'DiscountLimit', type: 'real', nullable: true })

discountLimit: number | null;

@Column({ name: 'active', type: 'boolean', nullable: true })

active: boolean | null;

@Column({ name: 'company_id', type: 'int', nullable: true })

companyId: number | null;

@Column({ name: 'pas_save', type: 'boolean', nullable: true })

pasSave: boolean | null;

@Column({ name: 'personnel_id', type: 'int', nullable: true })

personnelId: number | null;

@Column({ name: 'Center_Branch_Satatus', type: 'smallint', nullable: true })

centerBranchSatatus: number | null;

@Column({ name: 'Branch_ID', type: 'smallint', nullable: true })

branchId: number | null;

@Column({ name: 'cui', type: 'int' })

cui: number;

@Column({ name: 'cdt', type: 'timestamp' })

cdt: Date;

@Column({ name: 'uui', type: 'int', nullable: true })

uui: number | null;

@Column({ name: 'udt', type: 'timestamp', nullable: true })

udt: Date | null;

@Column({ name: 'tablet_edit', type: 'boolean', nullable: true })

tabletEdit: boolean | null;

}