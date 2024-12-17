import React from 'react';
import { StickyNote } from 'lucide-react';
import type { Prescription } from '../../../types';
import { PrescriptionDetails } from '../PrescriptionDetails';
import { ModalHeader } from '../../common/ModalHeader';

interface PrescriptionDetailsModalProps {
  prescription: Prescription;
  isOpen: boolean;
  onClose: () => void;
}

export function PrescriptionDetailsModal({
  prescription,
  isOpen,
  onClose,
}: PrescriptionDetailsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-900/50 backdrop-blur-sm">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="relative w-full max-w-2xl">
          <div className="relative overflow-hidden rounded-xl bg-white shadow-2xl">
            <ModalHeader title="Détails de l'ordonnance" onClose={onClose} />

            <div className="p-6 space-y-6">
              <PrescriptionDetails prescription={prescription} />

              {prescription.note && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                    <StickyNote className="h-4 w-4" />
                    <span>Note de l'ordonnance</span>
                  </div>
                  <p className="text-gray-900 whitespace-pre-wrap">{prescription.note}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}