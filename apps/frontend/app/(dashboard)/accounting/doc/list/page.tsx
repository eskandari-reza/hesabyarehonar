// apps/frontend/app/(dashboard)/accounting/doc/list/page.tsx
'use client';

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  listDocs,
  deleteDoc,
  ApiError,
  type Doc,
} from '@/app/(dashboard)/accounting/doc/api';
import {
  DOC_STATUS_OPTIONS,
  SIGNATURE_STATUS_OPTIONS,
  ISSUE_TYPE_OPTIONS,
} from '@/app/(dashboard)/accounting/doc/types';

// تبدیل کد به برچسب فارسی با استفاده از آرایه‌های آپشن types.ts
function labelOf(
  options: ReadonlyArray<{ value: string | number; label: string }>,
  value: string | number,
): string {
  return options.find((o) => o.value === value)?.label ?? String(value);
}

// جمع بدهکار/بستانکار از ردیف‌های سند
function sumDoc(doc: Doc) {
  const totalDebit = doc.details.reduce((s, d) => s + (d.debit || 0), 0);
  const totalCredit = doc.details.reduce((s, d) => s + (d.credit || 0), 0);
  return { totalDebit, totalCredit };
}

const fmt = new Intl.NumberFormat('fa-IR');

export default function DocListPage() {
  const router = useRouter();

  const [docs, setDocs] = useState<Doc[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const data = await listDocs();
      setDocs(data);
    } catch (e) {
      setError(
        e instanceof ApiError ? e.message : 'خطا در دریافت فهرست اسناد',
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleDelete(id: string) {
    if (!confirm('این سند حذف شود؟ این عملیات قابل بازگشت نیست.')) return;
    setDeletingId(id);
    try {
      await deleteDoc(id);
      setDocs((prev) => prev.filter((d) => d.id !== id));
    } catch (e) {
      alert(e instanceof ApiError ? e.message : 'خطا در حذف سند');
    } finally {
      setDeletingId(null);
    }
  }

  // فیلتر ساده بر اساس شماره سند یا شرح
  const filtered = useMemo(() => {
    const q = search.trim();
    if (!q) return docs;
    return docs.filter(
      (d) =>
        String(d.docNumber).includes(q) ||
        (d.description ?? '').includes(q),
    );
  }, [docs, search]);

  return (
    <div className="p-6" dir="rtl">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">فهرست اسناد حسابداری</h1>
        <Link
          href="/accounting/doc/new"
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          سند جدید
        </Link>
      </div>

      <div className="mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="جستجو بر اساس شماره سند یا شرح..."
          className="w-full max-w-sm rounded border px-3 py-2"
        />
      </div>

      {loading && <p className="text-gray-500">در حال بارگذاری...</p>}

      {error && (
        <div className="mb-4 rounded bg-red-50 p-3 text-red-700">
          {error}{' '}
          <button onClick={load} className="underline">
            تلاش مجدد
          </button>
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <p className="text-gray-500">سندی یافت نشد.</p>
      )}

      {!loading && !error && filtered.length > 0 && (
        <div className="overflow-x-auto rounded border">
          <table className="w-full text-right text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-2 font-medium">شماره</th>
                <th className="px-3 py-2 font-medium">تاریخ</th>
                <th className="px-3 py-2 font-medium">شرح</th>
                <th className="px-3 py-2 font-medium">نوع صدور</th>
                <th className="px-3 py-2 font-medium">وضعیت</th>
                <th className="px-3 py-2 font-medium">امضا</th>
                <th className="px-3 py-2 font-medium">بدهکار</th>
                <th className="px-3 py-2 font-medium">بستانکار</th>
                <th className="px-3 py-2 font-medium">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((doc) => {
                const { totalDebit, totalCredit } = sumDoc(doc);
                const balanced = totalDebit === totalCredit;
                return (
                  <tr key={doc.id} className="border-t hover:bg-gray-50">
                    <td className="px-3 py-2">{doc.docNumber}</td>
                    <td className="px-3 py-2">{doc.docDate}</td>
                    <td className="px-3 py-2">{doc.description}</td>
                    <td className="px-3 py-2">
                      {labelOf(ISSUE_TYPE_OPTIONS as any, doc.issueType)}
                    </td>
                    <td className="px-3 py-2">
                      {labelOf(DOC_STATUS_OPTIONS as any, doc.docStatus)}
                    </td>
                    <td className="px-3 py-2">
                      {labelOf(
                        SIGNATURE_STATUS_OPTIONS as any,
                        doc.signatureStatus,
                      )}
                    </td>
                    <td className="px-3 py-2">{fmt.format(totalDebit)}</td>
                    <td className="px-3 py-2">
                      <span className={balanced ? '' : 'text-red-600'}>
                        {fmt.format(totalCredit)}
                      </span>
                    </td>
                    <td className="px-3 py-2">
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            router.push(`/accounting/doc/${doc.id}`)
                          }
                          className="text-blue-600 hover:underline"
                        >
                          ویرایش
                        </button>
                        <button
                          onClick={() => handleDelete(doc.id)}
                          disabled={deletingId === doc.id}
                          className="text-red-600 hover:underline disabled:opacity-50"
                        >
                          {deletingId === doc.id ? '...' : 'حذف'}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
