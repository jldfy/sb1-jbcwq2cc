import React from 'react';
import { eachDayOfInterval, startOfWeek, endOfWeek } from 'date-fns';
import { fr } from 'date-fns/locale';
import { DayHeader } from './DayHeader';

export function CalendarHeader() {
  const weekStart = startOfWeek(new Date(), { locale: fr });
  const weekEnd = endOfWeek(weekStart, { locale: fr });
  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });

  return (
    <div className="grid grid-cols-7 border-b border-gray-200">
      {weekDays.map((day) => (
        <DayHeader key={day.toISOString()} day={day} />
      ))}
    </div>
  );
}