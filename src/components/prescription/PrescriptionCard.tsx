import React from 'react';
import { Repeat, StickyNote } from 'lucide-react';
import type { Renewal } from '../../types';
import { formatDate } from '../../utils/date';
import { usePrescriptions } from '../../context/PrescriptionContext';
import { StatusActions } from './StatusActions';

interface PrescriptionCardProps {
  renewal: Renewal;
  onClick: (renewal: Renewal) => void;
}

export function PrescriptionCard({ renewal, onClick }: PrescriptionCardProps) {
  const { prescriptions, updateRenewalStatus } = usePrescriptions();
  const prescription = prescriptions.find(p => p.id === renewal.prescriptionId);

  if (!prescription) return null;

  const handleStatusChange = (newStatus: typeof renewal.status) => {
    updateRenewalStatus(renewal.id, newStatus, 0);
  };

  return (
    <div
      onClick={() => onClick(renewal)}
      className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 cursor-pointer hover:shadow-md transition-shadow"
    >
      <div className="flex justify-between items-start">
        <h3 className="font-medium text-gray-900">{prescription.patientName}</h3>
        <img
          src={renewal.assignedTo.avatar}
          alt={renewal.assignedTo.name}
          className="h-6 w-6 rounded-full"
          title={`Assigné à ${renewal.assignedTo.name}`}
        />
      </div>
      <div className="mt-4 flex justify-between items-center text-xs">
        <span className="text-gray-500">Échéance: {formatDate(renewal.dueDate)}</span>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-indigo-50 text-indigo-600 px-2 py-1 rounded">
            <Repeat className="h-3 w-3" />
            <span>{renewal.renewalNumber}/{prescription.totalRenewals}</span>
          </div>
          {prescription.note && (
            <div className="text-indigo-600">
              <StickyNote className="h-3 w-3" />
            </div>
          )}
        </div>
      </div>

      <StatusActions
        currentStatus={renewal.status}
        onStatusChange={handleStatusChange}
        className="mt-3 pt-3 border-t border-gray-100"
      />
    </div>
  );
}