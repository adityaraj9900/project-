"use client";

import { ArrowUpDown } from "lucide-react";
import { useMemo, useState } from "react";
import { SearchBar, StatusBadge } from "@/components/ui/primitives";

type Row = Record<string, string | number | undefined>;

export function DataTable({ rows, columns, actions }: { rows: Row[]; columns: { key: string; label: string }[]; actions?: (row: Row) => React.ReactNode }) {
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState(columns[0]?.key ?? "");

  const filtered = useMemo(() => {
    return rows
      .filter((row) => JSON.stringify(row).toLowerCase().includes(query.toLowerCase()))
      .sort((a, b) => String(a[sortKey] ?? "").localeCompare(String(b[sortKey] ?? "")));
  }, [rows, query, sortKey]);

  return (
    <div className="grid gap-4">
      <SearchBar value={query} onChange={setQuery} />
      <div className="overflow-x-auto rounded-3xl border border-white/10">
        <table className="w-full min-w-[760px] border-collapse text-left text-sm">
          <thead className="bg-white/8 text-white/55">
            <tr>
              {columns.map((column) => (
                <th key={column.key} className="px-4 py-4">
                  <button className="inline-flex items-center gap-2" onClick={() => setSortKey(column.key)}>{column.label}<ArrowUpDown size={14} /></button>
                </th>
              ))}
              {actions && <th className="px-4 py-4">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {filtered.map((row, index) => (
              <tr key={`${row.id}-${index}`} className="border-t border-white/10">
                {columns.map((column) => (
                  <td key={column.key} className="px-4 py-4 text-white/75">
                    {column.key.toLowerCase().includes("status") ? <StatusBadge status={String(row[column.key])} /> : row[column.key]}
                  </td>
                ))}
                {actions && <td className="px-4 py-4">{actions(row)}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
