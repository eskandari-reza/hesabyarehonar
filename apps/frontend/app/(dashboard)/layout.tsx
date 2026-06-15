import type { Metadata } from "next";
import { DashboardShell } from "@/app/(dashboard)/DashboardShell";

export const metadata: Metadata = {
  title: "حسابیار هنر",
  description: "داشبورد حسابداری و فروشگاه",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardShell>{children}</DashboardShell>;
}
