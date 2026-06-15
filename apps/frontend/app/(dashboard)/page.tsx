export default function HomePage() {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="rounded-3xl bg-linier-to-l from-primary-50 to-accent-50 p-8 shadow-sm">
        <h2 className="text-3xl font-bold text-primary-700">
          خوش آمدید به حسابیار هنر
        </h2>
        <p className="mt-3 text-slate-600">
          از منوی سمت راست می‌توانید به بخش‌های مختلف دسترسی پیدا کنید.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          { title: "حسابداری", desc: "دفتر کل، اسناد و گزارش‌ها", color: "from-primary-500 to-primary-600" },
          { title: "فروشگاه", desc: "محصولات و سفارش‌ها", color: "from-accent-500 to-accent-600" },
          { title: "گزارش‌ها", desc: "تحلیل مالی و فروش", color: "from-emerald-500 to-emerald-600" },
        ].map((c) => (
          <div
            key={c.title}
            className="cursor-pointer rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className={`mb-3 h-10 w-10 rounded-xl bg-linier-to-br ${c.color}`} />
            <h3 className="font-bold text-slate-800">{c.title}</h3>
            <p className="mt-1 text-sm text-slate-500">{c.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
