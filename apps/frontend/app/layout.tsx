import "./globals.css";
import type { Metadata } from "next";
import { Vazirmatn, Geist } from "next/font/google";
import { ThemeProvider } from "@/app/contexts/ThemeContext";
import { ThemeScript } from "@/app/components/ThemeScript";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-vazirmatn",
  display: "swap",
});

export const metadata: Metadata = {
  title: "حسابیار هنر",
  description: "سیستم جامع مدیریت مجموعه هنری",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" className={cn("font-sans", geist.variable)} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className="bg-background text-foreground">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
