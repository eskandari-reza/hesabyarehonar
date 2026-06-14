"use client";
import { useState } from "react";
import {
  ChevronDown, ChevronLeft,
  Settings, Calculator, Landmark,
  Warehouse, ShoppingCart, Tag,
  type LucideIcon,
} from "lucide-react";
import clsx from "clsx";

type MenuChild = {
  id: string;
  label: string;
};

type MenuItem = {
  id: string;
  label: string;
  icon: LucideIcon;
  color: string;
  children: MenuChild[];
};

const MENU_ITEMS: MenuItem[] = [
  {
    id: "system",
    label: "سیستم",
    icon: Settings,
    color: "text-teal-500",
    children: [],
  },
  {
    id: "accounting",
    label: "حسابداری",
    icon: Calculator,
    color: "text-accent-500",
    children: [],
  },
  {
    id: "treasury",
    label: "خزانه‌داری",
    icon: Landmark,
    color: "text-primary-600",
    children: [],
  },
  {
    id: "warehouse",
    label: "مدیریت انبار",
    icon: Warehouse,
    color: "text-amber-500",
    children: [],
  },
  {
    id: "purchase",
    label: "خرید",
    icon: ShoppingCart,
    color: "text-success-500",
    children: [],
  },
  {
    id: "sales",
    label: "فروش",
    icon: Tag,
    color: "text-rose-500",
    children: [],
  },
];

export function Sidebar() {
  const [expanded, setExpanded] = useState<string[]>(["system"]);
  const [active, setActive] = useState<string>("");

  const toggle = (id: string) => {
    setExpanded((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <aside className="w-64 card p-0 h-full overflow-y-auto">
      <nav className="p-3 space-y-1">
        {MENU_ITEMS.map((item) => {
          const Icon = item.icon;
          const isExpanded = expanded.includes(item.id);
          const hasChildren = item.children.length > 0;

          return (
            <div key={item.id}>
              {/* آیتم اصلی */}
              <button
                onClick={() => hasChildren && toggle(item.id)}
                className={clsx(
                  "w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl",
                  "transition-colors text-right font-medium",
                  isExpanded
                    ? "bg-primary-50 text-primary-800"
                    : "hover:bg-primary-50/60 text-primary-900"
                )}
              >
                <Icon size={18} className={item.color} />
                <span className="flex-1 text-sm">{item.label}</span>
                {hasChildren &&
                  (isExpanded ? (
                    <ChevronDown size={16} className="text-primary-400" />
                  ) : (
                    <ChevronLeft size={16} className="text-primary-400" />
                  ))}
              </button>

              {/* زیرمنوها */}
              {isExpanded && hasChildren && (
                <div className="mr-7 mt-1 space-y-0.5 border-r-2 border-primary-100 pr-2">
                  {item.children.map((child) => (
                    <button
                      key={child.id}
                      onClick={() => setActive(child.id)}
                      className={clsx(
                        "w-full text-right px-3 py-2 text-sm rounded-lg transition-colors",
                        active === child.id
                          ? "bg-linear-to-l from-primary-600 to-accent-500 text-white shadow-card"
                          : "text-primary-900/70 hover:text-primary-700 hover:bg-primary-50"
                      )}
                    >
                      {child.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
