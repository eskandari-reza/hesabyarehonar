// apps/frontend/app/(dashboard)/accounting/doc/types.ts

export interface DocDetail {
  rowNumber: number;
  coaCode: string;
  coaTitle: string;
  detailCode: string;
  description: string;
  debit: number;
  credit: number;
}

export interface DocMaster {
  docNumber: number;
  docDate: string;
  referTo: string;
  docStatus: 'temporary' | 'final';
  signatureStatus: 'non-final' | 'final';
  issueType: 'manual' | 'automatic';
  description: string;
  autoDescription: string;
}

export interface DocFormData extends DocMaster {
  details: DocDetail[];
}

export interface DocSummary {
  totalDebit: number;
  totalCredit: number;
  difference: number;
  coaCount: number;
  detailCount: number;
}

export const DOC_STATUS_OPTIONS = [
  { value: 'temporary', label: 'موقت' },
  { value: 'final', label: 'قطعی' },
] as const;

export const SIGNATURE_STATUS_OPTIONS = [
  { value: 'non-final', label: 'غیر قطعی' },
  { value: 'final', label: 'قطعی' },
] as const;

export const ISSUE_TYPE_OPTIONS = [
  { value: 'manual', label: 'دستی' },
  { value: 'automatic', label: 'اتوماتیک' },
] as const;
