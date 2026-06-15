"use client";

import { usePathname } from "next/navigation";
import { switcherDomains, homeDomain } from "@/config/navigation";
import { DomainSwitcher } from "@/components/ui/DomainSwitcher";
import { Sidebar } from "@/components/ui/Sidebar";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const activeDomainId = pathname.split("/")[1] || null;

  const activeDomain =
    switcherDomains.find((d) => d.id === activeDomainId) ?? null;

  return (
    <div className="flex h-screen flex-col">
      <header className="flex items-center border-b px-4 py-3">
        <div className="flex-1 flex justify-start">
          {/* <Logo /> */}
        </div>

        <div className="flex-1 flex justify-center">
          <DomainSwitcher domains={switcherDomains} />
        </div>

        <div className="flex-1 flex justify-end">
          {/* <Profile /> */}
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {activeDomain && (
          <Sidebar
            domains={switcherDomains}
            activeDomainId={activeDomain.id}
          />
        )}

        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
