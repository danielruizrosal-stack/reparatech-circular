'use client';

import { useState, useMemo } from 'react';

export interface Column<T> {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  render?: (row: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
}

export default function DataTable<T extends Record<string, any>>({ columns, data }: DataTableProps<T>) {
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortAsc, setSortAsc] = useState(true);
  const [page, setPage] = useState(1);
  const perPage = 10;

  const filtered = useMemo(() => {
    if (!search) return data;
    const lower = search.toLowerCase();
    return data.filter(row => 
      Object.values(row).some(val => val !== null && String(val).toLowerCase().includes(lower))
    );
  }, [data, search]);

  const sorted = useMemo(() => {
    if (!sortKey) return filtered;
    return [...filtered].sort((a, b) => {
      const aVal = a[sortKey] ?? '';
      const bVal = b[sortKey] ?? '';
      if (aVal === bVal) return 0;
      const res = aVal < bVal ? -1 : 1;
      return sortAsc ? res : -res;
    });
  }, [filtered, sortKey, sortAsc]);

  const paginated = sorted.slice((page - 1) * perPage, page * perPage);
  const totalPages = Math.max(1, Math.ceil(sorted.length / perPage));

  const handleSort = (key: string, sortable?: boolean) => {
    if (!sortable) return;
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full animate-fade-up">
      <div className="flex justify-between items-center gap-4">
        <div className="relative w-full max-w-sm">
          <input 
            type="text" 
            placeholder="Buscar en la tabla..." 
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
            className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] rounded-lg pl-10 pr-4 py-2.5 text-sm text-[#F8FAFC] outline-none focus:border-[#00FF94] transition-colors"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]">🔍</span>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#0D1117] relative">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="border-b border-[rgba(255,255,255,0.06)] bg-[rgba(0,0,0,0.2)]">
              {columns.map(col => (
                <th 
                  key={String(col.key)}
                  onClick={() => handleSort(String(col.key), col.sortable)}
                  className={`px-6 py-4 font-orbitron text-[11px] uppercase tracking-[2px] text-[#F8FAFC] whitespace-nowrap ${col.sortable ? 'cursor-pointer hover:bg-[rgba(255,255,255,0.02)] select-none' : ''}`}
                >
                  <div className="flex items-center gap-2">
                    {col.label}
                    {col.sortable && (
                      <span className="text-[#64748B] text-xs">
                        {sortKey === col.key ? (sortAsc ? '↑' : '↓') : '↕'}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginated.length > 0 ? paginated.map((row, i) => (
              <tr 
                key={row.id || i} 
                className="border-b border-[rgba(255,255,255,0.03)] last:border-0 hover:bg-[rgba(0,255,148,0.04)] transition-colors group"
                style={{ background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)' }}
              >
                {columns.map(col => (
                  <td key={String(col.key)} className="px-6 py-4 text-[14px] text-[#94A3B8]">
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
              </tr>
            )) : (
              <tr>
                <td colSpan={columns.length} className="px-6 py-16 text-center text-[#64748B]">
                  No se encontraron resultados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-2 text-sm text-[#94A3B8]">
          <span>Mostrando {(page - 1) * perPage + 1} a {Math.min(page * perPage, sorted.length)} de {sorted.length}</span>
          <div className="flex gap-2">
            <button 
              disabled={page === 1} 
              onClick={() => setPage(p => Math.max(1, p - 1))}
              className="px-4 py-2 rounded-lg bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Anterior
            </button>
            <button 
              disabled={page === totalPages} 
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              className="px-4 py-2 rounded-lg bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Siguiente
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
