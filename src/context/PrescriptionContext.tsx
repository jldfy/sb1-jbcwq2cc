import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import type { Prescription, Renewal } from '../types';
import { RenewalStatus } from '../types/renewal';
import { searchByText } from '../utils/search';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext';
import {
  getPrescriptions,
  getRenewals,
  updateRenewalStatus as updateRenewalStatusService,
  addRenewalNote as addRenewalNoteService
} from '../services';

interface PrescriptionContextType {
  prescriptions: Prescription[];
  renewals: Renewal[];
  isLoading: boolean;
  error: string | null;
  updateRenewalStatus: (id: string, newStatus: RenewalStatus, dropIndex: number) => Promise<void>;
  addRenewalNote: (renewalId: string, content: string) => Promise<void>;
  searchRenewals: (query: string) => Renewal[];
  refreshData: () => Promise<void>;
}

const PrescriptionContext = createContext<PrescriptionContextType | undefined>(undefined);

export function PrescriptionProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const { showToast } = useToast();
  const { t } = useTranslation();
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [renewals, setRenewals] = useState<Renewal[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const [prescriptionsData, renewalsData] = await Promise.all([
        getPrescriptions(),
        getRenewals()
      ]);
      setPrescriptions(prescriptionsData);
      setRenewals(renewalsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
      showToast('Failed to fetch prescriptions data', { type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  const updateRenewalStatus = useCallback(async (id: string, newStatus: RenewalStatus) => {
    if (!user) return;

    try {
      setIsLoading(true);
      setError(null);
      const updatedRenewal = await updateRenewalStatusService(id, newStatus);
      setRenewals(prev => prev.map(r => r.id === id ? updatedRenewal : r));
      
      const prescription = prescriptions.find(p => p.id === updatedRenewal.prescriptionId);
      if (prescription) {
        showToast(
          `Le renouvellement pour ${prescription.patientName} a été déplacé vers "${t(`status.${newStatus}`)}"`,
          { type: 'success' }
        );
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update renewal status');
      showToast('Failed to update renewal status', { type: 'error' });
    } finally {
      setIsLoading(false);
    }
  }, [user, prescriptions, t, showToast]);

  const addRenewalNote = useCallback(async (renewalId: string, content: string) => {
    if (!user) return;

    try {
      setIsLoading(true);
      setError(null);
      const updatedRenewal = await addRenewalNoteService(renewalId, content, user.id);
      setRenewals(prev => prev.map(r => r.id === renewalId ? updatedRenewal : r));
      showToast('Note added successfully', { type: 'success' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add note');
      showToast('Failed to add note', { type: 'error' });
    } finally {
      setIsLoading(false);
    }
  }, [user, showToast]);

  const searchRenewals = useCallback((query: string) => {
    if (!query) return renewals;
    
    const matchingPrescriptions = searchByText(prescriptions, query, ['patientName']);
    const prescriptionIds = new Set(matchingPrescriptions.map(p => p.id));
    
    return renewals.filter(renewal => prescriptionIds.has(renewal.prescriptionId));
  }, [renewals, prescriptions]);

  return (
    <PrescriptionContext.Provider value={{
      prescriptions,
      renewals,
      isLoading,
      error,
      updateRenewalStatus,
      addRenewalNote,
      searchRenewals,
      refreshData
    }}>
      {children}
    </PrescriptionContext.Provider>
  );
}

export function usePrescriptions() {
  const context = useContext(PrescriptionContext);
  if (context === undefined) {
    throw new Error('usePrescriptions must be used within a PrescriptionProvider');
  }
  return context;
}