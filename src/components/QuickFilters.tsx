import React from 'react';

const filters = [
  "Hindi", "English", "Telugu", "Tamil",
  "Action", "Drama", "Thriller", "Comedy",
  "2D", "3D", "IMAX", "4DX"
];

export default function QuickFilters() {
  return (
    <div className="flex gap-3 py-4 overflow-x-auto no-scrollbar">
      {filters.map((filter) => (
        <button
          key={filter}
          className="px-4 py-1.5 rounded-full bg-zinc-100 text-sm whitespace-nowrap hover:bg-zinc-200"
        >
          {filter}
        </button>
      ))}
    </div>
  );
}