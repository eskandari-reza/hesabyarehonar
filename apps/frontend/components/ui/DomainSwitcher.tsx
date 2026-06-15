"use client";

import type { Domain } from "@/config/navigation";

interface DomainSwitcherProps {
  domains: Domain[];
  activeDomainId: string;
  onDomainChange: (id: string) => void;
}

export function DomainSwitcher({
  domains,
  activeDomainId,
  onDomainChange,
}: DomainSwitcherProps) {
  return (
    <div className="flex gap-2">
      {domains.map((domain) => {
        const Icon = domain.icon;
        const isActive = domain.id === activeDomainId;

        return (
          <button
            key={domain.id}
            onClick={() => onDomainChange(domain.id)}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              isActive
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <Icon className="h-4 w-4" />
            {domain.title}
          </button>
        );
      })}
    </div>
  );
}
