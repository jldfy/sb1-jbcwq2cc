import React, { useState } from 'react';
import { TopBar } from './TopBar';
import { Sidebar } from './Sidebar';

export function Layout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar onMenuClick={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />
      
      <main 
        className={`
          py-6 
          transition-all 
          duration-300 
          overflow-x-hidden
          ${isSidebarOpen ? 'lg:ml-64' : 'lg:ml-0'}
        `}
      >
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-[calc(100vw-1rem)]">
          {children}
        </div>
      </main>
    </div>
  );
}