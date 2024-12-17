import type { User } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Dr. Sophie Martin',
    email: 'sophie.martin@pharma.fr',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    role: 'admin',
  },
  {
    id: '2',
    name: 'Dr. Thomas Bernard',
    email: 'thomas.bernard@pharma.fr',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    role: 'user',
  },
  {
    id: '3',
    name: 'Dr. Emma Dubois',
    email: 'emma.dubois@pharma.fr',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    role: 'user',
  },
];