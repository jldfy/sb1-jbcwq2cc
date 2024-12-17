import React, { useState, useEffect, useRef } from 'react';
import { Search, UserPlus } from 'lucide-react';
import { usePatients } from '../../context/PatientContext';
import { useNavigate } from 'react-router-dom';
import type { Patient } from '../../types/patient';
import { formatDate } from '../../utils/date';

interface PatientSearchProps {
  onSelect: (patient: Patient) => void;
  initialPatient?: Patient | null;
}

export function PatientSearch({ onSelect, initialPatient }: PatientSearchProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { searchPatients } = usePatients();
  const navigate = useNavigate();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialPatient) {
      onSelect(initialPatient);
    }
  }, [initialPatient, onSelect]);

  const filteredPatients = searchPatients(query);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  const handlePatientSelect = (patient: Patient) => {
    onSelect(patient);
    setQuery('');
    setIsOpen(false);
  };

  const handleNewPatient = () => {
    navigate('/patients', { state: { openNewPatient: true } });
  };

  return (
    <div ref={wrapperRef} className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={handleInputFocus}
          placeholder={initialPatient ? `${initialPatient.lastName} ${initialPatient.firstName}` : "Rechercher un patient par nom ou téléphone..."}
          className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-64 overflow-y-auto">
          <div className="p-2">
            <button
              onClick={handleNewPatient}
              className="flex items-center gap-2 w-full px-3 py-2 text-left text-sm text-indigo-600 hover:bg-indigo-50 rounded-md"
            >
              <UserPlus className="h-4 w-4" />
              <span>Nouveau patient</span>
            </button>
          </div>

          {query && (
            <div className="border-t">
              {filteredPatients.length > 0 ? (
                filteredPatients.map((patient) => (
                  <button
                    key={patient.id}
                    onClick={() => handlePatientSelect(patient)}
                    className="flex flex-col w-full px-4 py-2 text-left hover:bg-gray-50 border-b last:border-b-0"
                  >
                    <span className="font-medium">
                      {patient.lastName} {patient.firstName}
                    </span>
                    <div className="flex gap-4 text-sm text-gray-500">
                      <span>{formatDate(new Date(patient.birthDate))}</span>
                      <span>{patient.phoneNumber}</span>
                    </div>
                  </button>
                ))
              ) : (
                <div className="px-4 py-2 text-sm text-gray-500">
                  Aucun patient trouvé
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}