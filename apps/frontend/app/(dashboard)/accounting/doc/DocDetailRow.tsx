// apps/frontend/app/(dashboard)/accounting/doc/DocDetailRow.tsx

"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { DocDetail } from "./types";

interface DocDetailRowProps {
  detail: DocDetail;
  onChange: (rowNumber: number, field: keyof DocDetail, value: string | number) => void;
  onDelete: (rowNumber: number) => void;
  onCoaSelect: (rowNumber: number) => void;
}

export function DocDetailRow({ detail, onChange, onDelete, onCoaSelect }: DocDetailRowProps) {
  const formatNumber = (value: number): string => {
    return value === 0 ? '' : value.toLocaleString('fa-IR');
  };

  const parseNumber = (value: string): number => {
    if (!value) return 0;
    const cleaned = value.replace(/[,،]/g, '');
    const parsed = parseFloat(cleaned);
    return isNaN(parsed) ? 0 : parsed;
  };

  return (
    <tr className="border-b hover:bg-muted/50">
      <td className="p-2 text-center text-sm">{detail.rowNumber}</td>
      
      <td className="p-2">
        <div className="flex gap-1">
          <Input
            value={detail.coaCode}
            onChange={(e) => onChange(detail.rowNumber, 'coaCode', e.target.value)}
            onDoubleClick={() => onCoaSelect(detail.rowNumber)}
            className="h-8 text-center font-mono"
            placeholder="کد معین"
          />
        </div>
      </td>
      
      <td className="p-2">
        <Input
          value={detail.coaTitle}
          readOnly
          className="h-8 bg-muted/50 cursor-not-allowed"
          placeholder="عنوان معین"
        />
      </td>
      
      <td className="p-2">
        <Input
          value={detail.detailCode}
          onChange={(e) => onChange(detail.rowNumber, 'detailCode', e.target.value)}
          className="h-8 text-center font-mono"
          placeholder="کد تفصیلی"
        />
      </td>
      
      <td className="p-2">
        <Input
          value={detail.description}
          onChange={(e) => onChange(detail.rowNumber, 'description', e.target.value)}
          className="h-8"
          placeholder="شرح"
        />
      </td>
      
      <td className="p-2">
        <Input
          value={formatNumber(detail.debit)}
          onChange={(e) => onChange(detail.rowNumber, 'debit', parseNumber(e.target.value))}
          className="h-8 text-left font-mono"
          dir="ltr"
          placeholder="0"
        />
      </td>
      
      <td className="p-2">
        <Input
          value={formatNumber(detail.credit)}
          onChange={(e) => onChange(detail.rowNumber, 'credit', parseNumber(e.target.value))}
          className="h-8 text-left font-mono"
          dir="ltr"
          placeholder="0"
        />
      </td>
      
      <td className="p-2 text-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(detail.rowNumber)}
          className="h-8 w-8 p-0 text-destructive hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </td>
    </tr>
  );
}
