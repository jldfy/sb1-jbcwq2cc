import React, { useState } from 'react';
import { format, isSameMonth, isSameDay, isToday } from 'date-fns';
import { fr } from 'date-fns/locale';
import { usePrescriptions } from '../../context/PrescriptionContext';
import { RenewalEvent } from './RenewalEvent';
import { RenewalDetailsModal } from '../home/RenewalDetailsModal';
import type { Renewal } from '../../types';

interface CalendarGridProps {
  days: Date[];
  currentMonth: Date;
}

export function CalendarGrid({ days, currentMonth }: CalendarGridProps) {
  const { renewals, prescriptions } = usePrescriptions();
  const [selectedRenewal, setSelectedRenewal] = useState<Renewal | null>(null);

  const getRenewalsForDay = (date: Date) => {
    return renewals.filter(renewal => {
      const prescription = prescriptions.find(p => p.id === renewal.prescriptionId);
      if (!prescription) return false;
      return isSameDay(renewal.dueDate, date);
    });
  };

  const handleRenewalClick = (renewal: Renewal) => {
    setSelectedRenewal(renewal);
  };

  const selectedPrescription = selectedRenewal 
    ? prescriptions.find(p => p.id === selectedRenewal.prescriptionId)
    : null;

  return (
    <>
      <div className="grid grid-cols-7 divide-x divide-gray-200">
        {days.map((day) => {
          const dayRenewals = getRenewalsForDay(day);
          const isCurrentMonth = isSameMonth(day, currentMonth);
          const isCurrentDay = isToday(day);

          return (
            <div
              key={day.toISOString()}
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
                {dayRenewals.map((renewal) => {
                  const prescription = prescriptions.find(p => p.id === renewal.prescriptionId);
                  if (!prescription) return null;

                  return (
                    <RenewalEvent
                      key={renewal.id}
                      renewal={renewal}
                      prescription={prescription}
                      onClick={handleRenewalClick}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {selectedRenewal && selectedPrescription && (
        <RenewalDetailsModal
          prescription={selectedPrescription}
          renewal={selectedRenewal}
          isOpen={true}
          onClose={() => setSelectedRenewal(null)}
        />
      )}
    </>
  );
}