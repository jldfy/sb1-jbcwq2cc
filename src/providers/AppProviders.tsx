import React from 'react';
import { AuthProvider } from '../context/AuthContext';
import { ToastProvider } from '../context/ToastContext';
import { PatientProvider } from '../context/PatientContext';
import { PrescriptionProvider } from '../context/PrescriptionContext';

interface AppProvidersProps {
  children: React.ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <AuthProvider>
      <ToastProvider>
        <PatientProvider>
          <PrescriptionProvider>
            {children}
          </PrescriptionProvider>
        </PatientProvider>
      </ToastProvider>
    </AuthProvider>
  );
}