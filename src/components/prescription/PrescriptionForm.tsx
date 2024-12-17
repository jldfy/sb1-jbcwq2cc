import React from 'react';
import { Hash, Calendar, Repeat, Clock, Loader2 } from 'lucide-react';
import { FormField } from '../common/FormField';

interface PrescriptionFormProps {
  formData: {
    lgpiNumber: string;
    startDate: string;
    renewals: string;
    duration: string;
    note: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<typeof formData>>;
  prescriptionId: string | null;
  isLoading: boolean;
}

export function PrescriptionForm({
  formData,
  setFormData,
  prescriptionId,
  isLoading,
}: PrescriptionFormProps) {
  const handleNumberChange = (field: 'renewals' | 'duration') => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d+$/.test(value)) {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  return (
    <>
      <FormField
        label="Identifiant"
        icon={Hash}
        required
      >
        {isLoading ? (
          <div className="flex items-center gap-2 text-gray-500 py-2">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Génération de l'identifiant...</span>
          </div>
        ) : (
          <input
            type="text"
            value={prescriptionId || ''}
            className="form-input block w-full rounded-lg border-0 bg-gray-50 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            readOnly
          />
        )}
      </FormField>

      <FormField
        label="Numéro LGPI"
        icon={Hash}
      >
        <input
          type="text"
          value={formData.lgpiNumber}
          onChange={(e) => setFormData(prev => ({ ...prev, lgpiNumber: e.target.value }))}
          className="form-input block w-full rounded-lg border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          placeholder="Lié à une facture"
        />
      </FormField>

      <FormField
        label="Date de début"
        icon={Calendar}
        required
      >
        <input
          type="date"
          value={formData.startDate}
          onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
          className="form-input block w-full rounded-lg border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          required
        />
      </FormField>

      <div className="grid grid-cols-2 gap-4">
        <FormField
          label="Renouvellements"
          icon={Repeat}
          required
        >
          <input
            type="number"
            min="1"
            value={formData.renewals}
            onChange={handleNumberChange('renewals')}
            className="form-input block w-full rounded-lg border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            required
          />
        </FormField>

        <FormField
          label="Durée (jours)"
          icon={Clock}
          required
        >
          <input
            type="number"
            min="1"
            value={formData.duration}
            onChange={handleNumberChange('duration')}
            className="form-input block w-full rounded-lg border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            required
          />
        </FormField>
      </div>
    </>
  );
}