import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { 
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  addMonths,
  subMonths,
} from 'date-fns';
import { fr } from 'date-fns/locale';
import { CalendarHeader } from './CalendarHeader';
import { CalendarGrid } from './CalendarGrid';
import { Button } from '../common/Button';

export function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const handlePrevious = () => {
    setCurrentDate(prev => subMonths(prev, 1));
  };

  const handleNext = () => {
    setCurrentDate(prev => addMonths(prev, 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  // Get all days in the month including days from previous/next months to complete weeks
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarStart = startOfWeek(monthStart, { locale: fr });
  const calendarEnd = endOfWeek(monthEnd, { locale: fr });
  
  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-gray-900">Calendrier</h1>
          <div className="flex items-center gap-2">
            <Button variant="secondary" onClick={handlePrevious}>
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button variant="secondary" onClick={handleNext}>
              <ChevronRight className="h-5 w-5" />
            </Button>
            <Button variant="secondary" onClick={handleToday}>
              Aujourd'hui
            </Button>
          </div>
        </div>
        <div className="text-lg font-medium text-gray-900">
          {format(currentDate, 'MMMM yyyy', { locale: fr })}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <CalendarHeader />
        <CalendarGrid 
          days={days} 
          currentMonth={currentDate}
        />
      </div>
    </div>
  );
}