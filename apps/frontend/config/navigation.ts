import { profile } from "console";
import {
  Settings, FileText, Receipt, Building2, Calculator,
  Warehouse, Landmark, ShoppingCart, Tag, Store,
  LayoutDashboard, Package, Users, Megaphone,
  ServerCog, BarChart3, HelpCircle,Home,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  id: string;
  title: string;
  icon: LucideIcon;
  children: NavItem[];
}

export interface Domain {
  id: string;
  title: string;
  icon: LucideIcon;
  items: NavItem[];
}
// آیتم‌های سایدبار صفحه home: دامنه‌های اختصاصی کاربر
const homeItems: NavItem[] = [
  { id: "userprofile", title: "پروفایل کابری", icon: Store, children: [] },
  { id: "usersettings",      title: "تنظیمات",  icon: Store,      children: [] },
];

const accountingItems: NavItem[] = [
  { id: "system",      title: "سیستم",         icon: Settings,     children: [] },
  { id: "definitions", title: "تعاریف",         icon: FileText,     children: [] },
  { id: "tax",         title: "مالیات",         icon: Receipt,      children: [] },
  { id: "assets",      title: "اموال و دارائی", icon: Building2,    children: [] },
  { id: "accounting",  title: "حسابداری",       icon: Calculator,   children: [] },
  { id: "warehouse",   title: "مدیریت انبار",   icon: Warehouse,    children: [] },
  { id: "treasury",    title: "خزانه‌داری",     icon: Landmark,     children: [] },
  { id: "purchase",    title: "خرید",           icon: ShoppingCart, children: [] },
  { id: "sales",       title: "فروش",           icon: Tag,          children: [] },
];

// آیتم‌های فروشگاه — دقیقاً مطابق ترتیب منوی پنل ادمین nopCommerce
const storeItems: NavItem[] = [
  { id: "dashboard",          title: "داشبورد",          icon: LayoutDashboard, children: [] },
  { id: "catalog",            title: "کاتالوگ",          icon: Package,         children: [] },
  { id: "sales",              title: "فروش",             icon: ShoppingCart,    children: [] },
  { id: "customers",          title: "مشتریان",          icon: Users,           children: [] },
  { id: "promotions",         title: "تبلیغات و تخفیف",  icon: Megaphone,       children: [] },
  { id: "content-management", title: "مدیریت محتوا",     icon: FileText,        children: [] },
  { id: "configuration",      title: "تنظیمات",          icon: Settings,        children: [] },
  { id: "system",             title: "سیستم",            icon: ServerCog,       children: [] },
  { id: "reports",            title: "گزارش‌ها",         icon: BarChart3,       children: [] },
  { id: "help",               title: "راهنما",           icon: HelpCircle,      children: [] },
];

export const domains: Domain[] = [
    {
    id: "home",
    title: "خانه",
    icon: Home,
    items: homeItems,
  },
  {
    id: "accounting",
    title: "حسابداری",
    icon: Calculator,
    items: accountingItems,
  },
  {
    id: "store",
    title: "فروشگاه",
    icon: Store,
    items: storeItems,
  },
];

export const defaultDomainId = "home";
export const homeDomain = domains.find((d) => d.id === "home")!;
export const switcherDomains = domains;