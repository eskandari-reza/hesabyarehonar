"use client";

import { ChevronDown, ChevronLeft } from "lucide-react";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { Domain, NavItem } from "@/config/navigation";

interface SidebarProps {
  domains: Domain[];
  activeDomainId: string;
  onAction?: (action: string) => void;
}

export function Sidebar({ domains, activeDomainId, onAction }: SidebarProps) {
  const [openItems, setOpenItems] = useState<string[]>([]);
  const router = useRouter();
  const pathname = usePathname();

  const activeDomain = domains.find((d) => d.id === activeDomainId);

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleClick = (item: NavItem) => {
    const hasChildren = item.children && item.children.length > 0;

    if (hasChildren) {
      toggleItem(item.id);
      return;
    }
    if (item.action) {
      onAction?.(item.action);
      return;
    }
    if (item.href) {
      router.push(item.href);
    }
  };

  const renderNavItem = (item: NavItem, depth = 0) => {
    const isOpen = openItems.includes(item.id);
    const hasChildren = item.children && item.children.length > 0;
    const Icon = item.icon;
    const isActive = item.href ? pathname === item.href : false;

    return (
      <div key={item.id}>
        <button
          onClick={() => handleClick(item)}
          className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-gray-100 ${
            isActive ? "bg-gray-100 font-medium text-blue-600" : ""
          }`}
          style={{ paddingRight: `${depth * 1 + 0.75}rem` }}
        >
          {Icon && <Icon className="h-4 w-4 shrink-0" />}
          <span className="flex-1 text-right">{item.title}</span>
          {hasChildren && (
            <div className="shrink-0">
              {isOpen ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </div>
          )}
        </button>

        {hasChildren && isOpen && (
          <div className="mt-1">
            {item.children.map((child) => renderNavItem(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  if (!activeDomain) return null;

  return (
    <aside className="w-64 border-l bg-gray-50 p-4">
      <nav className="space-y-1">
        {activeDomain.items.map((item) => renderNavItem(item))}
      </nav>
    </aside>
  );
}

export default Sidebar;
