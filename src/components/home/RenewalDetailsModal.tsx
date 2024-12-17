import React, { useState } from 'react';
import { StickyNote } from 'lucide-react';
import type { Prescription, Renewal } from '../../types';
import { PrescriptionDetails } from '../common/prescription/PrescriptionDetails';
import { ModalHeader } from '../common/ModalHeader';
import { StatusSection } from './StatusSection';
import { NotesPanel } from './NotesPanel';
import { usePrescriptions } from '../../context/PrescriptionContext';

interface RenewalDetailsModalProps {
  prescription: Prescription;
  renewal: Renewal;
  isOpen: boolean;
  onClose: () => void;
}

export function RenewalDetailsModal({
  prescription,
  renewal: initialRenewal,
  isOpen,
  onClose,
}: RenewalDetailsModalProps) {
  const { updateRenewalStatus, addRenewalNote, renewals } = usePrescriptions();
  const [newNote, setNewNote] = useState('');
  const [isAddingNote, setIsAddingNote] = useState(false);

  // Get the latest renewal state to ensure we're showing current status
  const currentRenewal = renewals.find(r => r.id === initialRenewal.id) || initialRenewal;

  if (!isOpen) return null;

  const handleAddNote = () => {
    if (newNote.trim()) {
      addRenewalNote(currentRenewal.id, newNote.trim());
      setNewNote('');
      setIsAddingNote(false);
    }
  };

  const handleStatusChange = (newStatus: typeof currentRenewal.status) => {
    updateRenewalStatus(currentRenewal.id, newStatus, 0);
    // Modal stays open since we're changing status from within it
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-gray-900/50 backdrop-blur-sm">
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="relative w-full max-w-2xl">
            <div className="relative overflow-hidden rounded-xl bg-white shadow-2xl">
              <ModalHeader title="Détails du renouvellement" onClose={onClose} />

              <div className="max-h-[calc(100vh-8rem)] overflow-y-auto">
                <div className="p-6 space-y-6">
                  <StatusSection
                    currentStatus={currentRenewal.status}
                    onStatusChange={handleStatusChange}
                  />

                  <PrescriptionDetails prescription={prescription} renewal={currentRenewal} />

                  {prescription.note && (
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                        <StickyNote className="h-4 w-4" />
                        <span>Note de l'ordonnance</span>
                      </div>
                      <p className="text-gray-900 whitespace-pre-wrap">{prescription.note}</p>
                    </div>
                  )}

                  <NotesPanel
                    notes={currentRenewal.notes}
                    onAddNote={handleAddNote}
                    isAddingNote={isAddingNote}
                    setIsAddingNote={setIsAddingNote}
                    newNote={newNote}
                    setNewNote={setNewNote}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}