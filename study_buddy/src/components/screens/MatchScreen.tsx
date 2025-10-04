import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X, Heart, MapPin, BookOpen, Target, Sparkles, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import profileImage1 from '@/assets/profile-1.jpg';
import student2 from '@/assets/students/student2.jpg';
import student3 from '@/assets/students/student3.jpg';
import student4 from '@/assets/students/student4.jpg';
import student5 from '@/assets/students/student5.jpg';

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
    interests: ['React', 'Machine Learning', 'UI/UX', 'Mobile Dev'],
    studyGoals: ['Master React Native', 'Complete ML course', 'Build portfolio', 'Ace algorithms'],
    bio: 'Passionate about creating user-friendly applications and exploring AI. Looking for study partners for group projects and exam prep! Always down for coding sessions with coffee ☕️ 🚀',
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
    interests: ['Python', 'Statistics', 'Data Viz', 'Deep Learning'],
    studyGoals: ['Master TensorFlow', 'Complete thesis', 'Land internship', 'Publish research'],
    bio: 'Data science enthusiast with a love for solving complex problems. Always ready to collaborate on challenging projects! Love turning data into stories 📊✨',
    image: student2,
    distance: '1.2 miles away',
    compatibility: 87
  },
  {
    id: '3',
    name: 'Sophia Williams',
    age: 19,
    university: 'UC Berkeley',
    degree: 'Psychology & Neuroscience',
    year: 'Sophomore',
    interests: ['Cognitive Science', 'Research Methods', 'SPSS', 'Behavioral Analysis'],
    studyGoals: ['Ace statistics', 'Join research lab', 'Learn R programming', 'Present at conference'],
    bio: 'Fascinated by how the mind works and passionate about mental health research. Looking for study buddies who love discussing psychology theories over bubble tea! 🧠💫',
    image: student3,
    distance: '2.1 miles away',
    compatibility: 92
  },
  {
    id: '4',
    name: 'Alex Thompson',
    age: 22,
    university: 'MIT',
    degree: 'Mechanical Engineering',
    year: 'Senior',
    interests: ['Robotics', 'CAD Design', 'Arduino', 'Sustainability'],
    studyGoals: ['Master thermodynamics', 'Build senior project', 'Learn advanced materials', 'Get into grad school'],
    bio: 'Engineering student who loves building things that make a difference. Currently working on sustainable energy solutions. Always excited to brainstorm innovative ideas! 🔧⚡️',
    image: student4,
    distance: '3.5 miles away',
    compatibility: 89
  },
  {
    id: '5',
    name: 'Maya Patel',
    age: 20,
    university: 'Harvard University',
    degree: 'Business & Economics',
    year: 'Junior',
    interests: ['Entrepreneurship', 'Finance', 'Marketing', 'Social Impact'],
    studyGoals: ['Master financial modeling', 'Launch startup idea', 'Network with VCs', 'Study abroad prep'],
    bio: 'Future entrepreneur passionate about creating businesses that solve real-world problems. Love connecting with like-minded innovators and discussing the latest trends! 💼🌟',
    image: student5,
    distance: '1.8 miles away',
    compatibility: 94
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

      {/* Profile Card with Side Action Buttons */}
      <div className="flex-1 p-4 flex items-center justify-center">
        <div className="relative w-full max-w-4xl">
          {/* Compatibility Badge */}
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 z-20">
            <Badge className="bg-gradient-primary text-primary-foreground shadow-glow px-4 py-1">
              <Star className="w-3 h-3 mr-1" />
              {currentProfile.compatibility}% Match
            </Badge>
          </div>
          
          {/* Main Card Container with Side Buttons */}
          <div className="relative flex items-center gap-6">
            {/* Left Reject Button */}
            <div className="flex flex-col items-center flex-shrink-0">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleSwipe('left')}
                disabled={isAnimating}
                className="w-14 h-14 rounded-full border-2 border-destructive/30 text-destructive hover:bg-destructive hover:text-destructive-foreground transition-all duration-300 hover:scale-110 btn-modern relative overflow-hidden group shadow-lg"
              >
                <X size={24} className="relative z-10" />
                <div className="absolute inset-0 bg-destructive/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
              </Button>
              <span className="text-xs text-muted-foreground mt-2 font-medium">Pass</span>
            </div>

            {/* Expanded Center Profile Card */}
            <Card 
              className={cn(
                "relative overflow-hidden bg-gradient-card border-border shadow-elevated transition-all duration-500 card-hover flex-1 max-w-2xl",
                isAnimating && animationType === 'left' && "animate-swipe-left",
                isAnimating && animationType === 'right' && "animate-swipe-right"
              )}
            >
              {/* Profile Image - Extended Length */}
              <div className="relative h-[28rem] overflow-hidden">
                <img 
                  src={currentProfile.image} 
                  alt={currentProfile.name}
                  className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                
                {/* Floating sparkles */}
                <div className="absolute top-4 right-4">
                  <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
                </div>
                
                {/* Basic Info Overlay */}
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <div className="flex items-center gap-3 mb-3">
                    <h2 className="text-3xl font-bold">{currentProfile.name}</h2>
                    <span className="text-xl opacity-90">{currentProfile.age}</span>
                  </div>
                  <div className="flex items-center gap-1 text-base opacity-90 mb-2">
                    <MapPin size={16} />
                    <span>{currentProfile.distance}</span>
                  </div>
                  <div className="flex items-center gap-1 text-base opacity-90">
                    <BookOpen size={16} />
                    <span>{currentProfile.degree} • {currentProfile.year}</span>
                  </div>
                </div>
              </div>

              {/* Expanded Profile Details */}
              <div className="p-6 space-y-5">
                {/* University */}
                <div className="bg-secondary/30 rounded-xl p-4">
                  <p className="text-sm text-muted-foreground mb-2 uppercase tracking-wide font-medium">University</p>
                  <p className="font-bold text-foreground text-lg">{currentProfile.university}</p>
                </div>

                {/* Bio */}
                <div>
                  <p className="text-sm text-muted-foreground mb-3 uppercase tracking-wide font-medium">About</p>
                  <p className="text-base text-foreground leading-relaxed">{currentProfile.bio}</p>
                </div>

                {/* Interests - Expanded Layout */}
                <div>
                  <p className="text-sm text-muted-foreground mb-3 uppercase tracking-wide flex items-center gap-2 font-medium">
                    <Sparkles size={14} />
                    Interests & Skills
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {currentProfile.interests.map((interest, index) => (
                      <Badge 
                        key={index} 
                        variant="secondary" 
                        className="text-sm bg-gradient-to-r from-primary/10 to-primary/5 text-primary border-primary/20 hover:bg-primary/20 transition-all duration-300 hover:scale-105 justify-center py-2"
                      >
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Study Goals - Expanded Layout */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Target size={16} className="text-primary" />
                    <p className="text-sm text-muted-foreground uppercase tracking-wide font-medium">Study Goals</p>
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                    {currentProfile.studyGoals.map((goal, index) => (
                      <div key={index} className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-secondary/20 to-secondary/10 hover:from-primary/10 hover:to-primary/5 transition-all duration-300 border border-border/50">
                        <div className="w-3 h-3 rounded-full bg-gradient-primary flex-shrink-0" />
                        <p className="text-sm text-foreground font-medium">{goal}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Additional Info Row */}
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="text-center p-3 rounded-lg bg-success/10 border border-success/20">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Study Style</p>
                    <p className="text-sm font-semibold text-success">Collaborative</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-primary/10 border border-primary/20">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Availability</p>
                    <p className="text-sm font-semibold text-primary">Flexible</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Right Accept Button */}
            <div className="flex flex-col items-center flex-shrink-0">
              <Button
                variant="default"
                size="icon"
                onClick={() => handleSwipe('right')}
                disabled={isAnimating}
                className="w-16 h-16 rounded-full bg-gradient-primary text-primary-foreground border-0 hover:scale-110 transition-all duration-300 shadow-glow btn-modern relative overflow-hidden group"
              >
                <Heart size={28} className="relative z-10" />
                <div className="absolute inset-0 bg-white/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
              </Button>
              <span className="text-xs text-primary font-bold mt-2">Connect</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div className="p-4 bg-card/80 backdrop-blur-sm border-t border-border">
        {/* Profile counter */}
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-muted-foreground">
            {currentProfileIndex + 1} of {sampleProfiles.length}
          </span>
          <div className="flex gap-2">
            {sampleProfiles.map((_, index) => (
              <div
                key={index}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  index === currentProfileIndex
                    ? "bg-primary w-6"
                    : index < currentProfileIndex
                    ? "bg-success"
                    : "bg-muted"
                )}
              />
            ))}
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            <span className="text-destructive font-bold">Pass</span> or <span className="text-primary font-bold">Connect</span> to find your study buddy!
          </p>
        </div>
      </div>
    </div>
  );
}