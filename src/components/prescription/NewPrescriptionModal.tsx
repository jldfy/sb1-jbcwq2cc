import React, { useState, useEffect } from 'react';
import { StickyNote, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PatientSearch } from '../patients/PatientSearch';
import { Button } from '../common/Button';
import { FormField } from '../common/FormField';
import { ModalHeader } from '../common/ModalHeader';
import { PrescriptionForm } from './PrescriptionForm';
import type { Patient } from '../../types/patient';
import { generatePrescriptionId } from '../../utils/prescriptionUtils';

interface NewPrescriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (prescription: {
    uniqueNumber: string;
    prescriptionId: string;
    lgpiNumber?: string;
    startDate: Date;
    renewals: number;
    duration: number;
    patient: Patient;
    note?: string;
  }) => void;
  initialPatientId?: string | null;
}

export function NewPrescriptionModal({ 
  isOpen, 
  onClose, 
  onSubmit,
  initialPatientId 
}: NewPrescriptionModalProps) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    lgpiNumber: '',
    startDate: new Date().toISOString().split('T')[0],
    renewals: '1',
    duration: '25',
    note: '',
  });
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [prescriptionId, setPrescriptionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showNoteInput, setShowNoteInput] = useState(false);

  useEffect(() => {
    if (isOpen && !prescriptionId) {
      setIsLoading(true);
      generatePrescriptionId()
        .then(id => {
          setPrescriptionId(id);
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Erreur lors de la génération de l\'identifiant:', error);
          setIsLoading(false);
        });
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setFormData({
        lgpiNumber: '',
        startDate: new Date().toISOString().split('T')[0],
        renewals: '1',
        duration: '25',
        note: '',
      });
      if (!initialPatientId) {
        setSelectedPatient(null);
      }
      setPrescriptionId(null);
      setShowNoteInput(false);
    }
  }, [isOpen, initialPatientId]);

  const generateUniqueNumber = () => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `RX${timestamp}${random}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prescriptionId || !selectedPatient) return;

    onSubmit({
      uniqueNumber: generateUniqueNumber(),
      prescriptionId,
      lgpiNumber: formData.lgpiNumber || undefined,
      startDate: new Date(formData.startDate),
      renewals: parseInt(formData.renewals, 10),
      duration: parseInt(formData.duration, 10),
      patient: selectedPatient,
      note: formData.note || undefined,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-900/50 backdrop-blur-sm">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="relative w-full max-w-md">
          <div className="relative overflow-hidden rounded-xl bg-white shadow-2xl">
            <ModalHeader title="Nouvelle ordonnance" onClose={onClose} />

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <FormField
                label="Patient"
                required
              >
                <PatientSearch 
                  onSelect={setSelectedPatient} 
                  initialPatient={selectedPatient}
                />
                {selectedPatient && (
                  <div className="mt-2 p-2 bg-gray-50 rounded-md">
                    <div className="font-medium">
                      {selectedPatient.lastName} {selectedPatient.firstName}
                    </div>
                    <div className="text-sm text-gray-500">
                      {selectedPatient.phoneNumber}
                    </div>
                  </div>
                )}
              </FormField>

              <PrescriptionForm
                formData={formData}
                setFormData={setFormData}
                prescriptionId={prescriptionId}
                isLoading={isLoading}
              />

              {showNoteInput ? (
                <FormField
                  label="Note"
                  icon={StickyNote}
                >
                  <textarea
                    value={formData.note}
                    onChange={(e) => setFormData(prev => ({ ...prev, note: e.target.value }))}
                    placeholder="Ajouter une note à l'ordonnance..."
                    className="form-textarea block w-full rounded-lg border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-indigo-500 min-h-[100px]"
                  />
                </FormField>
              ) : (
                <Button
                  type="button"
                  variant="secondary"
                  icon={Plus}
                  onClick={() => setShowNoteInput(true)}
                  className="w-full justify-center border border-dashed border-gray-300 text-gray-600 hover:border-gray-400 hover:bg-gray-50"
                >
                  Ajouter une note
                </Button>
              )}

              <div className="flex justify-end gap-3 pt-4">
                <Button
                  variant="secondary"
                  onClick={onClose}
                >
                  Annuler
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading || !prescriptionId || !selectedPatient}
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
                >
                  Créer
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}