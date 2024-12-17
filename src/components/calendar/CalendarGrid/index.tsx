import React, { useState } from 'react';
import { isSameDay } from 'date-fns';
import { usePrescriptions } from '../../../context/PrescriptionContext';
import { DayCell } from './DayCell';
import { RenewalDetailsModal } from '../../common/RenewalDetailsModal';
import type { Renewal } from '../../../types';

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

  const selectedPrescription = selectedRenewal 
    ? prescriptions.find(p => p.id === selectedRenewal.prescriptionId)
    : null;

  return (
    <>
      <div className="grid grid-cols-7 divide-x divide-gray-200">
        {days.map((day) => (
          <DayCell
            key={day.toISOString()}
            day={day}
            currentMonth={currentMonth}
            renewals={getRenewalsForDay(day)}
            onRenewalClick={setSelectedRenewal}
          />
        ))}
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