import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { RenewalBoard } from './home/RenewalBoard';
import { NewPrescriptionModal } from './prescription/NewPrescriptionModal';
import { usePrescriptions } from '../context/PrescriptionContext';
import { usePatients } from '../context/PatientContext';
import { SearchInput } from './common/SearchInput';
import { Button } from './common/Button';

export function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  const { searchRenewals } = usePrescriptions();
  const { patients } = usePatients();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.openNewPrescription) {
      setIsModalOpen(true);
      if (location.state.patientId) {
        setSelectedPatientId(location.state.patientId);
      }
      // Clean up the location state
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

  const handleNewPrescription = (prescriptionData: any) => {
    console.log('Nouvelle ordonnance:', prescriptionData);
    setIsModalOpen(false);
    setSelectedPatientId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="max-w-md w-full">
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Rechercher un renouvellement par patient..."
          />
        </div>
        <Button icon={Plus} onClick={() => setIsModalOpen(true)}>
          Nouvelle ordonnance
        </Button>
      </div>
      
      <RenewalBoard searchQuery={searchQuery} />
      
      <NewPrescriptionModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedPatientId(null);
        }}
        onSubmit={handleNewPrescription}
        initialPatientId={selectedPatientId}
      />
    </div>
  );
}