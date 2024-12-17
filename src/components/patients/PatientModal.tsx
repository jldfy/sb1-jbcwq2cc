import React, { useState, useEffect } from 'react';
import { X, User, Calendar, Phone, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { usePatients } from '../../context/PatientContext';
import { Button } from '../common/Button';
import { FormField } from '../common/FormField';
import { patientSchema } from '../../types/patient';

interface PatientModalProps {
  isOpen: boolean;
  patientId: string | null;
  onClose: () => void;
}

export function PatientModal({ isOpen, patientId, onClose }: PatientModalProps) {
  const navigate = useNavigate();
  const { patients, addPatient, updatePatient } = usePatients();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    birthDate: '',
    phoneNumber: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [createdPatientId, setCreatedPatientId] = useState<string | null>(null);

  useEffect(() => {
    if (patientId) {
      const patient = patients.find(p => p.id === patientId);
      if (patient) {
        setFormData({
          firstName: patient.firstName,
          lastName: patient.lastName,
          birthDate: patient.birthDate,
          phoneNumber: patient.phoneNumber,
        });
      }
    } else {
      setFormData({
        firstName: '',
        lastName: '',
        birthDate: '',
        phoneNumber: '',
      });
    }
    setErrors({});
  }, [patientId, patients]);

  useEffect(() => {
    if (!isOpen) {
      setShowSuccess(false);
      setCreatedPatientId(null);
    }
  }, [isOpen]);

  const validateForm = () => {
    try {
      patientSchema.omit({ id: true }).parse(formData);
      setErrors({});
      return true;
    } catch (error: any) {
      const newErrors: Record<string, string> = {};
      error.errors.forEach((err: any) => {
        const field = err.path[0];
        newErrors[field] = err.message;
      });
      setErrors(newErrors);
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    if (patientId) {
      updatePatient(patientId, formData);
      onClose();
    } else {
      const newId = crypto.randomUUID();
      addPatient({ ...formData, id: newId });
      setCreatedPatientId(newId);
      setShowSuccess(true);
    }
  };

  const handleCreatePrescription = () => {
    if (createdPatientId) {
      navigate('/', { 
        state: { 
          openNewPrescription: true, 
          patientId: createdPatientId 
        }
      });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-900/50 backdrop-blur-sm">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="relative w-full max-w-md">
          <div className="relative overflow-hidden rounded-xl bg-white shadow-2xl">
            {showSuccess ? (
              <div className="p-6 space-y-4">
                <div className="text-center">
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                    <User className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">
                    Patient créé avec succès
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Voulez-vous créer une ordonnance pour ce patient ?
                  </p>
                </div>
                <div className="flex justify-center gap-3">
                  <Button
                    variant="secondary"
                    onClick={onClose}
                  >
                    Plus tard
                  </Button>
                  <Button
                    icon={FileText}
                    onClick={handleCreatePrescription}
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
                  >
                    Créer une ordonnance
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="relative bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-white">
                      {patientId ? 'Modifier le patient' : 'Nouveau patient'}
                    </h2>
                    <button
                      onClick={onClose}
                      className="rounded-full p-1 text-white/80 hover:bg-white/20 hover:text-white"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                  <FormField
                    label="Nom"
                    icon={User}
                    required
                  >
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                      className={`form-input block w-full rounded-lg border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ${
                        errors.lastName ? 'ring-red-500' : 'ring-gray-200'
                      } focus:ring-2 focus:ring-inset focus:ring-indigo-500`}
                      required
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
                    )}
                  </FormField>

                  <FormField
                    label="Prénom"
                    icon={User}
                    required
                  >
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                      className={`form-input block w-full rounded-lg border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ${
                        errors.firstName ? 'ring-red-500' : 'ring-gray-200'
                      } focus:ring-2 focus:ring-inset focus:ring-indigo-500`}
                      required
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
                    )}
                  </FormField>

                  <FormField
                    label="Date de naissance"
                    icon={Calendar}
                    required
                  >
                    <input
                      type="date"
                      value={formData.birthDate}
                      onChange={(e) => setFormData(prev => ({ ...prev, birthDate: e.target.value }))}
                      className={`form-input block w-full rounded-lg border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ${
                        errors.birthDate ? 'ring-red-500' : 'ring-gray-200'
                      } focus:ring-2 focus:ring-inset focus:ring-indigo-500`}
                      required
                    />
                    {errors.birthDate && (
                      <p className="mt-1 text-sm text-red-500">{errors.birthDate}</p>
                    )}
                  </FormField>

                  <FormField
                    label="Téléphone"
                    icon={Phone}
                    required
                  >
                    <input
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData(prev => ({ ...prev, phoneNumber: e.target.value }))}
                      className={`form-input block w-full rounded-lg border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ${
                        errors.phoneNumber ? 'ring-red-500' : 'ring-gray-200'
                      } focus:ring-2 focus:ring-inset focus:ring-indigo-500`}
                      required
                      pattern="[0-9]{10}"
                      title="Le numéro de téléphone doit contenir 10 chiffres"
                    />
                    {errors.phoneNumber && (
                      <p className="mt-1 text-sm text-red-500">{errors.phoneNumber}</p>
                    )}
                  </FormField>

                  <div className="flex justify-end gap-3 pt-4">
                    <Button
                      variant="secondary"
                      onClick={onClose}
                    >
                      Annuler
                    </Button>
                    <Button
                      type="submit"
                      className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
                    >
                      {patientId ? 'Mettre à jour' : 'Créer'}
                    </Button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}