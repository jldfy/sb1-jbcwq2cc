export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'admin' | 'user';
}

export interface Note {
  id: string;
  content: string;
  createdAt: Date;
  createdBy: User;
}

export interface Prescription {
  id: string;
  uniqueNumber: string;
  prescriptionId: string;
  lgpiNumber?: string;
  patientId: string;
  patientName: string;
  patientPhone?: string;
  startDate: Date;
  duration: number;
  totalRenewals: number;
  currentRenewal: number;
  createdAt: Date;
  assignedTo: User;
  note?: string;
}

export interface Renewal {
  id: string;
  prescriptionId: string;
  renewalNumber: number;
  dueDate: Date;
  status: 'new' | 'in-progress' | 'completed' | 'pending';
  assignedTo: User;
  notes: Note[];
}