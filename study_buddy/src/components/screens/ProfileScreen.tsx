import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { 
  Settings, 
  Edit, 
  MapPin, 
  BookOpen, 
  Target, 
  Users, 
  MessageCircle, 
  Clock,
  Trophy,
  Bell,
  Eye,
  Shield,
  HelpCircle,
  LogOut
} from 'lucide-react';
import profileImage1 from '@/assets/profile-1.jpg';

export function ProfileScreen() {
  const userProfile = {
    name: 'Alex Johnson',
    age: 21,
    university: 'Stanford University',
    degree: 'Computer Science',
    year: 'Junior',
    bio: 'Passionate about web development and machine learning. Always excited to collaborate on innovative projects and help fellow students succeed!',
    interests: ['React', 'Node.js', 'Machine Learning', 'UI/UX Design', 'Mobile Development'],
    studyGoals: ['Master React Native', 'Complete AI/ML specialization', 'Build startup MVP', 'Contribute to open source'],
    location: 'Palo Alto, CA'
  };

  const stats = [
    { label: 'Study Partners', value: 24, icon: Users },
    { label: 'Study Hours', value: 156, icon: Clock },
    { label: 'Messages Sent', value: 423, icon: MessageCircle },
    { label: 'Goals Achieved', value: 12, icon: Trophy },
  ];

  const settingsGroups = [
    {
      title: 'Preferences',
      items: [
        { icon: Bell, label: 'Push Notifications', hasSwitch: true, enabled: true },
        { icon: Eye, label: 'Profile Visibility', hasSwitch: true, enabled: true },
        { icon: MapPin, label: 'Show Location', hasSwitch: true, enabled: false },
      ]
    },
    {
      title: 'Account',
      items: [
        { icon: Shield, label: 'Privacy & Safety', hasSwitch: false },
        { icon: HelpCircle, label: 'Help & Support', hasSwitch: false },
        { icon: Settings, label: 'Account Settings', hasSwitch: false },
      ]
    }
  ];

  return (
    <div className="flex flex-col bg-background">
      {/* Header */}
      <div className="relative">
        <div className="h-32 bg-gradient-primary" />
        <div className="absolute -bottom-12 left-6">
          <div className="w-24 h-24 rounded-full border-4 border-background overflow-hidden bg-card">
            <img 
              src={profileImage1} 
              alt={userProfile.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <Button 
          variant="outline" 
          size="icon"
          className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm"
        >
          <Settings size={18} />
        </Button>
      </div>

      {/* Profile Info */}
      <div className="pt-16 px-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-foreground">{userProfile.name}</h1>
            <p className="text-muted-foreground">{userProfile.age} • {userProfile.year}</p>
            <div className="flex items-center gap-1 mt-1">
              <MapPin size={14} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{userProfile.location}</span>
            </div>
          </div>
          <Button variant="outline" size="sm">
            <Edit size={16} className="mr-2" />
            Edit
          </Button>
        </div>

        {/* University Info */}
        <Card className="p-4 mb-4 bg-gradient-card border border-border">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="w-5 h-5 text-primary" />
            <span className="font-medium text-foreground">{userProfile.university}</span>
          </div>
          <p className="text-sm text-muted-foreground">{userProfile.degree}</p>
        </Card>

        {/* Bio */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-foreground mb-2">About</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{userProfile.bio}</p>
        </div>

        {/* Stats Grid */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-foreground mb-3">Activity</h3>
          <div className="grid grid-cols-2 gap-3">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="p-4 bg-gradient-card border border-border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </div>
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Interests */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-foreground mb-3">Interests</h3>
          <div className="flex flex-wrap gap-2">
            {userProfile.interests.map((interest, index) => (
              <Badge key={index} variant="secondary" className="bg-card border border-border">
                {interest}
              </Badge>
            ))}
          </div>
        </div>

        {/* Study Goals */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Target className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Study Goals</h3>
          </div>
          <div className="space-y-2">
            {userProfile.studyGoals.map((goal, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-card border border-border">
                <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                <span className="text-sm text-foreground">{goal}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Settings */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-foreground mb-4">Settings</h3>
          <div className="space-y-6">
            {settingsGroups.map((group, groupIndex) => (
              <div key={groupIndex}>
                <h4 className="text-sm font-medium text-muted-foreground mb-3">{group.title}</h4>
                <Card className="divide-y divide-border bg-card border border-border">
                  {group.items.map((item, itemIndex) => {
                    const Icon = item.icon;
                    return (
                      <div key={itemIndex} className="flex items-center justify-between p-4">
                        <div className="flex items-center gap-3">
                          <Icon className="w-5 h-5 text-muted-foreground" />
                          <span className="text-foreground">{item.label}</span>
                        </div>
                        {item.hasSwitch ? (
                          <Switch defaultChecked={item.enabled} />
                        ) : (
                          <span className="text-muted-foreground">→</span>
                        )}
                      </div>
                    );
                  })}
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Logout */}
        <div className="pb-8">
          <Button variant="destructive" className="w-full">
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
}