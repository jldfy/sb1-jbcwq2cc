import React from 'react';
import { format, eachDayOfInterval, startOfWeek, endOfWeek } from 'date-fns';
import { fr } from 'date-fns/locale';

export function CalendarHeader() {
  // Get weekday names using the first week of the current month
  const weekStart = startOfWeek(new Date(), { locale: fr });
  const weekEnd = endOfWeek(weekStart, { locale: fr });
  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });

  return (
    <div className="grid grid-cols-7 border-b border-gray-200">
      {weekDays.map((day) => (
        <div
          key={day.toISOString()}
          className="px-4 py-3 text-center border-r border-gray-200 last:border-r-0"
        >
          <div className="text-sm font-medium text-gray-900">
            {format(day, 'EEEE', { locale: fr })}
          </div>
        </div>
      ))}
    </div>
  );
}