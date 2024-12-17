import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { Patient } from '../types/patient';
import { searchByText } from '../utils/search';
import { 
  getPatients,
  createPatient as createPatientService,
  updatePatient as updatePatientService,
  deletePatient as deletePatientService
} from '../services';
import { useToast } from './ToastContext';

interface PatientContextType {
  patients: Patient[];
  isLoading: boolean;
  error: string | null;
  addPatient: (patient: Omit<Patient, 'id'>) => Promise<void>;
  updatePatient: (id: string, patient: Omit<Patient, 'id'>) => Promise<void>;
  deletePatient: (id: string) => Promise<void>;
  searchPatients: (query: string) => Patient[];
  refreshPatients: () => Promise<void>;
}

const PatientContext = createContext<PatientContextType | undefined>(undefined);

export function PatientProvider({ children }: { children: React.ReactNode }) {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { showToast } = useToast();

  const refreshPatients = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getPatients();
      setPatients(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch patients');
      showToast('Failed to fetch patients', { type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshPatients();
  }, []);

  const addPatient = useCallback(async (patientData: Omit<Patient, 'id'>) => {
    try {
      setIsLoading(true);
      setError(null);
      const newPatient = await createPatientService(patientData);
      setPatients(prev => [...prev, newPatient]);
      showToast('Patient added successfully', { type: 'success' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add patient');
      showToast('Failed to add patient', { type: 'error' });
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [showToast]);

  const updatePatient = useCallback(async (id: string, patientData: Omit<Patient, 'id'>) => {
    try {
      setIsLoading(true);
      setError(null);
      const updatedPatient = await updatePatientService(id, patientData);
      setPatients(prev => prev.map(p => p.id === id ? updatedPatient : p));
      showToast('Patient updated successfully', { type: 'success' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update patient');
      showToast('Failed to update patient', { type: 'error' });
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [showToast]);

  const deletePatient = useCallback(async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);
      await deletePatientService(id);
      setPatients(prev => prev.filter(p => p.id !== id));
      showToast('Patient deleted successfully', { type: 'success' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete patient');
      showToast('Failed to delete patient', { type: 'error' });
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [showToast]);

  const searchPatients = useCallback((query: string) => {
    return searchByText(patients, query, ['firstName', 'lastName', 'phoneNumber']);
  }, [patients]);

  return (
    <PatientContext.Provider value={{
      patients,
      isLoading,
      error,
      addPatient,
      updatePatient,
      deletePatient,
      searchPatients,
      refreshPatients
    }}>
      {children}
    </PatientContext.Provider>
  );
}

export function usePatients() {
  const context = useContext(PatientContext);
  if (context === undefined) {
    throw new Error('usePatients must be used within a PatientProvider');
  }
  return context;
}