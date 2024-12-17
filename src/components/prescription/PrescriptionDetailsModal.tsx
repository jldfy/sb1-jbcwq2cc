import React, { useState } from 'react';
import { StickyNote, Plus } from 'lucide-react';
import type { Prescription, Renewal } from '../../types';
import { PrescriptionDetails } from './PrescriptionDetails';
import { ModalHeader } from '../common/ModalHeader';
import { Button } from '../common/Button';
import { StatusActions } from './StatusActions';
import { useAuth } from '../../context/AuthContext';
import { usePrescriptions } from '../../context/PrescriptionContext';

interface PrescriptionDetailsModalProps {
  prescription: Prescription;
  renewal?: Renewal;
  isOpen: boolean;
  onClose: () => void;
}

export function PrescriptionDetailsModal({
  prescription,
  renewal,
  isOpen,
  onClose,
}: PrescriptionDetailsModalProps) {
  const { user } = useAuth();
  const { updateRenewalStatus, addRenewalNote } = usePrescriptions();
  const [newNote, setNewNote] = useState('');
  const [isAddingNote, setIsAddingNote] = useState(false);

  if (!isOpen) return null;

  const handleAddNote = () => {
    if (renewal && newNote.trim()) {
      addRenewalNote(renewal.id, newNote.trim());
      setNewNote('');
      setIsAddingNote(false);
    }
  };

  const handleStatusChange = (newStatus: typeof renewal.status) => {
    if (renewal) {
      updateRenewalStatus(renewal.id, newStatus, 0);
    }
  };

  const formatNoteDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-900/50 backdrop-blur-sm">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="relative w-full max-w-2xl">
          <div className="relative overflow-hidden rounded-xl bg-white shadow-2xl">
            <ModalHeader title="Détails de l'ordonnance" onClose={onClose} />

            <div className="p-6 space-y-6">
              <PrescriptionDetails prescription={prescription} renewal={renewal} />

              {renewal && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-3">Changer le statut </h3>
                  <StatusActions
                    currentStatus={renewal.status}
                    onStatusChange={handleStatusChange}
                    showText={true}
                  />
                </div>
              )}

              {prescription.note && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                    <StickyNote className="h-4 w-4" />
                    <span>Note de l'ordonnance</span>
                  </div>
                  <p className="text-gray-900 whitespace-pre-wrap">{prescription.note}</p>
                </div>
              )}

              {renewal && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900">Notes du renouvellement</h3>
                    {!isAddingNote && (
                      <Button
                        variant="secondary"
                        icon={Plus}
                        onClick={() => setIsAddingNote(true)}
                        className="text-sm"
                      >
                        Ajouter une note
                      </Button>
                    )}
                  </div>

                  {isAddingNote && (
                    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                      <textarea
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                        className="w-full rounded-lg border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 min-h-[100px]"
                        placeholder="Ajouter une nouvelle note..."
                      />
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="secondary"
                          onClick={() => {
                            setNewNote('');
                            setIsAddingNote(false);
                          }}
                        >
                          Annuler
                        </Button>
                        <Button
                          icon={Plus}
                          onClick={handleAddNote}
                          disabled={!newNote.trim()}
                        >
                          Ajouter
                        </Button>
                      </div>
                    </div>
                  )}

                  <div className="space-y-3">
                    {renewal.notes.length === 0 ? (
                      <p className="text-gray-500 text-sm italic">
                        Aucune note pour ce renouvellement
                      </p>
                    ) : (
                      renewal.notes.map((note) => (
                        <div key={note.id} className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <p className="text-gray-900 whitespace-pre-wrap">{note.content}</p>
                              <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                                <img
                                  src={note.createdBy.avatar}
                                  alt={note.createdBy.name}
                                  className="h-5 w-5 rounded-full"
                                />
                                <span>{note.createdBy.name}</span>
                                <span>•</span>
                                <span>{formatNoteDate(note.createdAt)}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}