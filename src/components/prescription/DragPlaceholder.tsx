import React from 'react';
import { Plus } from 'lucide-react';

export function DragPlaceholder() {
  return (
    <div className="h-[104px] bg-indigo-100 rounded-lg border-2 border-dashed border-indigo-300 flex items-center justify-center my-2 transition-all duration-200">
      <Plus className="h-6 w-6 text-indigo-400" />
    </div>
  );
}