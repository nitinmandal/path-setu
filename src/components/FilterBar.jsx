import React from 'react';

export default function FilterBar({
  searchTerm,
  onSearchChange,
  filterCategory,
  onCategoryChange,
  categoryOptions = [],
  placeholder = "Search records..."
}) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-surface-container-lowest p-3 rounded border border-outline-variant shadow-xs">
      {/* Search Input */}
      <div className="relative w-full sm:w-72">
        <span className="material-symbols-outlined text-[16px] text-outline absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
          search
        </span>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-slate-50 border border-outline-variant rounded pl-9 pr-8 py-1.5 text-xs text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:bg-white font-sans transition-colors"
        />
        {searchTerm && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-2.5 top-1/2 transform -translate-y-1/2 text-outline hover:text-on-surface"
          >
            <span className="material-symbols-outlined text-[14px]">close</span>
          </button>
        )}
      </div>

      {/* Category Dropdown */}
      {categoryOptions.length > 0 && (
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="material-symbols-outlined text-[16px] text-outline hidden sm:block">filter_list</span>
          <select
            value={filterCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full sm:w-auto bg-slate-50 border border-outline-variant rounded px-3 py-1.5 text-xs text-on-surface focus:outline-none focus:border-primary font-mono cursor-pointer"
          >
            <option value="ALL">All Categories</option>
            {categoryOptions.map((opt, idx) => (
              <option key={idx} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}
