import { useState } from 'react';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { HomeScreen } from '@/components/screens/HomeScreen';
import { MatchScreen } from '@/components/screens/MatchScreen';
import { ChatScreen } from '@/components/screens/ChatScreen';
import { AIScreen } from '@/components/screens/AIScreen';
import { ProfileScreen } from '@/components/screens/ProfileScreen';

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');

  const renderScreen = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen />;
      case 'match':
        return <MatchScreen />;
      case 'chat':
        return <ChatScreen />;
      case 'ai':
        return <AIScreen />;
      case 'profile':
        return <ProfileScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <MobileLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderScreen()}
    </MobileLayout>
  );
};

export default Index;
