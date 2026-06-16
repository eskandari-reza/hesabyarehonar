// هر حساب = یک ردیف در جدول tbl_coa
export interface Account {
  id: number;
  parentId: number | null;          // null = حساب ریشه (والد ندارد)
  code: string;                     // کد حساب
  name: string;                     // نام حساب
  detailed: boolean;                // آیا تفصیلی/برگ است؟
  balanceNature: "debit" | "credit"; // معادل blnc_nature
}

export const mockAccounts: Account[] = [
  { id: 1, parentId: null, code: "1",    name: "دارایی‌ها",          detailed: false, balanceNature: "debit"  },
  { id: 2, parentId: 1,    code: "11",   name: "دارایی جاری",        detailed: false, balanceNature: "debit"  },
  { id: 3, parentId: 2,    code: "1101", name: "صندوق",             detailed: true,  balanceNature: "debit"  },
  { id: 4, parentId: 2,    code: "1102", name: "بانک",              detailed: true,  balanceNature: "debit"  },
  { id: 5, parentId: null, code: "2",    name: "بدهی‌ها",           detailed: false, balanceNature: "credit" },
  { id: 6, parentId: 5,    code: "21",   name: "حساب‌های پرداختنی",  detailed: true,  balanceNature: "credit" },
];
