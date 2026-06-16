import { Account } from "./mock-data";

// نوع گره درختی = همان Account به‌علاوه‌ی آرایه‌ی فرزندان
export interface AccountNode extends Account {
  children: AccountNode[];
}

/**
 * لیست تخت حساب‌ها را به ساختار درختی تو‌در‌تو تبدیل می‌کند.
 */
export function buildTree(accounts: Account[]): AccountNode[] {
  // مرحله ۱: دفترچه آدرس (id → گره) + افزودن children خالی
  const map = new Map<number, AccountNode>();
  for (const acc of accounts) {
    map.set(acc.id, { ...acc, children: [] });
  }

  // مرحله ۲: وصل کردن هر گره به والدش
  const roots: AccountNode[] = [];
  for (const acc of accounts) {
    const node = map.get(acc.id)!; // حتماً موجود است (مرحله ۱)

    if (acc.parentId === null) {
      roots.push(node);            // ریشه
    } else {
      const parent = map.get(acc.parentId);
      if (parent) {
        parent.children.push(node); // فرزندِ والدش
      } else {
        // والدِ گم‌شده (داده‌ی خراب) — برای امنیت ریشه فرضش می‌کنیم
        roots.push(node);
      }
    }
  }

  return roots;
}
