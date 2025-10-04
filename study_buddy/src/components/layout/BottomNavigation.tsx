import { useState } from 'react';
import { Home, Users, MessageCircle, Bot, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'match', label: 'Match', icon: Users },
  { id: 'chat', label: 'Chat', icon: MessageCircle },
  { id: 'ai', label: 'AI', icon: Bot },
  { id: 'profile', label: 'Profile', icon: User },
];

export function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card/80 backdrop-blur-lg border-t border-border z-50">
      <div className="flex items-center justify-around px-2 py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "flex flex-col items-center justify-center p-3 rounded-2xl transition-all duration-300 relative overflow-hidden",
                isActive 
                  ? "bg-gradient-primary text-primary-foreground shadow-glow scale-110" 
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50 hover:scale-105"
              )}
            >
              {isActive && (
                <div className="absolute inset-0 bg-gradient-primary opacity-20 animate-pulse rounded-2xl"></div>
              )}
              <Icon size={20} className="relative z-10" />
              <span className={cn(
                "text-xs mt-1 font-medium relative z-10 transition-all duration-300",
                isActive ? "font-bold" : ""
              )}>
                {tab.label}
              </span>
              {isActive && (
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary-foreground rounded-full"></div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}