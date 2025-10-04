import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Send, Bot, User, Sparkles, BookOpen, Calculator, Brain, Code } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const quickPrompts = [
  { icon: BookOpen, text: "Help me study for my midterm", category: "Study" },
  { icon: Calculator, text: "Explain this math concept", category: "Math" },
  { icon: Brain, text: "Create a study schedule", category: "Planning" },
  { icon: Code, text: "Debug my code", category: "Programming" },
];

export function AIScreen() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your AI study assistant. I can help you with explanations, study plans, homework, and more. What would you like to work on today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = (text: string = inputText) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "I understand you'd like help with that. Let me break this down for you step by step. Here's how we can approach this topic...",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickPrompt = (prompt: string) => {
    handleSendMessage(prompt);
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="p-6 bg-gradient-subtle border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
            <Bot className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">AI Study Assistant</h1>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <p className="text-sm text-muted-foreground">Online and ready to help</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Prompts */}
      {messages.length === 1 && (
        <div className="p-4 border-b border-border">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Quick Start</h3>
          <div className="grid grid-cols-2 gap-2">
            {quickPrompts.map((prompt, index) => {
              const Icon = prompt.icon;
              return (
                <Button
                  key={index}
                  variant="outline"
                  onClick={() => handleQuickPrompt(prompt.text)}
                  className="h-auto p-3 flex flex-col items-start text-left"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Icon className="w-4 h-4 text-primary" />
                    <Badge variant="secondary" className="text-xs">
                      {prompt.category}
                    </Badge>
                  </div>
                  <span className="text-sm">{prompt.text}</span>
                </Button>
              );
            })}
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex gap-3",
              message.isUser ? "justify-end" : "justify-start"
            )}
          >
            {!message.isUser && (
              <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-primary-foreground" />
              </div>
            )}
            
            <div
              className={cn(
                "max-w-[80%] rounded-2xl p-3",
                message.isUser
                  ? "bg-gradient-primary text-primary-foreground ml-12"
                  : "bg-card border border-border"
              )}
            >
              <p className="text-sm leading-relaxed">{message.text}</p>
              <p className={cn(
                "text-xs mt-1 opacity-70",
                message.isUser ? "text-primary-foreground" : "text-muted-foreground"
              )}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>

            {message.isUser && (
              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4 text-secondary-foreground" />
              </div>
            )}
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex gap-3 justify-start">
            <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0">
              <Bot className="w-4 h-4 text-primary-foreground" />
            </div>
            <div className="bg-card border border-border rounded-2xl p-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 bg-card border-t border-border">
        <div className="flex gap-2">
          <Input
            placeholder="Ask me anything about your studies..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1 bg-background border-border"
          />
          <Button
            onClick={() => handleSendMessage()}
            disabled={!inputText.trim() || isTyping}
            size="icon"
            className="flex-shrink-0"
          >
            <Send size={18} />
          </Button>
        </div>
        
        <div className="flex items-center justify-center mt-2">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Sparkles className="w-3 h-3" />
            <span>Powered by advanced AI • Always here to help</span>
          </div>
        </div>
      </div>
    </div>
  );
}