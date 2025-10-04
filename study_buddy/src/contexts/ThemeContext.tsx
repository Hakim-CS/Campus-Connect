import React, { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'dark' | 'light' | 'neon' | 'sunset' | 'ocean' | 'forest';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  themes: { value: Theme; label: string; colors: string[] }[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const themes = [
  { 
    value: 'dark' as Theme, 
    label: 'Dark Mode', 
    colors: ['#6366f1', '#8b5cf6', '#06b6d4']
  },
  { 
    value: 'light' as Theme, 
    label: 'Light Mode', 
    colors: ['#3b82f6', '#8b5cf6', '#06b6d4']
  },
  { 
    value: 'neon' as Theme, 
    label: 'Neon Vibes', 
    colors: ['#ff0080', '#00ff80', '#8000ff']
  },
  { 
    value: 'sunset' as Theme, 
    label: 'Sunset Glow', 
    colors: ['#ff6b35', '#f7931e', '#f15bb5']
  },
  { 
    value: 'ocean' as Theme, 
    label: 'Ocean Breeze', 
    colors: ['#0077be', '#00a8cc', '#7209b7']
  },
  { 
    value: 'forest' as Theme, 
    label: 'Forest Green', 
    colors: ['#2d5016', '#6a994e', '#a7c957']
  }
];

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('campus-connect-theme') as Theme;
    if (savedTheme && themes.find(t => t.value === savedTheme)) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('campus-connect-theme', theme);
    
    // Remove all theme classes
    const root = document.documentElement;
    root.classList.remove('dark', 'light', 'neon', 'sunset', 'ocean', 'forest');
    
    // Add current theme class
    root.classList.add(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}