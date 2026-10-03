import React from 'react';

export default function DataTable({ columns, data, onRowClick, emptyMessage = "No matching records found." }) {
  return (
    <div className="w-full overflow-x-auto border border-outline-variant rounded bg-surface-container-lowest shadow-xs" role="region" aria-label="Data table" tabIndex="0">
      <table className="w-full text-left text-xs text-on-surface">
        <thead className="bg-slate-50 border-b border-outline-variant font-mono text-[11px] text-outline uppercase tracking-wider select-none">
          <tr>
            {columns.map((col, idx) => (
              <th key={idx} className="px-4 py-3 font-semibold">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-outline-variant font-sans">
          {data && data.length > 0 ? (
            data.map((row, rowIdx) => (
              <tr
                key={row.id || rowIdx}
                onClick={() => onRowClick && onRowClick(row)}
                onKeyDown={(event) => {
                  if (onRowClick && (event.key === 'Enter' || event.key === ' ')) {
                    event.preventDefault();
                    onRowClick(row);
                  }
                }}
                tabIndex={onRowClick ? 0 : undefined}
                className={`hover:bg-slate-50/80 transition-colors ${onRowClick ? 'cursor-pointer focus-visible:outline-primary focus-visible:outline-2 focus-visible:outline-offset-[-2px]' : ''}`}
              >
                {columns.map((col, colIdx) => (
                  <td key={colIdx} className="px-4 py-3 whitespace-nowrap">
                    {col.accessor ? col.accessor(row) : row[col.field]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="px-4 py-8 text-center text-outline font-mono">
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
