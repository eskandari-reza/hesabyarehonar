import {
    Settings, FileText, Receipt, Building2, Calculator,
    Warehouse, Landmark, ShoppingCart, Tag, Store,
    LayoutDashboard, Package, Users, Megaphone,
    ServerCog, BarChart3, HelpCircle, Home,
    DatabaseBackup, Database, Calendar, FileX, Trash2,
    PhoneIncoming, MessageSquare, List, Printer, Info,
    Boxes, Wallet, CreditCard, Coins, UserCog, BadgePercent,
    Banknote, Layers, Map, Building, Upload, Ruler,
    TrendingUp, TrendingDown, ClipboardList, ClipboardCheck,
    FilePlus, ListChecks, Settings2, BookOpen, Table2, Tags, DoorOpen, Network,
    ArrowLeftRight, FileMinus, RotateCcw, PackageOpen, Search, Grid3x3, LayoutGrid,
    Activity, ArrowRightLeft, AlertTriangle, Ban,
    ArrowDownToLine, ArrowUpFromLine, FileCheck, History, BadgeCheck,
    Undo2, CheckCheck, CornerDownLeft, FileBarChart, BookCopy,
    ReceiptText, FileSpreadsheet, HandCoins, Scale, PlusCircle, MinusCircle,
    CalendarClock, UserMinus, UserPlus, BookText, Hash,
    CalendarDays, Table, Clock, MoreHorizontal, Percent,
    FileWarning, ShoppingBag, Zap, FileClock, Truck, UserCheck, Save,
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

// ─── Home ────────────────────────────────────────────────────────────────────

const homeItems: NavItem[] = [
    { id: "userprofile", title: "پروفایل کابری", icon: Store, children: [] },
    { id: "usersettings", title: "تنظیمات", icon: Store, children: [] },
];

// ─── System ──────────────────────────────────────────────────────────────────

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

// ─── Definitions ─────────────────────────────────────────────────────────────

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

// ─── Tax ─────────────────────────────────────────────────────────────────────

const taxMenu: NavItem = {
    id: "tax",
    title: "مالیات",
    icon: Receipt,
    children: [
        { id: "tax-seasonal-sales", title: "گزارش فصلی فروش", icon: TrendingUp, href: "/accounting/tax/seasonal-sales-report", children: [] },
        { id: "tax-seasonal-purchase", title: "گزارش فصلی خرید", icon: TrendingDown, href: "/accounting/tax/seasonal-purchase-report", children: [] },
    ],
};

// ─── Assets ──────────────────────────────────────────────────────────────────

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

// ─── Accounting ──────────────────────────────────────────────────────────────

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

// ─── Inventory ───────────────────────────────────────────────────────────────

const inventoryMenu: NavItem = {
    id: "inventory",
    title: "مدیریت انبار",
    icon: Warehouse,
    children: [
        { id: "inv-transfer", title: "انتقال بین انبارها", icon: ArrowLeftRight, href: "/inventory/transfer", children: [] },
        { id: "inv-consumption", title: "حواله مصرف و ضایعات و فقدان", icon: FileMinus, href: "/inventory/consumption", children: [] },
        { id: "inv-count", title: "شمارش انبار", icon: ClipboardCheck, href: "/inventory/count", children: [] },
        { id: "inv-stocktaking", title: "انبارگردانی", icon: RotateCcw, href: "/inventory/stocktaking", children: [] },
        { id: "inv-label-print", title: "چاپ لیبل", icon: Printer, href: "/inventory/label-print", children: [] },
        { id: "inv-opening", title: "موجودی اول دوره انبار", icon: PackageOpen, href: "/inventory/opening-stock", children: [] },
        { id: "inv-search-slips", title: "جستجو در برگه‌های انبار", icon: Search, href: "/inventory/search-slips", children: [] },
        {
            id: "inv-reports",
            title: "گزارشات",
            icon: BarChart3,
            children: [
                { id: "rep-stock-balances", title: "گزارش موجودی‌های انبار", icon: Boxes, href: "/inventory/reports/stock-balances", children: [] },
                { id: "rep-item-card", title: "کارت کالا", icon: CreditCard, href: "/inventory/reports/item-card", children: [] },
                { id: "rep-matrix-items", title: "ماتریس کالاها و انبارها", icon: Grid3x3, href: "/inventory/reports/matrix-items", children: [] },
                { id: "rep-matrix-optic", title: "ماتریس موجودی اپتیک", icon: LayoutGrid, href: "/inventory/reports/matrix-optic", children: [] },
                { id: "rep-stock-inquiry", title: "استعلام موجودی", icon: HelpCircle, href: "/inventory/reports/stock-inquiry", children: [] },
                { id: "rep-turnover", title: "گزارش گردش انبار", icon: Activity, href: "/inventory/reports/turnover", children: [] },
                { id: "rep-consumption", title: "گزارش مصرف و ضایعات و فقدان", icon: TrendingDown, href: "/inventory/reports/consumption", children: [] },
                { id: "rep-transfers", title: "گزارش نقل و انتقال بین انبارها", icon: ArrowRightLeft, href: "/inventory/reports/transfers", children: [] },
                { id: "rep-below-reorder", title: "گزارش کالاهای زیر نقطه سفارش", icon: AlertTriangle, href: "/inventory/reports/below-reorder", children: [] },
                { id: "rep-no-transaction", title: "گزارش کالاهای بدون تراکنش", icon: Ban, href: "/inventory/reports/no-transaction", children: [] },
            ],
        },
        { id: "inv-import-opening", title: "ایمپورت اول دوره انبار", icon: Upload, href: "/inventory/import-opening", children: [] },
    ],
};

// ─── Treasury ────────────────────────────────────────────────────────────────

const treasuryMenu: NavItem = {
    id: "treasury",
    title: "خزانه‌داری",
    icon: Wallet,
    children: [
        { id: "trs-receive", title: "دریافت", icon: ArrowDownToLine, href: "/treasury/receive", children: [] },
        { id: "trs-payment", title: "پرداخت", icon: ArrowUpFromLine, href: "/treasury/payment", children: [] },
        {
            id: "trs-receivable",
            title: "اسناد دریافتنی (چک اشخاص)",
            icon: FileCheck,
            children: [
                { id: "trs-rcv-history", title: "تاریخچه چک‌های دریافتنی", icon: History, href: "/treasury/receivable/history", children: [] },
                { id: "trs-rcv-collect", title: "وصول اسناد دریافتنی", icon: BadgeCheck, href: "/treasury/receivable/collect", children: [] },
                { id: "trs-rcv-return", title: "برگشت اسناد دریافتنی", icon: Undo2, href: "/treasury/receivable/return", children: [] },
                { id: "trs-rcv-assign-bank", title: "واگذاری چک اشخاص به بانک", icon: Landmark, href: "/treasury/receivable/assign-bank", children: [] },
                { id: "trs-rcv-collect-assigned", title: "وصول چک‌های واگذاری به بانک", icon: CheckCheck, href: "/treasury/receivable/collect-assigned", children: [] },
                { id: "trs-rcv-return-assigned", title: "برگشت چک‌های واگذاری‌شده به بانک", icon: RotateCcw, href: "/treasury/receivable/return-assigned", children: [] },
                { id: "trs-rcv-spent-returned", title: "اسناد دریافتی خرج‌شده برگشتی", icon: FileX, href: "/treasury/receivable/spent-returned", children: [] },
                { id: "trs-rcv-spent-to-cash", title: "اسناد خرج‌شده برگشتی به صندوق", icon: CornerDownLeft, href: "/treasury/receivable/spent-to-cash", children: [] },
                { id: "trs-rcv-rep-incoming", title: "گزارش چک‌های وارده", icon: FileText, href: "/treasury/receivable/reports/incoming", children: [] },
                { id: "trs-rcv-rep-assigned", title: "گزارش چک‌های واگذاری‌شده به بانک", icon: FileBarChart, href: "/treasury/receivable/reports/assigned", children: [] },
            ],
        },
        {
            id: "trs-payable",
            title: "اسناد پرداختنی (چک شرکت)",
            icon: FileMinus,
            children: [
                { id: "trs-pay-history", title: "تاریخچه چک‌های پرداختنی", icon: History, href: "/treasury/payable/history", children: [] },
                { id: "trs-pay-define-book", title: "تعریف دسته چک", icon: BookCopy, href: "/treasury/payable/define-checkbook", children: [] },
                { id: "trs-pay-collect", title: "وصول اسناد پرداختنی", icon: BadgeCheck, href: "/treasury/payable/collect", children: [] },
                { id: "trs-pay-return", title: "برگشت اسناد پرداختنی", icon: Undo2, href: "/treasury/payable/return", children: [] },
                { id: "trs-pay-report", title: "گزارش اسناد پرداختنی", icon: FileText, href: "/treasury/payable/report", children: [] },
            ],
        },
        { id: "trs-expense", title: "برگ هزینه", icon: ReceiptText, href: "/treasury/expense", children: [] },
        { id: "trs-service-invoice", title: "فاکتور خدمات", icon: FileSpreadsheet, href: "/treasury/service-invoice", children: [] },
        { id: "trs-bank-transfer", title: "نقل و انتقال بین حساب‌های بانکی", icon: ArrowRightLeft, href: "/treasury/bank-transfer", children: [] },
        { id: "trs-cash-settlement", title: "تسویه صندوق", icon: HandCoins, href: "/treasury/cash-settlement", children: [] },
        {
            id: "trs-cash-adjustment",
            title: "تعدیل صندوق",
            icon: Scale,
            children: [
                { id: "trs-adj-surplus", title: "فزونی صندوق", icon: PlusCircle, href: "/treasury/adjustment/surplus", children: [] },
                { id: "trs-adj-shortage", title: "کسری صندوق", icon: MinusCircle, href: "/treasury/adjustment/shortage", children: [] },
                { id: "trs-adj-report", title: "گزارش کسری و فزونی صندوق", icon: FileBarChart, href: "/treasury/adjustment/report", children: [] },
            ],
        },
        {
            id: "trs-opening",
            title: "عملیات اول دوره",
            icon: CalendarClock,
            children: [
                { id: "trs-op-debtors", title: "اول دوره بدهکاران", icon: UserMinus, href: "/treasury/opening/debtors", children: [] },
                { id: "trs-op-creditors", title: "اول دوره بستانکاران", icon: UserPlus, href: "/treasury/opening/creditors", children: [] },
                { id: "trs-op-person-checks", title: "چک‌های اول دوره اشخاص", icon: FileCheck, href: "/treasury/opening/person-checks", children: [] },
                { id: "trs-op-company-checks", title: "چک‌های اول دوره شرکت", icon: FileMinus, href: "/treasury/opening/company-checks", children: [] },
                { id: "trs-op-import-debtors", title: "ایمپورت اول دوره بدهکاران", icon: Upload, href: "/treasury/opening/import-debtors", children: [] },
                { id: "trs-op-import-creditors", title: "ایمپورت اول دوره بستانکاران", icon: Upload, href: "/treasury/opening/import-creditors", children: [] },
            ],
        },
        {
            id: "trs-reports",
            title: "گزارشات خزانه‌داری",
            icon: BarChart3,
            children: [
                { id: "trs-rep-ledger", title: "دفاتر معین", icon: BookOpen, href: "/treasury/reports/ledger", children: [] },
                { id: "trs-rep-journal", title: "دفتر روزنامه", icon: BookText, href: "/treasury/reports/journal", children: [] },
                {
                    id: "trs-rep-expense",
                    title: "گزارشات برگه‌های هزینه",
                    icon: ReceiptText,
                    children: [
                        { id: "trs-rep-exp-coding", title: "گزارش هزینه به تفکیک کدینگ", icon: Hash, href: "/treasury/reports/expense/by-coding", children: [] },
                        { id: "trs-rep-exp-party", title: "گزارش هزینه به تفکیک طرف هزینه", icon: Users, href: "/treasury/reports/expense/by-party", children: [] },
                        { id: "trs-rep-exp-slip", title: "گزارش هزینه به تفکیک برگه هزینه", icon: FileText, href: "/treasury/reports/expense/by-slip", children: [] },
                        { id: "trs-rep-exp-month", title: "گزارش هزینه به تفکیک ماه", icon: CalendarDays, href: "/treasury/reports/expense/by-month", children: [] },
                    ],
                },
                { id: "trs-rep-service", title: "گزارش فاکتور خدمات", icon: FileSpreadsheet, href: "/treasury/reports/service-invoice", children: [] },
                { id: "trs-rep-receive-slips", title: "گزارش برگه‌های دریافت", icon: ArrowDownToLine, href: "/treasury/reports/receive-slips", children: [] },
                { id: "trs-rep-payment-slips", title: "گزارش برگه‌های پرداخت", icon: ArrowUpFromLine, href: "/treasury/reports/payment-slips", children: [] },
                { id: "trs-rep-debtors", title: "لیست بدهکاران", icon: UserMinus, href: "/treasury/reports/debtors", children: [] },
                { id: "trs-rep-creditors", title: "لیست بستانکاران", icon: UserPlus, href: "/treasury/reports/creditors", children: [] },
                { id: "trs-rep-financial-tables", title: "جداول مالی", icon: Table, href: "/treasury/reports/financial-tables", children: [] },
                { id: "trs-rep-debtors-last-receive", title: "گزارش بدهکاران بر اساس آخرین دریافت", icon: Clock, href: "/treasury/reports/debtors-last-receive", children: [] },
                { id: "trs-rep-cash-bank-balance", title: "موجودی صندوق و بانک", icon: Banknote, href: "/treasury/reports/cash-bank-balance", children: [] },
            ],
        },
        {
            id: "trs-batch",
            title: "عملیات گروهی",
            icon: Layers,
            children: [
                { id: "trs-batch-debtors", title: "بدهکاری گروهی", icon: Users, href: "/treasury/batch/debtors", children: [] },
            ],
        },
        {
            id: "trs-list",
            title: "لیست",
            icon: List,
            children: [
                { id: "trs-list-payment", title: "لیست برگه‌های پرداخت", icon: ArrowUpFromLine, href: "/treasury/list/payment", children: [] },
                { id: "trs-list-expense", title: "لیست برگه‌های هزینه", icon: ReceiptText, href: "/treasury/list/expense", children: [] },
                { id: "trs-list-service", title: "لیست فاکتور خدمات", icon: FileSpreadsheet, href: "/treasury/list/service-invoice", children: [] },
            ],
        },
        {
            id: "trs-misc",
            title: "عملیات متفرقه",
            icon: MoreHorizontal,
            children: [
                { id: "trs-misc-bank-interest", title: "محاسبه سود بانکی", icon: Percent, href: "/treasury/misc/bank-interest", children: [] },
            ],
        },
    ],
};

// ─── Purchase ────────────────────────────────────────────────────────────────

const purchaseMenu: NavItem = {
    id: "purchase",
    title: "خرید",
    icon: ShoppingCart,
    children: [
        { id: "pur-invoice", title: "فاکتور خرید", icon: FileText, href: "/purchase/invoice", children: [] },
        { id: "pur-return", title: "مرجوعی خرید", icon: Undo2, href: "/purchase/return", children: [] },
        {
            id: "pur-reports",
            title: "گزارشات خرید",
            icon: BarChart3,
            children: [
                { id: "pur-rep-by-invoice", title: "گزارش خرید به تفکیک فاکتور", icon: FileText, href: "/purchase/reports/by-invoice", children: [] },
                { id: "pur-rep-by-party", title: "گزارش خرید به تفکیک طرف‌حساب", icon: Users, href: "/purchase/reports/by-party", children: [] },
                { id: "pur-rep-by-product", title: "گزارش خرید به تفکیک کالا", icon: Package, href: "/purchase/reports/by-product", children: [] },
                { id: "pur-rep-by-month", title: "گزارش خرید به تفکیک ماه", icon: CalendarDays, href: "/purchase/reports/by-month", children: [] },
                { id: "pur-rep-by-day", title: "گزارش خرید به تفکیک روز", icon: CalendarClock, href: "/purchase/reports/by-day", children: [] },
                { id: "pur-rep-unsettled", title: "گزارش فاکتورهای تسویه‌نشده", icon: FileWarning, href: "/purchase/reports/unsettled", children: [] },
            ],
        },
        {
            id: "pur-list",
            title: "لیست",
            icon: List,
            children: [
                { id: "pur-list-invoices", title: "لیست فاکتورهای خرید", icon: FileText, href: "/purchase/list/invoices", children: [] },
                { id: "pur-list-returns", title: "لیست فاکتورهای مرجوعی خرید", icon: Undo2, href: "/purchase/list/returns", children: [] },
            ],
        },
    ],
};

// ─── Sales ───────────────────────────────────────────────────────────────────

const salesMenu: NavItem = {
    id: "sales",
    title: "فروش",
    icon: ShoppingBag,
    children: [
        { id: "sal-invoice", title: "فاکتور فروش", icon: FileText, href: "/sales/invoice", children: [] },
        { id: "sal-quick", title: "فروش سریع", icon: Zap, href: "/sales/quick", children: [] },
        { id: "sal-tracking", title: "رأس‌گیری فاکتور", icon: Calculator, href: "/sales/tracking", children: [] },
        { id: "sal-proforma", title: "پیش‌فاکتور فروش", icon: FileClock, href: "/sales/proforma", children: [] },
        { id: "sal-return", title: "مرجوعی فروش", icon: Undo2, href: "/sales/return", children: [] },
        {
            id: "sal-reports",
            title: "گزارشات فروش",
            icon: BarChart3,
            children: [
                { id: "sal-rep-by-invoice", title: "گزارش فروش به تفکیک فاکتور", icon: FileText, href: "/sales/reports/by-invoice", children: [] },
                { id: "sal-rep-by-party", title: "گزارش فروش به تفکیک طرف‌حساب", icon: Users, href: "/sales/reports/by-party", children: [] },
                { id: "sal-rep-by-product", title: "گزارش فروش به تفکیک کالا", icon: Package, href: "/sales/reports/by-product", children: [] },
                { id: "sal-rep-by-month", title: "گزارش فروش به تفکیک ماه", icon: CalendarDays, href: "/sales/reports/by-month", children: [] },
                { id: "sal-rep-by-day", title: "گزارش فروش به تفکیک روز", icon: CalendarClock, href: "/sales/reports/by-day", children: [] },
                { id: "sal-rep-delivery", title: "گزارش حواله تجمیعی فروش", icon: Truck, href: "/sales/reports/delivery", children: [] },
                { id: "sal-rep-summary-user", title: "گزارش خلاصه فروش کاربران", icon: UserCheck, href: "/sales/reports/summary-by-user", children: [] },
                { id: "sal-rep-stats", title: "آمار فروش", icon: TrendingUp, href: "/sales/reports/stats", children: [] },
                { id: "sal-rep-price-list", title: "لیست قیمت", icon: Tag, href: "/sales/reports/price-list", children: [] },
                { id: "sal-rep-unsettled", title: "گزارش فاکتورهای تسویه‌نشده", icon: FileWarning, href: "/sales/reports/unsettled", children: [] },
            ],
        },
        {
            id: "sal-list",
            title: "لیست",
            icon: List,
            children: [
                { id: "sal-list-invoices", title: "لیست فاکتورهای فروش", icon: FileText, href: "/sales/list/invoices", children: [] },
                { id: "sal-list-quick", title: "لیست فاکتورهای فروش سریع", icon: Zap, href: "/sales/list/quick", children: [] },
                { id: "sal-list-proforma", title: "لیست پیش‌فاکتورها", icon: FileClock, href: "/sales/list/proforma", children: [] },
                { id: "sal-list-returns", title: "لیست فاکتورهای مرجوعی فروش", icon: Undo2, href: "/sales/list/returns", children: [] },
                { id: "sal-list-draft", title: "لیست فاکتورهای ذخیره‌شده موقت", icon: Save, href: "/sales/list/draft", children: [] },
            ],
        },
    ],
};

// ─── accountingItems ──────────────────────────────────────────────────────────

const accountingItems: NavItem[] = [
    systemMenu,
    definitionsMenu,
    taxMenu,
    assetsMenu,
    accountingMenu,
    inventoryMenu,
    treasuryMenu,
    purchaseMenu,
    salesMenu,
];

// ─── Store ───────────────────────────────────────────────────────────────────

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

// ─── Domains ─────────────────────────────────────────────────────────────────

export const domains: Domain[] = [
    { id: "home", title: "خانه", icon: Home, items: homeItems },
    { id: "accounting", title: "حسابداری", icon: Calculator, items: accountingItems },
    { id: "store", title: "فروشگاه", icon: Store, items: storeItems },
];

export const defaultDomainId = "home";
export const homeDomain = domains.find((d) => d.id === "home")!;
export const switcherDomains = domains;
