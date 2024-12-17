import React from 'react';
import { Home, Users, BarChart2, UserCircle, ChevronLeft, UserPlus, FileText, Calendar } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Avatar } from '../common/Avatar';
import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const { user } = useAuth();
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: 'Accueil', href: '/' },
    { icon: Calendar, label: 'Calendrier', href: '/calendar' },
    { icon: FileText, label: 'Ordonnances', href: '/prescriptions' },
    { icon: UserPlus, label: 'Patients', href: '/patients' },
    { icon: BarChart2, label: 'Tableau de bord', href: '/dashboard' },
    { icon: Users, label: 'Équipe', href: '/team' },
    { icon: UserCircle, label: 'Profil', href: '/profile' },
  ];

  return (
    <aside
      className={`
        fixed 
        inset-y-0 
        left-0 
        z-30 
        w-64 
        bg-white 
        shadow-lg 
        transition-transform 
        duration-300 
        ease-in-out
        lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-[-100%]'}
      `}
    >
      <div className="h-16 flex items-center justify-between px-4 border-b">
        <div className="flex items-center space-x-3">
          <Avatar src={user?.avatar || ''} alt={user?.name || ''} size="sm" />
          <span className="font-medium text-gray-900">{user?.name}</span>
        </div>
        <button
          onClick={onToggle}
          className="p-2 rounded-md text-gray-400 hover:text-gray-500 lg:block"
          aria-label="Basculer la barre latérale"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
      </div>

      <nav className="mt-4 px-2">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={`
              flex items-center space-x-2 px-4 py-2 mt-2 rounded-md 
              transition-colors duration-200
              ${location.pathname === item.href
                ? 'bg-indigo-50 text-indigo-600'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }
            `}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}