import React from 'react';
import { format, isSameMonth, isToday } from 'date-fns';
import { fr } from 'date-fns/locale';
import { RenewalEvent } from './RenewalEvent';
import type { Renewal } from '../../../types';

interface DayCellProps {
  day: Date;
  currentMonth: Date;
  renewals: Renewal[];
  onRenewalClick: (renewal: Renewal) => void;
}

export function DayCell({ day, currentMonth, renewals, onRenewalClick }: DayCellProps) {
  const isCurrentMonth = isSameMonth(day, currentMonth);
  const isCurrentDay = isToday(day);

  return (
    <div
      className={`
        min-h-[120px] p-2 border-b border-gray-200
        ${!isCurrentMonth ? 'bg-gray-50' : ''}
        ${isCurrentDay ? 'bg-indigo-50' : ''}
      `}
    >
      <div className={`
        text-sm font-medium mb-1
        ${!isCurrentMonth ? 'text-gray-400' : 'text-gray-900'}
        ${isCurrentDay ? 'text-indigo-600' : ''}
      `}>
        {format(day, 'd', { locale: fr })}
      </div>

      <div className="space-y-1 overflow-y-auto max-h-[80px] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        {renewals.map((renewal) => (
          <RenewalEvent
            key={renewal.id}
            renewal={renewal}
            onClick={() => onRenewalClick(renewal)}
          />
        ))}
      </div>
    </div>
  );
}