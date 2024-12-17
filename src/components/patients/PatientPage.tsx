import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { usePatients } from '../../context/PatientContext';
import { PatientList } from './PatientList';
import { PatientModal } from './PatientModal';
import { SearchInput } from '../common/SearchInput';
import { Button } from '../common/Button';

export function PatientPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);
  const { searchPatients } = usePatients();
  const location = useLocation();

  useEffect(() => {
    // Check if we should open the modal based on navigation state
    if (location.state?.openNewPatient) {
      setIsModalOpen(true);
    }
  }, [location]);

  const handleEditPatient = (patientId: string) => {
    setSelectedPatient(patientId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPatient(null);
  };

  const filteredPatients = searchPatients(searchQuery);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Patients</h1>
        <Button icon={Plus} onClick={() => setIsModalOpen(true)}>
          Nouveau patient
        </Button>
      </div>

      <div className="max-w-md">
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Rechercher un patient..."
        />
      </div>

      <PatientList
        patients={filteredPatients}
        onEdit={handleEditPatient}
      />

      <PatientModal
        isOpen={isModalOpen}
        patientId={selectedPatient}
        onClose={handleCloseModal}
      />
    </div>
  );
}