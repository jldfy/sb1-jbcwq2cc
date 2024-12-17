import React, { useState } from 'react';
import { Calendar, Hash, User, Phone, Clock, StickyNote, Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { Prescription, Renewal, Note } from '../../types';
import { RenewalStatus } from '../../types/renewal';
import { statusIcons } from '../../utils/statusIcons';
import { StatusActions } from './StatusActions';
import { DetailField } from './DetailField';
import { ModalHeader } from '../common/ModalHeader';
import { Button } from '../common/Button';
import { usePrescriptions } from '../../context/PrescriptionContext';
import { formatDate, calculateEndDate } from '../../utils/date';

interface RenewalDetailsModalProps {
  prescription: Prescription;
  renewal: Renewal;
  isOpen: boolean;
  onClose: () => void;
}

export function RenewalDetailsModal({
  prescription,
  renewal,
  isOpen,
  onClose,
}: RenewalDetailsModalProps) {
  const { t } = useTranslation();
  const { updateRenewalStatus, addRenewalNote } = usePrescriptions();
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [newNote, setNewNote] = useState('');

  if (!isOpen) return null;

  const handleStatusChange = (newStatus: RenewalStatus) => {
    updateRenewalStatus(renewal.id, newStatus, 0);
  };

  const handleAddNote = () => {
    if (newNote.trim()) {
      addRenewalNote(renewal.id, newNote.trim());
      setNewNote('');
      setIsAddingNote(false);
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

  const StatusIcon = statusIcons[renewal.status];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-900/50 backdrop-blur-sm">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="relative w-full max-w-2xl">
          <div className="relative overflow-hidden rounded-xl bg-white shadow-2xl">
            <ModalHeader title="Détails du renouvellement" onClose={onClose} />

            <div className="p-6 space-y-6">
              {/* Status Section */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <StatusIcon className="h-5 w-5 text-indigo-600" />
                      <span className="font-medium text-gray-900">
                        {t(`status.${renewal.status}`)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-500">Changer pour :</span>
                    <StatusActions
                      currentStatus={renewal.status}
                      onStatusChange={handleStatusChange}
                      showText={true}
                      className="flex-row"
                    />
                  </div>
                </div>
              </div>

              {/* Prescription Details */}
              <div className="space-y-6">
                {/* First line: Identifiant + LGPI */}
                <div className="grid grid-cols-2 gap-6">
                  <DetailField 
                    icon={Hash} 
                    label={t('common.identifier')}
                    value={prescription.prescriptionId} 
                  />
                  <DetailField 
                    icon={Hash} 
                    label={t('common.lgpiNumber')}
                    value={prescription.lgpiNumber || t('common.notSpecified')}
                    className={!prescription.lgpiNumber ? 'text-gray-500 italic' : ''}
                  />
                </div>

                {/* Second line: Patient info */}
                <div className="grid grid-cols-2 gap-6">
                  <DetailField 
                    icon={User} 
                    label={t('common.patient')}
                    value={prescription.patientName} 
                  />
                  <DetailField 
                    icon={Phone} 
                    label={t('common.phone')}
                    value={prescription.patientPhone || t('common.notSpecified')}
                    className={!prescription.patientPhone ? 'text-gray-500 italic' : ''}
                  />
                </div>

                {/* Third line: Renewal + Duration */}
                <div className="grid grid-cols-2 gap-6">
                  <DetailField 
                    icon={Calendar} 
                    label={t('common.renewal')}
                    value={`${renewal.renewalNumber}/${prescription.totalRenewals}`}
                  />
                  <DetailField 
                    icon={Clock} 
                    label={t('common.duration')}
                    value={`${prescription.duration} ${t('common.days')}`}
                  />
                </div>

                {/* Fourth line: Dates */}
                <div className="grid grid-cols-2 gap-6">
                  <DetailField 
                    icon={Calendar} 
                    label={t('date.preparation')}
                    value={formatDate(prescription.startDate)} 
                  />
                  <DetailField 
                    icon={Calendar} 
                    label={t('date.due')}
                    value={formatDate(renewal.dueDate)}
                  />
                </div>
              </div>

              {/* Notes Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <StickyNote className="h-4 w-4" />
                    <span>Notes du renouvellement</span>
                  </div>
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
                    renewal.notes.map((note: Note) => (
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}