import {
  Settings, FileText, Receipt, Building2, Calculator,
  Warehouse, Landmark, ShoppingCart, Tag, Store,
  LayoutDashboard, Package, Users, Megaphone,
  ServerCog, BarChart3, HelpCircle, Home,
  DatabaseBackup, Database, Calendar, FileX, Trash2,
  PhoneIncoming, MessageSquare, List, Printer, Info,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  id: string;
  title: string;
  icon?: LucideIcon;
  href?: string;
  action?: string;
  children: NavItem[];
}

export interface Domain {
  id: string;
  title: string;
  icon: LucideIcon;
  items: NavItem[];
}

const homeItems: NavItem[] = [
  { id: "userprofile", title: "پروفایل کابری", icon: Store, children: [] },
  { id: "usersettings", title: "تنظیمات", icon: Store, children: [] },
];

const systemMenu: NavItem = {
  id: "system",
  title: "سیستم",
  icon: Settings,
  children: [
    { id: "backup", title: "پشتیبان‌گیری", icon: DatabaseBackup, action: "open-backup", children: [] },
    { id: "restore", title: "بازیابی اطلاعات", icon: Database, action: "open-restore", children: [] },
    {
      id: "settings",
      title: "تنظیمات نرم‌افزار",
      icon: Settings,
      children: [
        { id: "organizations", title: "لیست سازمان‌ها", href: "/accounting/system/settings/organizations", children: [] },
        { id: "forms-display", title: "نحوه نمایش فرم‌ها", href: "/accounting/system/settings/forms-display", children: [] },
        { id: "initial-settings", title: "تنظیمات اولیه", href: "/accounting/system/settings/initial", children: [] },
        { id: "admin-panel-settings", title: "تنظیمات پنل مدیریتی", href: "/accounting/system/settings/admin-panel", children: [] },
        { id: "network-settings", title: "تنظیمات شبکه", href: "/accounting/system/settings/network", children: [] },
        { id: "sms-settings", title: "تنظیمات ارسال پیام کوتاه", href: "/accounting/system/settings/sms", children: [] },
        { id: "sms-admin-settings", title: "تنظیمات ارسال پیام کوتاه (مدیریتی)", href: "/accounting/system/settings/sms-admin", children: [] },
      ],
    },
    {
      id: "fiscal-year",
      title: "عملیات سال مالی",
      icon: Calendar,
      children: [
        { id: "change-year", title: "تغییر سال مالی", href: "/accounting/system/fiscal-year/change", children: [] },
        { id: "new-year", title: "ایجاد سال مالی جدید", href: "/accounting/system/fiscal-year/new", children: [] },
        { id: "transfer-coding", title: "انتقال کدینگ و تعاریف", href: "/accounting/system/fiscal-year/transfer-coding", children: [] },
        { id: "carry-balance", title: "نقل مانده پایان سال", href: "/accounting/system/fiscal-year/carry-balance", children: [] },
      ],
    },
    {
      id: "users",
      title: "کاربران",
      icon: Users,
      children: [
        { id: "users-list", title: "لیست کاربران سیستم", href: "/accounting/system/users/list", children: [] },
        { id: "users-groups", title: "گروه‌بندی کاربران", href: "/accounting/system/users/groups", children: [] },
        { id: "users-activity", title: "عملکرد کاربران", href: "/accounting/system/users/activity", children: [] },
      ],
    },
    { id: "deleted-docs", title: "لیست برگه‌های حذف‌شده", icon: FileX, href: "/accounting/system/deleted-docs", children: [] },
    { id: "deleted-items", title: "لیست آیتم‌های حذف‌شده", icon: Trash2, href: "/accounting/system/deleted-items", children: [] },
    { id: "incoming-calls", title: "تماس‌های دریافتی", icon: PhoneIncoming, href: "/accounting/system/incoming-calls", children: [] },
    { id: "send-sms", title: "ارسال پیامک", icon: MessageSquare, action: "open-send-sms", children: [] },
    { id: "sent-sms-list", title: "لیست پیامک‌های ارسالی", icon: List, href: "/accounting/system/sent-sms", children: [] },
    { id: "print-message", title: "ارسال پیام با پرینتر", icon: Printer, action: "open-print-message", children: [] },
    { id: "calculator", title: "ماشین حساب", icon: Calculator, action: "open-calculator", children: [] },
    { id: "about", title: "اطلاعات نرم‌افزار", icon: Info, action: "open-about", children: [] },
  ],
};

const accountingItems: NavItem[] = [
  systemMenu,
  { id: "definitions", title: "تعاریف", icon: FileText, children: [] },
  { id: "tax", title: "مالیات", icon: Receipt, children: [] },
  { id: "assets", title: "اموال و دارائی", icon: Building2, children: [] },
  { id: "accounting", title: "حسابداری", icon: Calculator, children: [] },
  { id: "warehouse", title: "مدیریت انبار", icon: Warehouse, children: [] },
  { id: "treasury", title: "خزانه‌داری", icon: Landmark, children: [] },
  { id: "purchase", title: "خرید", icon: ShoppingCart, children: [] },
  { id: "sales", title: "فروش", icon: Tag, children: [] },
];

const storeItems: NavItem[] = [
  { id: "dashboard", title: "داشبورد", icon: LayoutDashboard, children: [] },
  { id: "catalog", title: "کاتالوگ", icon: Package, children: [] },
  { id: "sales", title: "فروش", icon: ShoppingCart, children: [] },
  { id: "customers", title: "مشتریان", icon: Users, children: [] },
  { id: "promotions", title: "تبلیغات و تخفیف", icon: Megaphone, children: [] },
  { id: "content-management", title: "مدیریت محتوا", icon: FileText, children: [] },
  { id: "configuration", title: "تنظیمات", icon: Settings, children: [] },
  { id: "system", title: "سیستم", icon: ServerCog, children: [] },
  { id: "reports", title: "گزارش‌ها", icon: BarChart3, children: [] },
  { id: "help", title: "راهنما", icon: HelpCircle, children: [] },
];

export const domains: Domain[] = [
  { id: "home", title: "خانه", icon: Home, items: homeItems },
  { id: "accounting", title: "حسابداری", icon: Calculator, items: accountingItems },
  { id: "store", title: "فروشگاه", icon: Store, items: storeItems },
];

export const defaultDomainId = "home";
export const homeDomain = domains.find((d) => d.id === "home")!;
export const switcherDomains = domains;
