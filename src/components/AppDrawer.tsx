
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Search, Upload, BarChart4, Settings, HelpCircle } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

interface AppDrawerProps {
  open: boolean;
  onClose: () => void;
}

const navigation = [
  { name: 'Dashboard', icon: Home, href: '/' },
  { name: 'Search', icon: Search, href: '/search' },
  { name: 'Import Portfolio', icon: Upload, href: '/import' },
];

const secondaryNavigation = [
  { name: 'Market Analytics', icon: BarChart4, href: '/analytics' },
  { name: 'Settings', icon: Settings, href: '/settings' },
  { name: 'Help & Support', icon: HelpCircle, href: '/help' },
];

const AppDrawer: React.FC<AppDrawerProps> = ({ open, onClose }) => {
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="left" className="w-[250px] p-0 bg-white border-r border-japan-sand">
        <SheetHeader className="p-4 border-b border-japan-sand bg-japan-shoji">
          <SheetTitle className="text-lg font-semibold flex items-center text-japan-indigo">
            <BarChart4 className="h-5 w-5 mr-2 text-japan-fuji" />
            Asset Vue
          </SheetTitle>
        </SheetHeader>
        
        <div className="py-2">
          <nav className="space-y-1 px-2">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    "flex items-center px-2 py-2 text-base rounded-md",
                    isActive
                      ? "bg-japan-sakura/15 text-japan-indigo font-medium"
                      : "text-japan-sumi hover:bg-japan-sand/50 hover:text-japan-indigo"
                  )
                }
                onClick={onClose}
              >
                <item.icon className={cn(
                  "mr-3 h-5 w-5 flex-shrink-0",
                  item.name === 'Dashboard' && "text-japan-matcha",
                  item.name === 'Search' && "text-japan-fuji",
                  item.name === 'Import Portfolio' && "text-japan-sakura"
                )} />
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
        
        <div className="pt-4 mt-4 border-t border-japan-sand bg-japan-shoji/50">
          <div className="px-2">
            <h3 className="px-3 text-xs font-semibold text-japan-tea uppercase tracking-wider">
              More Options
            </h3>
            <nav className="mt-2 space-y-1">
              {secondaryNavigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center px-2 py-2 text-base rounded-md",
                      isActive
                        ? "bg-japan-sakura/15 text-japan-indigo font-medium"
                        : "text-japan-sumi hover:bg-japan-sand/50 hover:text-japan-indigo"
                    )
                  }
                  onClick={onClose}
                >
                  <item.icon className={cn(
                    "mr-3 h-5 w-5 flex-shrink-0",
                    item.name === 'Market Analytics' && "text-japan-hinoki",
                    item.name === 'Settings' && "text-japan-tea",
                    item.name === 'Help & Support' && "text-japan-fuji"
                  )} />
                  {item.name}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AppDrawer;
