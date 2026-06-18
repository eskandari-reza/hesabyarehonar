"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { ChevronUp, ChevronDown } from "lucide-react";
import { switcherDomains } from "@/config/navigation";
import { DomainSwitcher } from "@/components/ui/DomainSwitcher";
import { Sidebar } from "@/components/ui/Sidebar";
import { ThemeSwitcher } from "@/app/components/ThemeSwitcher";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const activeDomainId = pathname.split("/")[1] || null;
  const [isTopbarCollapsed, setIsTopbarCollapsed] = useState(false);

  const activeDomain =
    switcherDomains.find((d) => d.id === activeDomainId) ?? null;

  useEffect(() => {
    const saved = localStorage.getItem("topbar-collapsed");
    if (saved) {
      setIsTopbarCollapsed(JSON.parse(saved));
    }
  }, []);

  const toggleTopbar = () => {
    setIsTopbarCollapsed((prev) => {
      const newState = !prev;
      localStorage.setItem("topbar-collapsed", JSON.stringify(newState));
      return newState;
    });
  };

  return (
    <div className="flex h-screen flex-col bg-background text-foreground">
      <header
        className={`
          flex items-center border-b border-border bg-card px-4
          transition-all duration-300
          ${isTopbarCollapsed ? "py-2" : "py-3"}
        `}
      >
        <div className="flex-1 flex justify-start">
          {isTopbarCollapsed && (
            <button
              onClick={toggleTopbar}
              className="p-2 rounded-lg hover:bg-accent transition-colors"
              title="باز کردن هدر"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          )}
        </div>

        {!isTopbarCollapsed && (
          <>
            <div className="flex-1 flex justify-center">
              <DomainSwitcher domains={switcherDomains} />
            </div>

            <div className="flex-1 flex justify-end gap-2">
              <ThemeSwitcher />
              <button
                onClick={toggleTopbar}
                className="p-2 rounded-lg hover:bg-accent transition-colors"
                title="بستن هدر"
              >
                <ChevronUp className="w-4 h-4" />
              </button>
            </div>
          </>
        )}

        {isTopbarCollapsed && (
          <div className="flex-1 flex justify-end" />
        )}
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
