import React from 'react';
import { statusIcons } from '../../utils/statusIcons';
import { RenewalStatus } from '../../types/renewal';

interface ColumnHeaderProps {
  title: string;
  status: RenewalStatus;
  count: number;
}

export function ColumnHeader({ title, status, count }: ColumnHeaderProps) {
  const Icon = statusIcons[status];

  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center gap-2">
        <Icon 
          className={`h-5 w-5 text-indigo-600 ${status === RenewalStatus.IN_PROGRESS ? 'transform -rotate-45' : ''}`}
        />
        <h2 className="font-semibold text-gray-900">{title}</h2>
      </div>
      <span className="bg-gray-200 px-2 py-1 rounded-full text-sm">
        {count}
      </span>
    </div>
  );
}