import React, { useState, useMemo } from 'react';
import { Plus, StickyNote } from 'lucide-react';
import { usePrescriptions } from '../../context/PrescriptionContext';
import { Button } from '../common/Button';
import { SearchInput } from '../common/SearchInput';
import { NewPrescriptionModal } from './NewPrescriptionModal';
import { PrescriptionDetailsModal } from './PrescriptionDetailsModal';
import { formatDate, calculateEndDate } from '../../utils/date';
import type { Prescription } from '../../types';
import { RenewalStatus } from '../../types/renewal';

export function PrescriptionsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null);
  const { prescriptions, renewals } = usePrescriptions();

  const filteredPrescriptions = useMemo(() => {
    if (!searchQuery) return prescriptions;
    const query = searchQuery.toLowerCase();
    return prescriptions.filter(p => 
      p.patientName.toLowerCase().includes(query) ||
      p.prescriptionId.toLowerCase().includes(query) ||
      p.lgpiNumber?.toLowerCase().includes(query)
    );
  }, [prescriptions, searchQuery]);

  const { activePrescriptions, completedPrescriptions } = useMemo(() => {
    return filteredPrescriptions.reduce((acc, prescription) => {
      const prescriptionRenewals = renewals.filter(r => r.prescriptionId === prescription.id);
      const completedRenewals = prescriptionRenewals.filter(r => r.status === RenewalStatus.COLLECTED).length;
      const totalRenewals = prescription.totalRenewals;

      if (completedRenewals === totalRenewals) {
        acc.completedPrescriptions.push({
          ...prescription,
          completedRenewals,
          totalRenewals
        });
      } else {
        acc.activePrescriptions.push({
          ...prescription,
          completedRenewals,
          totalRenewals
        });
      }
      return acc;
    }, {
      activePrescriptions: [] as Array<typeof prescriptions[0] & { completedRenewals: number, totalRenewals: number }>,
      completedPrescriptions: [] as Array<typeof prescriptions[0] & { completedRenewals: number, totalRenewals: number }>
    });
  }, [filteredPrescriptions, renewals]);

  const PrescriptionTable = ({ prescriptions, isCompleted }: { 
    prescriptions: Array<typeof activePrescriptions[0]>, 
    isCompleted: boolean 
  }) => (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Numéros
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Patient
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Date de début
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            {isCompleted ? 'Date de fin' : 'Date de fin prévue'}
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Renouvellements
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Durée (jours)
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {prescriptions.map((prescription) => (
          <tr 
            key={prescription.id} 
            className="hover:bg-gray-50 cursor-pointer"
            onClick={() => setSelectedPrescription(prescription)}
          >
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm font-medium text-gray-900">
                {prescription.prescriptionId}
              </div>
              <div className="text-sm text-gray-500 flex items-center gap-2">
                {prescription.lgpiNumber && (
                  <span>Numéro LGPI: {prescription.lgpiNumber}</span>
                )}
                {prescription.note && (
                  <span className="flex items-center gap-1 text-indigo-600">
                    <StickyNote className="h-4 w-4" />
                    <span>Note</span>
                  </span>
                )}
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">{prescription.patientName}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">
                {formatDate(prescription.startDate)}
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">
                {formatDate(calculateEndDate(prescription.startDate, prescription.duration, prescription.totalRenewals))}
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">
                {prescription.completedRenewals}/{prescription.totalRenewals}
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">
                {prescription.duration}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Ordonnances</h1>
        <Button icon={Plus} onClick={() => setIsModalOpen(true)}>
          Nouvelle ordonnance
        </Button>
      </div>

      <div className="max-w-md">
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Rechercher une ordonnance..."
        />
      </div>

      <div className="space-y-8">
        {activePrescriptions.length > 0 && (
          <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            <div className="px-6 py-4 bg-indigo-50 border-b border-indigo-100">
              <h2 className="text-lg font-semibold text-indigo-900">
                Ordonnances en cours
              </h2>
            </div>
            <PrescriptionTable prescriptions={activePrescriptions} isCompleted={false} />
          </div>
        )}

        {completedPrescriptions.length > 0 && (
          <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">
                Ordonnances terminées
              </h2>
            </div>
            <PrescriptionTable prescriptions={completedPrescriptions} isCompleted={true} />
          </div>
        )}
      </div>

      <NewPrescriptionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={(data) => {
          console.log('New prescription:', data);
          setIsModalOpen(false);
        }}
      />

      {selectedPrescription && (
        <PrescriptionDetailsModal
          prescription={selectedPrescription}
          isOpen={true}
          onClose={() => setSelectedPrescription(null)}
        />
      )}
    </div>
  );
}