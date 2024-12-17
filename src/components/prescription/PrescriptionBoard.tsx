import React, { useState } from 'react';
import type { Prescription, Renewal } from '../../types';
import { RenewalStatus } from '../../types/renewal';
import { PrescriptionColumn } from './PrescriptionColumn';
import { RenewalDetailsModal } from './modals/RenewalDetailsModal';
import { usePrescriptions } from '../../context/PrescriptionContext';

interface PrescriptionBoardProps {
  searchQuery: string;
}

export function PrescriptionBoard({ searchQuery }: PrescriptionBoardProps) {
  const { prescriptions, renewals, searchRenewals } = usePrescriptions();
  const [selectedRenewal, setSelectedRenewal] = useState<Renewal | null>(null);

  const filteredRenewals = searchQuery ? searchRenewals(searchQuery) : renewals;

  const handleRenewalClick = (renewal: Renewal) => {
    setSelectedRenewal(renewal);
  };

  const selectedPrescription = selectedRenewal 
    ? prescriptions.find(p => p.id === selectedRenewal.prescriptionId)
    : null;

  return (
    <>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {columns.map(({ title, status }) => (
          <PrescriptionColumn
            key={status}
            title={title}
            status={status}
            renewals={filteredRenewals.filter((r) => r.status === status)}
            onRenewalClick={handleRenewalClick}
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

const columns = [
  { title: 'À venir', status: RenewalStatus.UPCOMING },
  { title: 'À préparer', status: RenewalStatus.TO_PREPARE },
  { title: 'En cours', status: RenewalStatus.IN_PROGRESS },
  { title: 'Préparée', status: RenewalStatus.PREPARED },
  { title: 'Récupérée', status: RenewalStatus.COLLECTED },
];