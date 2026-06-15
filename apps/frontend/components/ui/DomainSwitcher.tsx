"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Domain } from "@/config/navigation";

interface DomainSwitcherProps {
  domains: Domain[];
}

export function DomainSwitcher({ domains }: DomainSwitcherProps) {
  const pathname = usePathname();
  const activeDomainId = pathname.split("/")[1] || null;
  console.log("activeDomainId:", activeDomainId);


  return (
    <div className="flex gap-2">
      {domains.map((domain) => {
        const Icon = domain.icon;
        const isActive = domain.id === activeDomainId;

        return (
          <Link
            key={domain.id}
            href={`/${domain.id}`}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              isActive
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <Icon className="h-4 w-4" />
            {domain.title}
          </Link>
        );
      })}
    </div>
  );
}
