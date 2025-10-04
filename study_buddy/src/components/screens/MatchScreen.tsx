import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X, Heart, MapPin, BookOpen, Target, Sparkles, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import profileImage1 from '@/assets/profile-1.jpg';

interface StudentProfile {
  id: string;
  name: string;
  age: number;
  university: string;
  degree: string;
  year: string;
  interests: string[];
  studyGoals: string[];
  bio: string;
  image: string;
  distance: string;
  compatibility: number;
}

const sampleProfiles: StudentProfile[] = [
  {
    id: '1',
    name: 'Emma Chen',
    age: 20,
    university: 'Stanford University',
    degree: 'Computer Science',
    year: 'Junior',
    interests: ['React', 'Machine Learning', 'UI/UX'],
    studyGoals: ['Master React Native', 'Complete ML course', 'Build portfolio'],
    bio: 'Passionate about creating user-friendly applications and exploring AI. Looking for study partners for group projects and exam prep! 🚀',
    image: profileImage1,
    distance: '0.5 miles away',
    compatibility: 95
  },
  {
    id: '2',
    name: 'Marcus Rodriguez',
    age: 21,
    university: 'Stanford University',
    degree: 'Data Science',
    year: 'Senior',
    interests: ['Python', 'Statistics', 'Data Visualization'],
    studyGoals: ['Master TensorFlow', 'Complete thesis', 'Land internship'],
    bio: 'Data science enthusiast with a love for solving complex problems. Always ready to collaborate on challenging projects! 📊',
    image: '/placeholder.svg',
    distance: '1.2 miles away',
    compatibility: 87
  }
];

export function MatchScreen() {
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationType, setAnimationType] = useState<'left' | 'right' | null>(null);

  const currentProfile = sampleProfiles[currentProfileIndex];

  const handleSwipe = (direction: 'left' | 'right') => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setAnimationType(direction);
    
    setTimeout(() => {
      setCurrentProfileIndex((prev) => (prev + 1) % sampleProfiles.length);
      setIsAnimating(false);
      setAnimationType(null);
    }, 300);
  };

  if (!currentProfile) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">No more profiles</h2>
          <p className="text-muted-foreground">Check back later for new study partners!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="p-6 bg-gradient-subtle relative overflow-hidden">
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-primary opacity-10 rounded-full blur-2xl"></div>
        <div className="flex items-center justify-between relative z-10">
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              Discover ✨
            </h1>
            <p className="text-muted-foreground">Find your perfect study partner</p>
          </div>
          <Badge variant="outline" className="bg-primary/10 border-primary/20 text-primary">
            🔥 {sampleProfiles.length} nearby
          </Badge>
        </div>
      </div>

      {/* Profile Card */}
      <div className="flex-1 p-6 flex items-center justify-center">
        <div className="relative w-full max-w-sm">
          {/* Compatibility Badge */}
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 z-20">
            <Badge className="bg-gradient-primary text-primary-foreground shadow-glow px-4 py-1">
              <Star className="w-3 h-3 mr-1" />
              {currentProfile.compatibility}% Match
            </Badge>
          </div>
          
          <Card 
            className={cn(
              "relative overflow-hidden bg-gradient-card border-border shadow-elevated transition-all duration-500 card-hover",
              isAnimating && animationType === 'left' && "animate-swipe-left",
              isAnimating && animationType === 'right' && "animate-swipe-right"
            )}
          >
            {/* Profile Image */}
            <div className="relative h-80 overflow-hidden">
              <img 
                src={currentProfile.image} 
                alt={currentProfile.name}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              
              {/* Floating sparkles */}
              <div className="absolute top-4 right-4">
                <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
              </div>
              
              {/* Basic Info Overlay */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-2xl font-bold">{currentProfile.name}</h2>
                  <span className="text-lg opacity-90">{currentProfile.age}</span>
                </div>
                <div className="flex items-center gap-1 text-sm opacity-90 mb-1">
                  <MapPin size={14} />
                  <span>{currentProfile.distance}</span>
                </div>
                <div className="flex items-center gap-1 text-sm opacity-90">
                  <BookOpen size={14} />
                  <span>{currentProfile.degree} • {currentProfile.year}</span>
                </div>
              </div>
            </div>

            {/* Profile Details */}
            <div className="p-6 space-y-5">
              {/* University */}
              <div className="bg-secondary/30 rounded-lg p-3">
                <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">University</p>
                <p className="font-semibold text-foreground">{currentProfile.university}</p>
              </div>

              {/* Bio */}
              <div>
                <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wide">About</p>
                <p className="text-sm text-foreground leading-relaxed">{currentProfile.bio}</p>
              </div>

              {/* Interests */}
              <div>
                <p className="text-xs text-muted-foreground mb-3 uppercase tracking-wide">Interests</p>
                <div className="flex flex-wrap gap-2">
                  {currentProfile.interests.map((interest, index) => (
                    <Badge 
                      key={index} 
                      variant="secondary" 
                      className="text-xs bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors"
                    >
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Study Goals */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Target size={16} className="text-primary" />
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Study Goals</p>
                </div>
                <div className="space-y-2">
                  {currentProfile.studyGoals.map((goal, index) => (
                    <div key={index} className="flex items-center gap-3 p-2 rounded-lg bg-secondary/20">
                      <div className="w-2 h-2 rounded-full bg-gradient-primary" />
                      <p className="text-sm text-foreground">{goal}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-6 bg-card/80 backdrop-blur-sm border-t border-border">
        <div className="flex items-center justify-center gap-8">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleSwipe('left')}
            disabled={isAnimating}
            className="w-16 h-16 rounded-full border-2 border-destructive/20 text-destructive hover:bg-destructive hover:text-destructive-foreground transition-all duration-300 hover:scale-110 btn-modern"
          >
            <X size={32} />
          </Button>
          
          <Button
            variant="default"
            size="icon"
            onClick={() => handleSwipe('right')}
            disabled={isAnimating}
            className="w-20 h-20 rounded-full bg-gradient-primary text-primary-foreground border-0 hover:scale-110 transition-all duration-300 shadow-glow btn-modern"
          >
            <Heart size={36} />
          </Button>
        </div>
        
        <div className="text-center mt-4">
          <p className="text-xs text-muted-foreground">
            Tap <span className="text-destructive font-bold">✕</span> to pass or <span className="text-primary font-bold">♡</span> to connect and study together!
          </p>
        </div>
      </div>
    </div>
  );
}