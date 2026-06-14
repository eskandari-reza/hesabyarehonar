import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // ریشهٔ Turbopack رو به ریشهٔ monorepo اشاره می‌دیم
  turbopack: {
    root: path.resolve(__dirname, "../.."),
  },
  // متمرکز کردن خروجی بیلد داخل خود frontend
  distDir: ".next",
};

export default nextConfig;
