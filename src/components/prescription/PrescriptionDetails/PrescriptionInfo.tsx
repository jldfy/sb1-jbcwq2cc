import React from 'react';
import { Calendar, Hash, User, Phone, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { Prescription, Renewal } from '../../../types';
import { DetailField } from '../DetailField';
import { formatDate, calculateEndDate } from '../../../utils/date';

interface PrescriptionInfoProps {
  prescription: Prescription;
  renewal?: Renewal;
}

export function PrescriptionInfo({ prescription, renewal }: PrescriptionInfoProps) {
  const { t } = useTranslation();

  const endDate = calculateEndDate(
    prescription.startDate,
    prescription.duration,
    prescription.totalRenewals
  );

  return (
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
          value={renewal 
            ? `${renewal.renewalNumber}/${prescription.totalRenewals}`
            : `${prescription.currentRenewal}/${prescription.totalRenewals}`
          } 
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
          label={renewal ? t('date.due') : t('date.end')}
          value={renewal ? formatDate(renewal.dueDate) : formatDate(endDate)}
        />
      </div>
    </div>
  );
}