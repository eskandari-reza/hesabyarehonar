"use client";
import { useState } from "react";
import { AccountNode } from "../accounts-tree/tree-utils";

// آیکون فولدر (سرفصل/گروه) — زرد
function FolderIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="18" height="18" viewBox="0 0 24 24"
      fill="#EAB308" stroke="#CA8A04" strokeWidth="1"
    >
      {open ? (
        <path d="M4 6a2 2 0 0 1 2-2h4l2 2h6a2 2 0 0 1 2 2v1H6l-2 8V6z" />
      ) : (
        <path d="M4 6a2 2 0 0 1 2-2h4l2 2h6a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6z" />
      )}
    </svg>
  );
}

// آیکون فایل (حساب تفصیلی/برگ) — خاکستری
function FileIcon() {
  return (
    <svg
      width="18" height="18" viewBox="0 0 24 24"
      fill="#9CA3AF" stroke="#6B7280" strokeWidth="1"
    >
      <path d="M6 2h8l4 4v14a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z" />
    </svg>
  );
}

function NodeIcon({ hasChildren, open, detailed }: {
  hasChildren: boolean;
  open: boolean;
  detailed: boolean;
}) {
  if (detailed && !hasChildren) return <FileIcon />;
  return <FolderIcon open={open} />;
}

export function TreeNode({ node, level = 0 }: { node: AccountNode; level?: number }) {
  const [open, setOpen] = useState(true);
  const hasChildren = node.children.length > 0;

  return (
    <div>
      <div
        className="flex items-center gap-2 py-1 cursor-pointer hover:bg-gray-700/30 rounded"
        style={{ paddingInlineStart: `${level * 20}px` }}
        onClick={() => hasChildren && setOpen(!open)}
      >
        <span className="w-4 text-xs text-gray-500">
          {hasChildren ? (open ? "▼" : "◀") : ""}
        </span>

        <NodeIcon hasChildren={hasChildren} open={open} detailed={node.detailed} />

        <span className="font-mono text-gray-400">{node.code}</span>
        <span>{node.name}</span>
        <span className="text-xs text-gray-500">
          ({node.balanceNature === "debit" ? "بدهکار" : "بستانکار"})
        </span>
      </div>

      {open &&
        node.children.map((child) => (
          <TreeNode key={child.id} node={child} level={level + 1} />
        ))}
    </div>
  );
}
