"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { switcherDomains, homeDomain } from "@/config/navigation";
import { DomainSwitcher } from "@/components/ui/DomainSwitcher";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const activeDomainId = pathname.split("/")[1] || null;

  const activeDomain =
    switcherDomains.find((d) => d.id === activeDomainId) ?? null;

  const isHome = activeDomain?.id === homeDomain.id;

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
          <aside className="w-64 border-l overflow-y-auto p-4 flex flex-col">
            <nav className="space-y-1 flex-1">
              {activeDomain.items.map((item) => {
                const Icon = item.icon;
                // در دامنه home لینک‌ها مستقیم به ریشه‌ی مسیر می‌روند،
                // در غیر این صورت به صورت /<domain>/<item> ساخته می‌شوند.
                const href = isHome
                  ? `/${item.id}`
                  : `/${activeDomain.id}/${item.id}`;

                const isActive =
                  pathname === href || pathname.startsWith(`${href}/`);

                return (
                  <Link
                    key={item.id}
                    href={href}
                    className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${
                      isActive
                        ? "bg-primary-100 text-primary-700"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.title}
                  </Link>
                );
              })}
            </nav>

            {/* بخش پروفایل کاربر فقط در دامنه‌ی home نمایش داده می‌شود */}
            {isHome && (
              <div className="mt-4 border-t pt-4">
                {/* <UserProfile /> */}
              </div>
            )}
          </aside>
        )}

        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
