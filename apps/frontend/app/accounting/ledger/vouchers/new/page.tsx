// apps/frontend/app/accounting/ledger/vouchers/new/page.tsx
export default function NewVoucherPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-800">صدور سند حسابداری</h1>
        <p className="text-sm text-neutral-500 mt-1">
          ایجاد سند حسابداری جدید
        </p>
      </div>

      <div className="bg-white rounded-xl border border-neutral-200 p-6">
        <p className="text-neutral-600">فرم صدور سند در حال ساخت است…</p>
      </div>
    </div>
  );
}
