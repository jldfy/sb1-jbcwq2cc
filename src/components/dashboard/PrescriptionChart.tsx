import React from 'react';
import { usePrescriptions } from '../../context/PrescriptionContext';

export function PrescriptionChart() {
  const { prescriptions } = usePrescriptions();

  // In a real application, we would use a charting library like Chart.js or Recharts
  // For now, we'll create a simple visual representation
  const today = new Date();
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    return date;
  }).reverse();

  const dailyCounts = last7Days.map(date => {
    return prescriptions.filter(p => {
      const prescDate = new Date(p.createdAt);
      return prescDate.getDate() === date.getDate() &&
             prescDate.getMonth() === date.getMonth() &&
             prescDate.getFullYear() === date.getFullYear();
    }).length;
  });

  const maxCount = Math.max(...dailyCounts);

  return (
    <div className="h-64 flex items-end justify-between gap-2">
      {dailyCounts.map((count, index) => {
        const height = (count / maxCount) * 100;
        const date = last7Days[index];
        
        return (
          <div key={date.toISOString()} className="flex flex-col items-center flex-1">
            <div 
              className="w-full bg-indigo-200 rounded-t transition-all duration-300 hover:bg-indigo-300"
              style={{ height: `${height}%` }}
            />
            <div className="mt-2 text-xs text-gray-600">
              {date.toLocaleDateString('fr-FR', { weekday: 'short' })}
            </div>
          </div>
        );
      })}
    </div>
  );
}