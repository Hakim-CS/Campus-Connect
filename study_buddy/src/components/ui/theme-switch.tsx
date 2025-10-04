import { useState } from 'react';
import { Palette, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';

export function ThemeSwitch() {
  const { theme, setTheme, themes } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="relative bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 hover:border-primary/40 transition-all duration-300"
        >
          <Palette className="w-4 h-4 mr-2" />
          <span className="capitalize">{themes.find(t => t.value === theme)?.label}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4" align="end">
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Choose Your Vibe ✨</h3>
          <div className="grid grid-cols-1 gap-3">
            {themes.map((themeOption) => (
              <Card
                key={themeOption.value}
                className={cn(
                  "p-4 cursor-pointer transition-all duration-300 hover:scale-[1.02] border-2",
                  theme === themeOption.value
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50"
                )}
                onClick={() => {
                  setTheme(themeOption.value);
                  setOpen(false);
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex space-x-1">
                      {themeOption.colors.map((color, index) => (
                        <div
                          key={index}
                          className="w-4 h-4 rounded-full border border-white/20"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                    <span className="font-medium">{themeOption.label}</span>
                  </div>
                  {theme === themeOption.value && (
                    <Check className="w-5 h-5 text-primary" />
                  )}
                </div>
              </Card>
            ))}
          </div>
          <div className="text-sm text-muted-foreground text-center">
            Express yourself with the perfect theme! 🎨
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}