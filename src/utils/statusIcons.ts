import { 
  LucideIcon, 
  ClipboardList, 
  Timer, 
  Beaker, 
  CheckCircle, 
  PackageCheck 
} from 'lucide-react';
import { RenewalStatus } from '../types/renewal';

export const statusIcons: Record<RenewalStatus, LucideIcon> = {
  [RenewalStatus.UPCOMING]: ClipboardList,
  [RenewalStatus.TO_PREPARE]: Timer,
  [RenewalStatus.IN_PROGRESS]: Beaker,
  [RenewalStatus.PREPARED]: CheckCircle,
  [RenewalStatus.COLLECTED]: PackageCheck,
};