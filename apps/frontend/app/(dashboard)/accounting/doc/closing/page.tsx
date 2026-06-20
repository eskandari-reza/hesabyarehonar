'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DocForm } from '@/app/(dashboard)/accounting/doc/DocForm';
import type { DocFormData } from '@/app/(dashboard)/accounting/doc/types';

export default function ClosingDocPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleSave = async (data: DocFormData, continueEditing: boolean) => {
    setError(null);
    try {
      const res = await fetch('/api/accounting/doc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, docType: 'closing' }),
      });

      if (!res.ok) {
        throw new Error('خطا در ذخیره سند');
      }

      if (continueEditing) {
        router.refresh();
      } else {
        router.push('/accounting/doc');
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'خطای ناشناخته');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">سند اختتامیه</h1>
      {error && (
        <div className="mb-4 rounded-md bg-destructive/10 p-3 text-destructive">
          {error}
        </div>
      )}
      <DocForm onSave={handleSave} />
    </div>
  );
}
