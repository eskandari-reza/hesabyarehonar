
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, ChevronLeft, ChevronRight, Plus, Save, Printer } from "lucide-react";
import { DocDetailRow } from "./DocDetailRow";
import { 
  DocFormData, 
  DocDetail, 
  DocSummary,
  DOC_STATUS_OPTIONS,
  SIGNATURE_STATUS_OPTIONS,
  ISSUE_TYPE_OPTIONS 
} from "./types";

interface DocFormProps {
  initialData?: Partial<DocFormData>;
  onSave?: (data: DocFormData, continueEditing: boolean) => Promise<void>;
}

export function DocForm({ initialData, onSave }: DocFormProps) {
  const [formData, setFormData] = useState<DocFormData>({
    docNumber: initialData?.docNumber || 1,
    docDate: initialData?.docDate || new Date().toLocaleDateString('fa-IR'),
    referTo: initialData?.referTo || '',
    docStatus: initialData?.docStatus || 'temporary',
    signatureStatus: initialData?.signatureStatus || 'non-final',
    issueType: initialData?.issueType || 'manual',
    description: initialData?.description || '',
    autoDescription: initialData?.autoDescription || '',
    details: initialData?.details || [createEmptyDetail(1)],
  });

  const [summary, setSummary] = useState<DocSummary>(calculateSummary(formData.details));
  const [isSaving, setIsSaving] = useState(false);

  function createEmptyDetail(rowNumber: number): DocDetail {
    return {
      rowNumber,
      coaCode: '',
      coaTitle: '',
      detailCode: '',
      description: '',
      debit: 0,
      credit: 0,
    };
  }

  function calculateSummary(details: DocDetail[]): DocSummary {
    const totalDebit = details.reduce((sum, d) => sum + d.debit, 0);
    const totalCredit = details.reduce((sum, d) => sum + d.credit, 0);
    const coaCount = details.filter(d => d.coaCode).length;
    const detailCount = details.filter(d => d.detailCode).length;

    return {
      totalDebit,
      totalCredit,
      difference: totalDebit - totalCredit,
      coaCount,
      detailCount,
    };
  }

  useEffect(() => {
    setSummary(calculateSummary(formData.details));
  }, [formData.details]);

  const handleMasterFieldChange = (field: keyof DocFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleDetailChange = (rowNumber: number, field: keyof DocDetail, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      details: prev.details.map(detail =>
        detail.rowNumber === rowNumber
          ? { ...detail, [field]: value }
          : detail
      ),
    }));
  };

  const handleAddRow = () => {
    const newRowNumber = formData.details.length + 1;
    setFormData(prev => ({
      ...prev,
      details: [...prev.details, createEmptyDetail(newRowNumber)],
    }));
  };

  const handleDeleteRow = (rowNumber: number) => {
    if (formData.details.length === 1) return;
    
    setFormData(prev => ({
      ...prev,
      details: prev.details
        .filter(d => d.rowNumber !== rowNumber)
        .map((d, idx) => ({ ...d, rowNumber: idx + 1 })),
    }));
  };

  const handleCoaSelect = (rowNumber: number) => {
    // TODO: Open COA tree dialog
    console.log('Open COA selection for row:', rowNumber);
  };

  const handleSave = async (continueEditing: boolean = false) => {
    if (summary.difference !== 0) {
      alert('مغایرت باید صفر باشد');
      return;
    }

    setIsSaving(true);
    try {
      await onSave?.(formData, continueEditing);
    } finally {
      setIsSaving(false);
    }
  };

  const handlePrint = () => {
    console.log('Print document:', formData);
  };

  return (
    <div className="space-y-4">
      {/* Header Card */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">اطلاعات سند</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Doc Number */}
            <div className="space-y-2">
              <Label htmlFor="docNumber">شماره سند</Label>
              <div className="flex gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10"
                  onClick={() => handleMasterFieldChange('docNumber', formData.docNumber + 1)}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Input
                  id="docNumber"
                  type="number"
                  value={formData.docNumber}
                  onChange={(e) => handleMasterFieldChange('docNumber', parseInt(e.target.value) || 1)}
                  className="text-center font-mono"
                />
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10"
                  onClick={() => handleMasterFieldChange('docNumber', Math.max(1, formData.docNumber - 1))}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Doc Date */}
            <div className="space-y-2">
              <Label htmlFor="docDate">تاریخ</Label>
              <Input
                id="docDate"
                value={formData.docDate}
                onChange={(e) => handleMasterFieldChange('docDate', e.target.value)}
                placeholder="1405/03/24"
                className="text-center font-mono"
              />
            </div>

            {/* Refer To */}
            <div className="space-y-2">
              <Label htmlFor="referTo">عطف به</Label>
              <Input
                id="referTo"
                value={formData.referTo}
                onChange={(e) => handleMasterFieldChange('referTo', e.target.value)}
              />
            </div>

            {/* Doc Status */}
            <div className="space-y-2">
              <Label htmlFor="docStatus">وضعیت سند</Label>
              <Select
                value={formData.docStatus}
                onValueChange={(value) => handleMasterFieldChange('docStatus', value)}
              >
                <SelectTrigger id="docStatus">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {DOC_STATUS_OPTIONS.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Signature Status */}
            <div className="space-y-2">
              <Label htmlFor="signatureStatus">وضعیت امضا</Label>
              <Select
                value={formData.signatureStatus}
                onValueChange={(value) => handleMasterFieldChange('signatureStatus', value)}
              >
                <SelectTrigger id="signatureStatus">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SIGNATURE_STATUS_OPTIONS.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Issue Type */}
            <div className="space-y-2">
              <Label htmlFor="issueType">نوع صدور</Label>
              <Select
                value={formData.issueType}
                onValueChange={(value) => handleMasterFieldChange('issueType', value)}
              >
                <SelectTrigger id="issueType">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {ISSUE_TYPE_OPTIONS.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Description */}
            <div className="space-y-2 lg:col-span-2">
              <Label htmlFor="description">شرح</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleMasterFieldChange('description', e.target.value)}
                className="resize-none h-10"
                rows={1}
              />
            </div>
          </div>

          {/* Auto Description (Read-only) */}
          {formData.issueType === 'automatic' && (
            <div className="mt-4 space-y-2">
              <Label htmlFor="autoDescription">شرح سند اتوماتیک</Label>
              <Input
                id="autoDescription"
                value={formData.autoDescription}
                readOnly
                className="bg-muted/50 cursor-not-allowed"
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Details Table */}
      <Card>
        <CardHeader className="pb-3 flex flex-row items-center justify-between">
          <CardTitle className="text-lg">آرتیکل‌های سند</CardTitle>
          <Button onClick={handleAddRow} size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            افزودن ردیف
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 bg-muted/50">
                  <th className="p-2 text-sm font-semibold">ردیف</th>
                  <th className="p-2 text-sm font-semibold">کد معین</th>
                  <th className="p-2 text-sm font-semibold">عنوان معین</th>
                  <th className="p-2 text-sm font-semibold">کد تفصیلی</th>
                  <th className="p-2 text-sm font-semibold">شرح</th>
                  <th className="p-2 text-sm font-semibold">بدهکار</th>
                  <th className="p-2 text-sm font-semibold">بستانکار</th>
                  <th className="p-2 text-sm font-semibold">عملیات</th>
                </tr>
              </thead>
              <tbody>
                {formData.details.map(detail => (
                  <DocDetailRow
                    key={detail.rowNumber}
                    detail={detail}
                    onChange={handleDetailChange}
                    onDelete={handleDeleteRow}
                    onCoaSelect={handleCoaSelect}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Summary */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">کل :</span>
              <span className="font-semibold">{formData.details.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">معین :</span>
              <span className="font-semibold">{summary.coaCount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">تفصیلی :</span>
              <span className="font-semibold">{summary.detailCount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">جمع بدهکار :</span>
              <span className="font-semibold font-mono" dir="ltr">
                {summary.totalDebit.toLocaleString('fa-IR')}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">جمع بستانکار :</span>
              <span className="font-semibold font-mono" dir="ltr">
                {summary.totalCredit.toLocaleString('fa-IR')}
              </span>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">مغایرت :</span>
              <span 
                className={`font-bold text-lg font-mono ${
                  summary.difference === 0 
                    ? 'text-success' 
                    : 'text-destructive'
                }`}
                dir="ltr"
              >
                {summary.difference.toLocaleString('fa-IR')}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 justify-end">
        <Button
          onClick={handlePrint}
          variant="outline"
          className="gap-2 bg-orange-500 text-white hover:bg-orange-600 hover:text-white"
        >
          <Printer className="h-4 w-4" />
          چاپ (F9)
        </Button>
        <Button
          onClick={() => handleSave(false)}
          disabled={isSaving}
          className="gap-2 bg-blue-600 hover:bg-blue-700"
        >
          <Save className="h-4 w-4" />
          {isSaving ? 'در حال ذخیره...' : 'ذخیره (F2)'}
        </Button>
        <Button
          onClick={() => handleSave(true)}
          disabled={isSaving}
          className="gap-2 bg-green-600 hover:bg-green-700"
        >
          <Save className="h-4 w-4" />
          ذخیره و ادامه (F10)
        </Button>
      </div>
    </div>
  );
}
