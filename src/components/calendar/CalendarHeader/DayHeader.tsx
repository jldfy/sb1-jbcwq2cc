import React from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface DayHeaderProps {
  day: Date;
}

export function DayHeader({ day }: DayHeaderProps) {
  return (
    <div className="px-4 py-3 text-center border-r border-gray-200 last:border-r-0">
      <div className="text-sm font-medium text-gray-900">
        {format(day, 'EEEE', { locale: fr })}
      </div>
    </div>
  );
}