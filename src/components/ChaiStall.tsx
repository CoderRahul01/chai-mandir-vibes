import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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

export const ChaiStall = ({ onChatWithAI, aiResponse, isLoading }: ChaiStallProps) => {
  const [selectedChai, setSelectedChai] = useState<string>('');
  const [userMessage, setUserMessage] = useState('');

  const handleOrderChai = (chaiName: string) => {
    setSelectedChai(chaiName);
    const orderMessage = `I'd like to order ${chaiName}. Tell me about it in your typical chaiwala style!`;
    onChatWithAI(orderMessage);
    
    // Play chai sound effect
    if ((window as any).playChaiSound) {
      (window as any).playChaiSound();
    }
  };

  const handleSendMessage = () => {
    if (userMessage.trim()) {
      onChatWithAI(userMessage);
      setUserMessage('');
    }
  };

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
              <h3 className="text-2xl font-bold mb-4 text-chai-brown">Chat with Chaiwala</h3>
              
              {/* Chat Display */}
              <div className="bg-muted/30 rounded-lg p-4 mb-4 h-64 overflow-y-auto">
                {selectedChai && (
                  <div className="mb-4">
                    <p className="text-sm text-muted-foreground">You ordered: {selectedChai}</p>
                  </div>
                )}
                
                {aiResponse && (
                  <div className="bg-primary/10 rounded-lg p-3 mb-2">
                    <p className="font-medium text-sm text-primary mb-1">Chaiwala:</p>
                    <p className="text-sm">{aiResponse}</p>
                  </div>
                )}
                
                {isLoading && (
                  <div className="bg-primary/10 rounded-lg p-3 mb-2">
                    <p className="font-medium text-sm text-primary mb-1">Chaiwala:</p>
                    <p className="text-sm animate-pulse">Thinking...</p>
                  </div>
                )}
                
                {!aiResponse && !isLoading && (
                  <p className="text-muted-foreground text-center py-8">
                    Order a chai or start a conversation!
                  </p>
                )}
              </div>

              {/* Message Input */}
              <div className="flex gap-2">
                <Input
                  placeholder="Chat with the chaiwala..."
                  value={userMessage}
                  onChange={(e) => setUserMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button 
                  variant="saffron" 
                  onClick={handleSendMessage}
                  disabled={!userMessage.trim() || isLoading}
                >
                  Send
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};