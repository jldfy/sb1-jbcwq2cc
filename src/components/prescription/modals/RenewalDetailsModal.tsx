import React from 'react';
import type { Prescription, Renewal } from '../../../types';
import { PrescriptionDetails } from '../PrescriptionDetails';
import { ModalHeader } from '../../common/ModalHeader';
import { usePrescriptions } from '../../../context/PrescriptionContext';

interface RenewalDetailsModalProps {
  prescription: Prescription;
  renewal: Renewal;
  isOpen: boolean;
  onClose: () => void;
}

export function RenewalDetailsModal({
  prescription,
  renewal,
  isOpen,
  onClose,
}: RenewalDetailsModalProps) {
  const { updateRenewalStatus, addRenewalNote } = usePrescriptions();

  if (!isOpen) return null;

  const handleStatusChange = (newStatus: typeof renewal.status) => {
    updateRenewalStatus(renewal.id, newStatus, 0);
  };

  const handleAddNote = (content: string) => {
    addRenewalNote(renewal.id, content);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-900/50 backdrop-blur-sm">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="relative w-full max-w-2xl">
          <div className="relative overflow-hidden rounded-xl bg-white shadow-2xl">
            <ModalHeader title="Détails du renouvellement" onClose={onClose} />

            <div className="p-6 space-y-6">
              <PrescriptionDetails
                prescription={prescription}
                renewal={renewal}
                onStatusChange={handleStatusChange}
                onAddNote={handleAddNote}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}