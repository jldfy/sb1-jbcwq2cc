import React, { useState } from 'react';
import { Pencil, Trash2, Phone, Calendar } from 'lucide-react';
import type { Patient } from '../../types/patient';
import { usePatients } from '../../context/PatientContext';
import { Button } from '../common/Button';
import { formatDate } from '../../utils/date';
import { ConfirmationDialog } from '../common/ConfirmationDialog';

interface PatientListProps {
  patients: Patient[];
  onEdit: (id: string) => void;
}

export function PatientList({ patients, onEdit }: PatientListProps) {
  const { deletePatient } = usePatients();
  const [patientToDelete, setPatientToDelete] = useState<Patient | null>(null);

  const handleDelete = (patient: Patient) => {
    setPatientToDelete(patient);
  };

  const handleConfirmDelete = () => {
    if (patientToDelete) {
      deletePatient(patientToDelete.id);
      setPatientToDelete(null);
    }
  };

  return (
    <>
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nom
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date de naissance
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Téléphone
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {patients.map((patient) => (
              <tr key={patient.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {patient.lastName} {patient.firstName}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-2" />
                    {formatDate(new Date(patient.birthDate))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-gray-500">
                    <Phone className="h-4 w-4 mr-2" />
                    {patient.phoneNumber}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="secondary"
                      icon={Pencil}
                      onClick={() => onEdit(patient.id)}
                    >
                      Modifier
                    </Button>
                    <Button
                      variant="secondary"
                      icon={Trash2}
                      onClick={() => handleDelete(patient)}
                      className="text-red-600 hover:text-red-700"
                    >
                      Supprimer
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ConfirmationDialog
        isOpen={patientToDelete !== null}
        title="Supprimer le patient"
        message={`Êtes-vous sûr de vouloir supprimer le patient ${patientToDelete?.firstName} ${patientToDelete?.lastName} ? Cette action est irréversible.`}
        confirmLabel="Supprimer"
        onConfirm={handleConfirmDelete}
        onCancel={() => setPatientToDelete(null)}
      />
    </>
  );
}