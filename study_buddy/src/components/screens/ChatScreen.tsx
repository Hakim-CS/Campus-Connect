import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, MessageCircle, Users, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatPreview {
  id: string;
  name: string;
  isGroup: boolean;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  avatar: string;
  isOnline: boolean;
  memberCount?: number;
}

const chatPreviews: ChatPreview[] = [
  {
    id: '1',
    name: 'Emma Chen',
    isGroup: false,
    lastMessage: 'Hey! Are you free to study for the ML exam tomorrow?',
    timestamp: '2 min',
    unreadCount: 2,
    avatar: '/placeholder.svg',
    isOnline: true
  },
  {
    id: '2',
    name: 'CS Study Group',
    isGroup: true,
    lastMessage: 'Marcus: Just shared the notes from today\'s lecture',
    timestamp: '15 min',
    unreadCount: 5,
    avatar: '/placeholder.svg',
    isOnline: false,
    memberCount: 8
  },
  {
    id: '3',
    name: 'Sarah Kim',
    isGroup: false,
    lastMessage: 'Thanks for the help with the assignment! 🙏',
    timestamp: '1 hour',
    unreadCount: 0,
    avatar: '/placeholder.svg',
    isOnline: false
  },
  {
    id: '4',
    name: 'Data Science Bootcamp',
    isGroup: true,
    lastMessage: 'Elena: Who wants to form a project team?',
    timestamp: '2 hours',
    unreadCount: 12,
    avatar: '/placeholder.svg',
    isOnline: false,
    memberCount: 24
  },
  {
    id: '5',
    name: 'Alex Rodriguez',
    isGroup: false,
    lastMessage: 'The library study room is booked for 3 PM',
    timestamp: '1 day',
    unreadCount: 0,
    avatar: '/placeholder.svg',
    isOnline: true
  }
];

export function ChatScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState<'all' | 'groups'>('all');

  const filteredChats = chatPreviews.filter(chat => {
    const matchesSearch = chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = selectedTab === 'all' || (selectedTab === 'groups' && chat.isGroup);
    return matchesSearch && matchesTab;
  });

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="p-6 bg-gradient-subtle border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Messages</h1>
            <p className="text-muted-foreground">
              {chatPreviews.reduce((acc, chat) => acc + chat.unreadCount, 0)} unread messages
            </p>
          </div>
          <Button variant="floating" size="icon">
            <Plus size={20} />
          </Button>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          <Input
            placeholder="Search messages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-card border-border"
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-2">
          <Button
            variant={selectedTab === 'all' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setSelectedTab('all')}
            className="flex-1"
          >
            <MessageCircle size={16} className="mr-2" />
            All Chats
          </Button>
          <Button
            variant={selectedTab === 'groups' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setSelectedTab('groups')}
            className="flex-1"
          >
            <Users size={16} className="mr-2" />
            Groups
          </Button>
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {filteredChats.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-foreground mb-1">No messages</h3>
              <p className="text-muted-foreground">Start a conversation with your study partners!</p>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filteredChats.map((chat) => (
              <button
                key={chat.id}
                className="w-full p-4 hover:bg-secondary transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center">
                      {chat.isGroup ? (
                        <Users className="w-6 h-6 text-primary-foreground" />
                      ) : (
                        <span className="text-primary-foreground font-bold">
                          {chat.name.charAt(0)}
                        </span>
                      )}
                    </div>
                    {!chat.isGroup && chat.isOnline && (
                      <div className="absolute -bottom-0 -right-0 w-4 h-4 bg-success rounded-full border-2 border-background" />
                    )}
                  </div>

                  {/* Chat Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-foreground truncate">
                          {chat.name}
                        </h3>
                        {chat.isGroup && chat.memberCount && (
                          <Badge variant="secondary" className="text-xs">
                            {chat.memberCount}
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">
                          {chat.timestamp}
                        </span>
                        {chat.unreadCount > 0 && (
                          <Badge className="bg-primary text-primary-foreground min-w-[20px] h-5 text-xs">
                            {chat.unreadCount > 99 ? '99+' : chat.unreadCount}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <p className={cn(
                      "text-sm truncate",
                      chat.unreadCount > 0 ? "text-foreground font-medium" : "text-muted-foreground"
                    )}>
                      {chat.lastMessage}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="p-4 bg-card border-t border-border">
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1">
            <Users className="w-4 h-4 mr-2" />
            Create Group
          </Button>
          <Button variant="outline" className="flex-1">
            <Clock className="w-4 h-4 mr-2" />
            Study Session
          </Button>
        </div>
      </div>
    </div>
  );
}