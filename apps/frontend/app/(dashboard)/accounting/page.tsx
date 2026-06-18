"use client";

import { useEffect, useState } from "react";
import { Account } from "./accounts-tree/mock-data";
import { buildTree, AccountNode } from "./accounts-tree/tree-utils";
import { TreeNode } from "./accounts-tree/TreeNode";

// سال‌های مالی در دسترس (بعداً می‌تونه از API بیاد)
const FINANCIAL_YEARS = [1401,1402, 1403, 1404, 1405];
const DEFAULT_YEAR = 1405;

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:3000";

export default function AccountingPage() {
  const [year, setYear] = useState<number>(DEFAULT_YEAR);
  const [tree, setTree] = useState<AccountNode[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchAccounts() {
      setLoading(true);
      setError(null);
      
      try {
        // سال مالی به‌صورت query parameter ارسال می‌شود (طبق FinancialYearGuard)
        const res = await fetch(`${API_BASE}/coa?year=${year}`, {
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) {
          throw new Error(`خطا در دریافت داده‌ها (${res.status})`);
        }

        const data: Account[] = await res.json();
        
        if (!cancelled) {
          setTree(buildTree(data));
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "خطای ناشناخته");
          setTree([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchAccounts();
    
    return () => {
      cancelled = true; // جلوگیری از set state روی کامپوننت unmount شده
    };
  }, [year]);

  return (
    <div>
      {/* بخش انتخاب سال مالی */}
      <div className="flex items-center gap-3 mb-6">
        <label htmlFor="financial-year" className="font-medium">
          سال مالی:
        </label>
        <select
          id="financial-year"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className="border rounded-md px-3 py-2 bg-white dark:bg-gray-800"
        >
          {FINANCIAL_YEARS.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>

      {/* محتوای اصلی */}
      <h1 className="text-2xl font-bold">داشبورد حسابداری</h1>
      <p className="text-gray-600 dark:text-gray-400 mt-2">
        درخت حساب‌ها (سال مالی {year}):
      </p>

      {loading && (
        <p className="mt-4 text-gray-500">در حال بارگذاری…</p>
      )}

      {error && (
        <p className="mt-4 text-red-600 dark:text-red-400">{error}</p>
      )}

      {!loading && !error && (
        <ul className="mt-4">
          {tree.map((node) => (
            <TreeNode key={node.id} node={node} />
          ))}
        </ul>
      )}
    </div>
  );
}
