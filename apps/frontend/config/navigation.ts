import {
  Settings, FileText, Receipt, Building2, Calculator,
  Warehouse, Landmark, ShoppingCart, Tag, Store,
  LayoutDashboard, Package, Users, Megaphone,
  ServerCog, BarChart3, HelpCircle, Home,
  DatabaseBackup, Database, Calendar, FileX, Trash2,
  PhoneIncoming, MessageSquare, List, Printer, Info,
  Boxes, Wallet, CreditCard, Coins, UserCog, BadgePercent,
  Banknote, Layers, Map, Building, Upload, Ruler,
  TrendingUp, TrendingDown, ClipboardList,
  FilePlus, ListChecks, Settings2, BookOpen, Table2, Tags, DoorOpen, Network,
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

const definitionsMenu: NavItem = {
  id: "definitions",
  title: "تعاریف",
  icon: FileText,
  children: [
    { id: "products-services", title: "لیست کالا و خدمات", icon: Package, href: "/accounting/definitions/products-services", children: [] },
    { id: "auto-optic-coding", title: "ایجاد اتوماتیک کدینگ اپتیک", icon: Boxes, href: "/accounting/definitions/auto-optic-coding", children: [] },
    { id: "price-change", title: "تغییر قیمت کالاها", icon: Tag, href: "/accounting/definitions/price-change", children: [] },
    {
      id: "subsidiary-accounts",
      title: "حساب‌های معین",
      icon: Wallet,
      children: [
        { id: "counterparties", title: "لیست طرف حساب‌ها", icon: Users, href: "/accounting/definitions/subsidiary/counterparties", children: [] },
        { id: "cash-boxes", title: "لیست صندوق‌ها", icon: Wallet, href: "/accounting/definitions/subsidiary/cash-boxes", children: [] },
        { id: "bank-accounts", title: "لیست حساب‌های بانکی", icon: CreditCard, href: "/accounting/definitions/subsidiary/bank-accounts", children: [] },
        { id: "petty-cash", title: "لیست تنخواه گردان‌ها", icon: Coins, href: "/accounting/definitions/subsidiary/petty-cash", children: [] },
        { id: "shareholders", title: "لیست سهامداران", icon: Users, href: "/accounting/definitions/subsidiary/shareholders", children: [] },
        { id: "personnel", title: "لیست پرسنل", icon: UserCog, href: "/accounting/definitions/subsidiary/personnel", children: [] },
        { id: "expenses", title: "لیست هزینه‌ها", icon: Receipt, href: "/accounting/definitions/subsidiary/expenses", children: [] },
        { id: "services", title: "لیست خدمات", icon: BadgePercent, href: "/accounting/definitions/subsidiary/services", children: [] },
        { id: "import-subsidiary", title: "ایمپورت حساب‌های معین", icon: Upload, href: "/accounting/definitions/subsidiary/import", children: [] },
      ],
    },
    { id: "warehouses", title: "لیست انبار", icon: Warehouse, href: "/accounting/definitions/warehouses", children: [] },
    { id: "vat-groups", title: "گروه‌های مالیات بر ارزش افزوده", icon: Receipt, href: "/accounting/definitions/vat-groups", children: [] },
    { id: "sale-price-list", title: "لیست قیمت فروش", icon: Tag, href: "/accounting/definitions/sale-price-list", children: [] },
    {
      id: "base-definitions",
      title: "تعاریف پایه",
      icon: Layers,
      children: [
        { id: "units", title: "لیست واحدها", icon: Ruler, href: "/accounting/definitions/base/units", children: [] },
        { id: "banks", title: "لیست بانک‌ها", icon: Banknote, href: "/accounting/definitions/base/banks", children: [] },
        { id: "packaging", title: "لیست بسته‌بندی کالاها", icon: Boxes, href: "/accounting/definitions/base/packaging", children: [] },
        { id: "provinces", title: "لیست استان‌ها", icon: Map, href: "/accounting/definitions/base/provinces", children: [] },
        { id: "cities", title: "لیست شهرها", icon: Building, href: "/accounting/definitions/base/cities", children: [] },
        { id: "cash-box-cards", title: "تعریف کارت‌های صندوق", icon: CreditCard, href: "/accounting/definitions/base/cash-box-cards", children: [] },
      ],
    },
  ],
};

const taxMenu: NavItem = {
  id: "tax",
  title: "مالیات",
  icon: Receipt,
  children: [
    { id: "tax-seasonal-sales", title: "گزارش فصلی فروش", icon: TrendingUp, href: "/accounting/tax/seasonal-sales-report", children: [] },
    { id: "tax-seasonal-purchase", title: "گزارش فصلی خرید", icon: TrendingDown, href: "/accounting/tax/seasonal-purchase-report", children: [] },
  ],
};

const assetsMenu: NavItem = {
  id: "assets",
  title: "اموال و دارائی",
  icon: Building2,
  children: [
    { id: "assets-list", title: "لیست اموال و دارائی ثابت", icon: ClipboardList, href: "/accounting/assets/list", children: [] },
    {
      id: "assets-reports",
      title: "گزارشات",
      icon: BarChart3,
      children: [
        { id: "assets-report", title: "گزارش دارایی‌ها و اموال", icon: ClipboardList, href: "/accounting/assets/report", children: [] },
        { id: "assets-inventory-report", title: "گزارش موجودی دارایی و اموال", icon: Package, href: "/accounting/assets/inventory-report", children: [] },
      ],
    },
  ],
};

const accountingMenu: NavItem = {
  id: "accounting",
  title: "حسابداری",
  icon: Calculator,
  children: [
    { id: "issue-voucher", title: "صدور سند حسابداری", icon: FilePlus, href: "/accounting/voucher/new", children: [] },
    {
      id: "voucher-list",
      title: "لیست اسناد",
      icon: ListChecks,
      children: [
        { id: "manual-vouchers", title: "اسناد دستی", href: "/accounting/vouchers/manual", children: [] },
        { id: "opening-vouchers", title: "اسناد افتتاحیه", href: "/accounting/vouchers/opening", children: [] },
        { id: "closing-vouchers", title: "اسناد اختتامیه", href: "/accounting/vouchers/closing", children: [] },
        { id: "all-vouchers", title: "کلیه اسناد", href: "/accounting/vouchers/all", children: [] },
      ],
    },
    {
      id: "voucher-operations",
      title: "عملیات اسناد",
      icon: Settings2,
      children: [
        { id: "insert-between", title: "درج بین اسناد", href: "/accounting/operations/insert", children: [] },
        { id: "sort-by-date", title: "مرتب کردن اسناد بر اساس تاریخ", href: "/accounting/operations/sort", children: [] },
        { id: "delete-empty-numbers", title: "حذف شماره‌های خالی", href: "/accounting/operations/delete-empty", children: [] },
        { id: "change-voucher-status", title: "تغییر وضعیت اسناد", href: "/accounting/operations/status", children: [] },
        { id: "change-sign-status", title: "تغییر وضعیت امضاء اسناد", href: "/accounting/operations/sign-status", children: [] },
      ],
    },
    {
      id: "opening-closing",
      title: "عملیات افتتاحیه و اختتامیه",
      icon: DoorOpen,
      children: [
        { id: "opening-doc", title: "سند افتتاحیه", href: "/accounting/opening-closing/opening", children: [] },
        { id: "closing-doc", title: "سند اختتامیه", href: "/accounting/opening-closing/closing", children: [] },
      ],
    },
    {
      id: "ledgers",
      title: "دفاتر",
      icon: BookOpen,
      children: [
        { id: "journal", title: "دفتر روزنامه", href: "/accounting/ledgers/journal", children: [] },
        { id: "general-ledger", title: "دفتر کل", href: "/accounting/ledgers/general", children: [] },
        { id: "subsidiary-ledger", title: "دفتر معین", href: "/accounting/ledgers/subsidiary", children: [] },
        { id: "detail-ledger", title: "دفتر تفصیل", href: "/accounting/ledgers/detail", children: [] },
      ],
    },
    {
      id: "financial-tables",
      title: "جداول مالی",
      icon: Table2,
      children: [
        { id: "trial-balance", title: "ترازنامه", href: "/accounting/tables/balance-sheet", children: [] },
        { id: "trial-2col", title: "تراز آزمایشی دو ستونی", href: "/accounting/tables/trial-2col", children: [] },
        { id: "trial-4col", title: "تراز آزمایشی چهار ستونی", href: "/accounting/tables/trial-4col", children: [] },
        { id: "trial-8col", title: "تراز آزمایشی هشت ستونی", href: "/accounting/tables/trial-8col", children: [] },
        { id: "trial-hierarchical", title: "تراز آزمایشی سلسله مراتبی", href: "/accounting/tables/trial-hierarchical", children: [] },
      ],
    },
    {
      id: "acc-definitions",
      title: "تعاریف",
      icon: Tags,
      children: [
        { id: "accounts-tree", title: "نمودار درختی حساب‌ها", icon: Network, href: "/accounting/definitions/accounts-tree", children: [] },
        { id: "detail-accounts", title: "تفصیلی", icon: Layers, href: "/accounting/definitions/detail", children: [] },
        { id: "descriptions-list", title: "لیست توضیحات", icon: FileText, href: "/accounting/definitions/descriptions", children: [] },
      ],
    },
  ],
};

const accountingItems: NavItem[] = [
  systemMenu,
  definitionsMenu,
  taxMenu,
  assetsMenu,
  accountingMenu,
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