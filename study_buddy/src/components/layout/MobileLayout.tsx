import { ReactNode } from 'react';
import { BottomNavigation } from './BottomNavigation';

interface MobileLayoutProps {
  children: ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
  hideBottomNav?: boolean;
}

export function MobileLayout({ children, activeTab, onTabChange, hideBottomNav = false }: MobileLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Main content area */}
      <main className={cn("flex-1 overflow-y-auto", !hideBottomNav && "pb-20")}>
        {children}
      </main>
      
      {/* Bottom navigation */}
      {!hideBottomNav && (
        <BottomNavigation activeTab={activeTab} onTabChange={onTabChange} />
      )}
    </div>
  );
}

// Re-export for convenience
import { cn } from '@/lib/utils';