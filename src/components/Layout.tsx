import React from 'react';
import { Bell, Menu, User as UserIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function Layout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <header className="bg-white shadow-sm">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between items-center">
            <div className="flex">
              <button className="p-2 rounded-md text-gray-400 hover:text-gray-500">
                <Menu className="h-6 w-6" />
              </button>
              <div className="ml-4 flex items-center">
                <h1 className="text-xl font-semibold text-gray-900">Pharma Assist</h1>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 rounded-md text-gray-400 hover:text-gray-500 relative">
                <Bell className="h-6 w-6" />
                <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-400"></span>
              </button>
              <div className="flex items-center gap-2">
                <img
                  src={user?.avatar}
                  alt={user?.name}
                  className="h-8 w-8 rounded-full"
                />
                <span className="text-sm font-medium text-gray-700">{user?.name}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-6">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
}