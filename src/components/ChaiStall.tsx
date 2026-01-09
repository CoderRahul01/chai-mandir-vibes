import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChatInterface } from './ChatInterface';
import chaiStallBg from "@/assets/chai-stall-bg.jpg";

const chaiOptions = [
  { name: 'Cutting Chai', price: '₹10', description: 'Classic half cup of strong tea' },
  { name: 'Masala Chai', price: '₹15', description: 'Spiced tea with cardamom and ginger' },
  { name: 'Ginger Chai', price: '₹12', description: 'Refreshing tea with fresh ginger' },
  { name: 'Kulhad Chai', price: '₹20', description: 'Traditional tea served in clay cup' },
];

interface ChaiStallProps {
  onChatWithAI: (message: string) => void;
  aiResponse: string;
  isLoading: boolean;
}

interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
}

export const ChaiStall = ({ onChatWithAI, aiResponse, isLoading }: ChaiStallProps) => {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);

  const handleOrderChai = (chaiName: string) => {
    const orderMessage = `I'd like to order ${chaiName}. Tell me about it in your typical chaiwala style!`;
    setChatHistory(prev => [...prev, { sender: 'user', text: orderMessage }]);
    onChatWithAI(orderMessage);
    
    if ((window as any).playChaiSound) {
      (window as any).playChaiSound();
    }
  };

  const handleSendMessage = (message: string) => {
    setChatHistory(prev => [...prev, { sender: 'user', text: message }]);
    onChatWithAI(message);
  };

  useEffect(() => {
    if (aiResponse) {
      setChatHistory(prev => [...prev, { sender: 'ai', text: aiResponse }]);
    }
  }, [aiResponse]);

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url(${chaiStallBg})` }}
    >
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black/40"></div>
      
      <div className="relative z-10 container mx-auto px-4 pt-20 pb-8">
        <div className="max-w-6xl mx-auto">
          {/* Welcome Section */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
              🫖 राम राम साहब! Welcome to our Chai Stall
            </h2>
            <p className="text-xl text-white/90 drop-shadow">
              Order your favorite chai and chat with our friendly chaiwala!
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Chai Menu */}
            <Card className="p-6 bg-card/90 backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-4 text-chai-brown">Chai Menu</h3>
              <div className="grid gap-4">
                {chaiOptions.map((chai) => (
                  <div key={chai.name} className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-lg">{chai.name}</h4>
                      <span className="text-lg font-bold text-primary">{chai.price}</span>
                    </div>
                    <p className="text-muted-foreground mb-3">{chai.description}</p>
                    <Button 
                      variant="chai" 
                      onClick={() => handleOrderChai(chai.name)}
                      className="w-full"
                    >
                      Order {chai.name}
                    </Button>
                  </div>
                ))}
              </div>
            </Card>

            {/* Chat with Chaiwala */}
            <Card className="p-6 bg-card/90 backdrop-blur-sm">
              <ChatInterface
                title="Chat with Chaiwala"
                placeholder="Ask the chaiwala anything..."
                onSendMessage={handleSendMessage}
                aiResponse={aiResponse}
                isLoading={isLoading}
                messageHistory={chatHistory}
                icon={<span className="text-2xl">🫖</span>}
              />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};