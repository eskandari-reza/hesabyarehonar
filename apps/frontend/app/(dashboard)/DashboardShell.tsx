"use client";

import { usePathname } from "next/navigation";
import { switcherDomains } from "@/config/navigation";
import { DomainSwitcher } from "@/components/ui/DomainSwitcher";
import { Sidebar } from "@/components/ui/Sidebar";
import { ThemeSwitcher } from "@/app/components/ThemeSwitcher";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const activeDomainId = pathname.split("/")[1] || null;

  const activeDomain =
    switcherDomains.find((d) => d.id === activeDomainId) ?? null;

  return (
    <div className="flex h-screen flex-col bg-background text-foreground">
      <header className="flex items-center border-b border-border bg-card px-4 py-3">
        <div className="flex-1 flex justify-start" />

        <div className="flex-1 flex justify-center">
          <DomainSwitcher domains={switcherDomains} />
        </div>

        <div className="flex-1 flex justify-end">
          <ThemeSwitcher />
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {activeDomain && (
          <Sidebar domains={switcherDomains} activeDomainId={activeDomain.id} />
        )}

        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
