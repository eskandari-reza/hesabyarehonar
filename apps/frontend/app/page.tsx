import { Sidebar } from "../components/ui/Sidebar";

export default function HomePage() {
  return (
    <div className="flex gap-6 h-[calc(100vh-120px)]">
      {/* Sidebar */}
      <Sidebar />

      {/* محتوای اصلی */}
      <div className="flex-1 card-hover p-8 overflow-hidden relative">
        {/* تزیین گرادیانی گوشه */}
        <div className="absolute -top-16 -left-16 w-48 h-48 rounded-full bg-linear-to-br from-accent-400/20 to-teal-400/20 blur-2xl" />

        <h2 className="text-3xl font-bold text-gradient mb-3 relative">
          خوش آمدید به حسابیار هنر
        </h2>
        <p className="text-primary-900/70 text-lg relative">
          از منوی سمت راست می‌توانید به بخش‌های مختلف دسترسی پیدا کنید.
        </p>
      </div>
    </div>
  );
}
