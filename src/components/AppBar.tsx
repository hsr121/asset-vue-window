
import React from 'react';
import { Menu, Search, Bell, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

interface AppBarProps {
  toggleDrawer: () => void;
  title: string;
}

const AppBar: React.FC<AppBarProps> = ({ toggleDrawer, title }) => {
  const isMobile = useIsMobile();

  return (
    <header className="sticky top-0 z-10 bg-white shadow-md border-b border-japan-sand">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleDrawer}
            className="mr-2 text-japan-indigo hover:bg-japan-sand/30"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold text-japan-indigo">{title}</h1>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="text-japan-fuji hover:bg-japan-sand/30">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-japan-sakura hover:bg-japan-sand/30">
            <Bell className="h-5 w-5" />
          </Button>
          {!isMobile && (
            <Button variant="ghost" size="icon" className="text-japan-matcha hover:bg-japan-sand/30">
              <Settings className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default AppBar;
