import React from 'react';
import { Bell, Menu } from 'lucide-react';
import { Button } from '../common/Button';
import { UserMenu } from './UserMenu';

interface TopBarProps {
  onMenuClick: () => void;
}

export function TopBar({ onMenuClick }: TopBarProps) {
  return (
    <header className="bg-white shadow-sm">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          <div className="flex">
            <Button
              variant="secondary"
              icon={Menu}
              className="p-2"
              aria-label="Basculer le menu"
              onClick={onMenuClick}
            />
            <div className="ml-4 flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">Pharma Assist</h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-md text-gray-400 hover:text-gray-500 relative">
              <Bell className="h-6 w-6" />
              <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-400"></span>
            </button>
            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  );
}