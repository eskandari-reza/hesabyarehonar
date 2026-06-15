"use client";

import { useState } from "react";
import { domains, defaultDomainId } from "@/config/navigation";
import { Sidebar } from "@/components/ui/Sidebar";
import { DomainSwitcher } from "@/components/ui/DomainSwitcher";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [activeDomainId, setActiveDomainId] = useState(defaultDomainId);

  return (
    <div dir="rtl" className="flex h-screen flex-col">
      <header className="sticky top-0 z-30 bg-linear-to-l from-primary-600 via-primary-500 to-accent-500 px-6 py-4 shadow-card">
        <div className="flex items-center justify-between gap-4">

          {/* راست: لوگوی سیستم */}
          <div className="flex flex-1 items-center justify-start gap-3">
            <span className="text-2xl">🎨</span>
            <h1 className="text-xl font-bold text-white">حسابیار هنر</h1>
            <span className="flex items-center gap-1 rounded-full bg-white/95 px-4 py-1.5 text-sm font-bold text-primary-700 shadow-card">
              ✨ مدیریت هنری
            </span>
          </div>

          {/* وسط: سوییچرهای دامنه */}
          <div className="flex flex-1 items-center justify-center">
            <DomainSwitcher
              domains={domains}
              activeDomainId={activeDomainId}
              onDomainChange={setActiveDomainId}
            />
          </div>

          {/* چپ: آیتم‌های ناوبری + پروفایل */}
          <div className="flex flex-1 items-center justify-end gap-3">
            <span className="flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-sm font-bold text-emerald-600 shadow-card">
              ✅ ۱۲ فاکتور
            </span>
            <span className="flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-sm font-bold text-primary-700 shadow-card">
              📚 ۳۴۰ محصول
            </span>
            {/* عکس پروفایل */}
            <div className="h-9 w-9 overflow-hidden rounded-full border-2 border-white/80 bg-white/20">
              <img src="/avatar.png" alt="پروفایل" className="h-full w-full object-cover" />
            </div>
          </div>

        </div>
      </header>

      <div className="flex flex-1 overflow-hidden" dir="rtl">
        <Sidebar domains={domains} activeDomainId={activeDomainId} />
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}
