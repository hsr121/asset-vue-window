
import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import AppBar from '@/components/AppBar';
import AppDrawer from '@/components/AppDrawer';

const MainLayout: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();
  
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Dashboard';
      case '/search':
        return 'Search Assets';
      case '/import':
        return 'Import Portfolio';
      case '/analytics':
        return 'Market Analytics';
      case '/settings':
        return 'Settings';
      case '/help':
        return 'Help & Support';
      default:
        return 'Asset Vue';
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <AppBar 
        toggleDrawer={() => setDrawerOpen(!drawerOpen)} 
        title={getPageTitle()} 
      />
      <AppDrawer 
        open={drawerOpen} 
        onClose={() => setDrawerOpen(false)} 
      />
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
