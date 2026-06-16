// app/(dashboard)/accounting/page.tsx
import { mockAccounts } from "../accounting/accounts-tree/mock-data";
import { buildTree } from "../accounting/accounts-tree/tree-utils";
import { TreeNode } from "../accounting/accounts-tree/TreeNode";

export default function AccountingPage() {
  const tree = buildTree(mockAccounts);

  return (
    <div>
      <h1 className="text-2xl font-bold">داشبورد حسابداری</h1>
      <p className="text-gray-600 mt-2">درخت حساب‌ها:</p>

      <ul className="mt-4">
        {tree.map((node) => (
          <TreeNode key={node.id} node={node} />
        ))}
      </ul>
    </div>
  );
}
