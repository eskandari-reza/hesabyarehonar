"use client";

import { ChevronDown, ChevronLeft, ChevronRight, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { Domain, NavItem } from "@/config/navigation";

interface SidebarProps {
  domains: Domain[];
  activeDomainId: string;
  onAction?: (action: string) => void;
}

export function Sidebar({ domains, activeDomainId, onAction }: SidebarProps) {
  const [openItems, setOpenItems] = useState<string[]>([]);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const activeDomain = domains.find((d) => d.id === activeDomainId);

  // Load collapse state from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("sidebar-collapsed");
    if (saved !== null) {
      setIsCollapsed(saved === "true");
    }
  }, []);

  // Save collapse state to localStorage
  const toggleCollapse = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem("sidebar-collapsed", String(newState));
    
    // Close all items when collapsing
    if (newState) {
      setOpenItems([]);
    }
  };

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleClick = (item: NavItem) => {
    const hasChildren = item.children && item.children.length > 0;

    if (hasChildren) {
      // If collapsed, expand sidebar first
      if (isCollapsed) {
        setIsCollapsed(false);
        localStorage.setItem("sidebar-collapsed", "false");
      }
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

    // Don't render children when collapsed
    if (depth > 0 && isCollapsed) return null;

    return (
      <div key={item.id}>
        <button
          onClick={() => handleClick(item)}
          className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors text-sidebar-foreground hover:bg-sidebar-hover ${
            isActive
              ? "bg-sidebar-active text-sidebar-active-foreground font-medium hover:bg-sidebar-active"
              : ""
          } ${isCollapsed ? "justify-center" : ""}`}
          style={
            isCollapsed
              ? undefined
              : { paddingRight: `${depth * 1 + 0.75}rem` }
          }
          title={isCollapsed ? item.title : undefined}
        >
          {Icon && <Icon className="h-4 w-4 shrink-0" />}
          {!isCollapsed && (
            <>
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
            </>
          )}
        </button>

        {hasChildren && isOpen && !isCollapsed && (
          <div className="mt-1">
            {item.children.map((child) => renderNavItem(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  if (!activeDomain) return null;

  return (
    <aside
      className={`flex h-screen flex-col border-l border-border bg-sidebar text-sidebar-foreground transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Toggle Button */}
      <div className="flex items-center justify-between border-b border-border p-4">
        {!isCollapsed && (
          <span className="text-sm font-medium text-sidebar-foreground">
            {activeDomain.title}
          </span>
        )}
        <button
          onClick={toggleCollapse}
          className="rounded-lg p-1.5 text-sidebar-foreground hover:bg-sidebar-hover transition-colors"
          title={isCollapsed ? "گسترش منو" : "جمع کردن منو"}
        >
          {isCollapsed ? (
            <ChevronLeft className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 min-h-0 space-y-1 overflow-y-auto p-4">
        {activeDomain.items.map((item) => renderNavItem(item))}
      </nav>
    </aside>
  );
}

export default Sidebar;
