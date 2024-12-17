import React, { useState, useEffect } from 'react';
import { Repeat, StickyNote, Calendar } from 'lucide-react';
import type { Renewal } from '../../types';
import { formatDate } from '../../utils/date';
import { usePrescriptions } from '../../context/PrescriptionContext';
import { StatusActions } from '../common/StatusActions';
import { getStatusChangeAnimation } from '../../utils/animations';
import { Initials } from '../common/Initials';

interface RenewalCardProps {
  renewal: Renewal;
  onClick: (renewal: Renewal) => void;
}

export function RenewalCard({ renewal, onClick }: RenewalCardProps) {
  const { prescriptions, updateRenewalStatus } = usePrescriptions();
  const [statusAnimation, setStatusAnimation] = useState<string | null>(null);
  const [previousStatus, setPreviousStatus] = useState(renewal.status);
  const prescription = prescriptions.find(p => p.id === renewal.prescriptionId);

  useEffect(() => {
    if (renewal.status !== previousStatus) {
      const animation = getStatusChangeAnimation(previousStatus, renewal.status);
      setStatusAnimation(animation);
      setPreviousStatus(renewal.status);

      const timer = setTimeout(() => {
        setStatusAnimation(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [renewal.status, previousStatus]);

  if (!prescription) return null;

  const handleStatusChange = (newStatus: typeof renewal.status) => {
    updateRenewalStatus(renewal.id, newStatus, 0);
  };

  const handleClick = (e: React.MouseEvent) => {
    if (!(e.target as HTMLElement).closest('.status-actions')) {
      onClick(renewal);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`
        status-change
        bg-white
        cursor-pointer 
        ${statusAnimation || ''}
      `}
    >
      {/* Main card content */}
      <div className="p-4 rounded-t-lg shadow-sm border border-gray-200">
        <div className="flex justify-between items-start">
          <h3 className="font-medium text-gray-900">{prescription.patientName}</h3>
          <Initials 
            name={renewal.assignedTo.name} 
            size="sm"
            className="flex-shrink-0"
          />
        </div>
        <div className="mt-4 flex justify-between items-center text-xs">
          <div className="flex items-center gap-1.5 text-gray-500">
            <Calendar className="h-3.5 w-3.5" />
            <span>{formatDate(renewal.dueDate)}</span>
          </div>
          <div className="flex items-center gap-2">
            {prescription.note && (
              <div className="text-indigo-600">
                <StickyNote className="h-3 w-3" />
              </div>
            )}
            <div className="flex items-center gap-1 bg-indigo-50 text-indigo-600 px-2 py-1 rounded">
              <Repeat className="h-3 w-3" />
              <span>{renewal.renewalNumber}/{prescription.totalRenewals}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Status actions in a separate section */}
      <div className="status-actions px-4 py-2 bg-gray-50 rounded-b-lg border border-t-0 border-gray-200">
        <StatusActions
          currentStatus={renewal.status}
          onStatusChange={handleStatusChange}
          className="justify-end"
          variant="compact"
        />
      </div>
    </div>
  );
}