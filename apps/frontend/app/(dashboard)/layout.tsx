// app/layout.tsx
import type { Metadata } from "next";
import { DashboardShell } from "@/app/(dashboard)/DashboardShell";
export const metadata: Metadata = {
  title: "حسابیار هنر",
  description: "داشبورد حسابداری و فروشگاه",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <DashboardShell>{children}</DashboardShell>
      </body>
    </html>
  );
}
