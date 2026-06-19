// apps/api/src/coa/dto/coa-node.dto.ts

export class CoaNodeDto {
  id: number;
  parentId: number | null;
  code: string;
  name: string;
  detailed: boolean;
  balanceNature: "debit" | "credit"; // نگاشت از blnc_nature
}
