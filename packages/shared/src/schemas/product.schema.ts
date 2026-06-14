// packages/shared/src/schemas/product.schema.ts
import { z } from "zod";

/**
 * اسکیمای اعتبارسنجی محصول
 * منبع واحد حقیقت (Source of Truth) برای بک‌اند و فرانت‌اند
 */
export const ProductSchema = z.object({
  id: z.string().uuid(),
  name: z
    .string()
    .min(2, "نام محصول حداقل ۲ کاراکتر باشد")
    .max(120, "نام محصول طولانی است"),
  description: z.string().max(2000).optional(),
  // قیمت‌ها به ریال و به صورت عدد صحیح ذخیره می‌شوند
  price: z.number().int().nonnegative("قیمت نمی‌تواند منفی باشد"),
  stock: z.number().int().nonnegative().default(0),
  sku: z.string().min(1).optional(),
  isActive: z.boolean().default(true),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

/**
 * اسکیمای ساخت محصول جدید
 * فیلدهای که سرور تولید می‌کند حذف شده‌اند
 */
export const CreateProductSchema = ProductSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

/**
 * اسکیمای ویرایش محصول (همه فیلدها اختیاری)
 */
export const UpdateProductSchema = CreateProductSchema.partial();

// استخراج خودکار Type از Schema (همگام‌سازی کامل با اعتبارسنجی)
export type Product = z.infer<typeof ProductSchema>;
export type CreateProductInput = z.infer<typeof CreateProductSchema>;
export type UpdateProductInput = z.infer<typeof UpdateProductSchema>;
