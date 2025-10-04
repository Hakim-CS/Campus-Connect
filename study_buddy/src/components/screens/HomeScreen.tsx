import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ThemeSwitch } from '@/components/ui/theme-switch';
import { Users, MessageCircle, Clock, TrendingUp, Target, BookOpen, Sparkles, Zap } from 'lucide-react';
import heroStudents from '@/assets/hero-students.jpg';
import fotoStudents from '@/assets/foto-students.jpg';
import collage from '@/assets/collage.png';
import collage1 from '@/assets/collage_1.jpg';
import collage2 from '@/assets/collage_2.jpg';
import { cn } from '@/lib/utils';

export function HomeScreen() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Hero carousel images with different study scenarios
  const heroImages = [
    {
      src: heroStudents,
      title: "Join Study Groups",
      subtitle: "Find your perfect study partners and level up together!",
      badge: "🔥 Trending",
      icon: <Zap className="w-5 h-5 text-yellow-400" />
    },
    {
      src: fotoStudents,
      title: "Study Together",
      subtitle: "Collaborative learning that makes studying fun and effective!",
      badge: "✨ Popular",
      icon: <Sparkles className="w-5 h-5 text-blue-400" />
    },
    {
      src: collage,
      title: "Campus Life",
      subtitle: "Experience the vibrant student community and make memories!",
      badge: "� Moments",
      icon: <Target className="w-5 h-5 text-green-400" />
    },
    {
      src: collage1,
      title: "Study Success",
      subtitle: "Achieve your academic goals with peer support and motivation!",
      badge: "� Goals",
      icon: <BookOpen className="w-5 h-5 text-purple-400" />
    },
    {
      src: collage2,
      title: "Connect & Learn",
      subtitle: "Build lasting friendships while excelling in your studies!",
      badge: "🤝 Friends",
      icon: <Users className="w-5 h-5 text-cyan-400" />
    }
  ];

  // Auto-rotate carousel every 3 seconds, pause on hover
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [heroImages.length, isPaused]);

  const stats = [
    { label: 'Study Partners', value: '12', icon: Users, color: 'text-primary' },
    { label: 'Messages', value: '47', icon: MessageCircle, color: 'text-success' },
    { label: 'Study Hours', value: '23h', icon: Clock, color: 'text-warning' },
    { label: 'Goals Completed', value: '8', icon: Target, color: 'text-primary' },
  ];

  const recentActivity = [
    { type: 'match', text: 'New match with Sarah from Computer Science', time: '2 min ago', emoji: '✨' },
    { type: 'study', text: 'Completed 2-hour study session for Physics', time: '1 hour ago', emoji: '🚀' },
    { type: 'message', text: 'New message in "Data Structures Study Group"', time: '3 hours ago', emoji: '💬' },
    { type: 'goal', text: 'Achieved goal: Complete React Native course', time: '1 day ago', emoji: '🎯' },
  ];

  const studyGoals = [
    { subject: 'Machine Learning', progress: 75, deadline: '3 days', emoji: '🤖' },
    { subject: 'Database Design', progress: 40, deadline: '1 week', emoji: '🗄️' },
    { subject: 'Mobile Development', progress: 90, deadline: '2 days', emoji: '📱' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header with Theme Switch */}
      <div className="p-6 bg-gradient-subtle relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-primary opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-primary opacity-5 rounded-full blur-2xl"></div>
        
        <div className="flex items-center justify-between mb-4 relative z-10">
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              Good morning, Alex! 
              <Sparkles className="w-6 h-6 text-primary animate-pulse" />
            </h1>
            <p className="text-muted-foreground">Ready to connect and learn today?</p>
          </div>
          <div className="flex items-center gap-3">
            <ThemeSwitch />
            <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow">
              <span className="text-primary-foreground font-bold">A</span>
            </div>
          </div>
        </div>
        
        {/* Hero Carousel with Auto-rotation */}
        <div 
          className="relative rounded-2xl overflow-hidden mb-4 card-hover group"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative h-72 sm:h-80 md:h-96">
            {heroImages.map((image, index) => (
              <div
                key={index}
                className={cn(
                  "absolute inset-0 transition-all duration-1000 ease-in-out",
                  index === currentSlide
                    ? "opacity-100 transform scale-100"
                    : "opacity-0 transform scale-105"
                )}
              >
                <img 
                  src={image.src} 
                  alt={image.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end">
                  <div className="p-6 text-white">
                    <h3 className="font-semibold text-xl flex items-center gap-2 mb-2">
                      {image.title}
                      {image.icon}
                    </h3>
                    <p className="text-base opacity-90 leading-relaxed">{image.subtitle}</p>
                  </div>
                </div>
                <div className="absolute top-4 right-4 bg-primary/20 backdrop-blur-sm rounded-full px-4 py-2">
                  <span className="text-white text-sm font-medium">{image.badge}</span>
                </div>
                
                {/* Pause indicator */}
                {isPaused && (
                  <div className="absolute top-4 left-4 bg-black/30 backdrop-blur-sm rounded-full px-3 py-1">
                    <span className="text-white text-xs">⏸️ Paused</span>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Navigation arrows */}
          <button
            onClick={() => setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length)}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded-full p-2 text-white transition-all duration-200 opacity-0 group-hover:opacity-100"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % heroImages.length)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded-full p-2 text-white transition-all duration-200 opacity-0 group-hover:opacity-100"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          {/* Carousel Indicators */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={cn(
                  "h-2 rounded-full transition-all duration-300 hover:bg-white/75",
                  index === currentSlide
                    ? "bg-white w-8"
                    : "bg-white/50 w-2"
                )}
              />
            ))}
          </div>
          
          {/* Auto-rotation progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
            <div 
              className={cn(
                "h-full bg-gradient-primary transition-all ease-linear",
                isPaused ? "duration-0" : "duration-3000"
              )}
              style={{
                width: isPaused ? '100%' : `${((currentSlide + 1) / heroImages.length) * 100}%`
              }}
            />
          </div>
        </div>
      </div>

      {/* Quick Stats with enhanced design */}
      <div className="px-6 py-4">
        <h2 className="text-lg font-semibold mb-3 text-foreground flex items-center gap-2">
          Your Progress 
          <TrendingUp className="w-5 h-5 text-success" />
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="p-4 bg-gradient-card border border-border card-hover btn-modern relative overflow-hidden">
                <div className="flex items-center justify-between relative z-10">
                  <div>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                  <div className="p-2 rounded-xl bg-primary/10">
                    <Icon className={cn("w-6 h-6", stat.color)} />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Study Goals with progress animations */}
      <div className="px-6 py-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            Study Goals 
            <Target className="w-5 h-5 text-primary" />
          </h2>
          <Button variant="ghost" size="sm" className="btn-modern">View All</Button>
        </div>
        <div className="space-y-3">
          {studyGoals.map((goal, index) => (
            <Card key={index} className="p-4 bg-gradient-card border border-border card-hover">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-foreground flex items-center gap-2">
                  <span className="text-lg">{goal.emoji}</span>
                  {goal.subject}
                </h3>
                <Badge variant="outline" className="text-xs bg-primary/10 border-primary/20">
                  ⏰ {goal.deadline}
                </Badge>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-secondary rounded-full h-3 overflow-hidden">
                  <div 
                    className="h-3 rounded-full transition-all duration-1000 ease-out gradient-animate"
                    style={{ width: `${goal.progress}%` }}
                  />
                </div>
                <span className="text-sm text-muted-foreground font-bold min-w-[3rem] text-right">
                  {goal.progress}%
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Activity with emojis */}
      <div className="px-6 py-4">
        <h2 className="text-lg font-semibold mb-3 text-foreground flex items-center gap-2">
          Recent Activity 
          <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
        </h2>
        <div className="space-y-3">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border card-hover">
              <div className="text-lg float-gentle" style={{ animationDelay: `${index * 0.5}s` }}>
                {activity.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground font-medium">{activity.text}</p>
                <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions with modern styling */}
      <div className="px-6 py-4 mb-6">
        <h2 className="text-lg font-semibold mb-3 text-foreground">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-4">
          <Button 
            variant="outline" 
            className="h-20 flex-col bg-gradient-primary text-primary-foreground border-0 btn-modern card-hover shadow-glow"
          >
            <Users className="w-6 h-6 mb-2" />
            <span className="text-sm font-semibold">Find Partners</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-20 flex-col bg-gradient-card border-primary/20 btn-modern card-hover"
          >
            <BookOpen className="w-6 h-6 mb-2 text-primary" />
            <span className="text-sm font-semibold">Start Session</span>
          </Button>
        </div>
      </div>
    </div>
  );
}