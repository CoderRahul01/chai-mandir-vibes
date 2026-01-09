import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChatInterface } from './ChatInterface';
import { Input } from "@/components/ui/input";
import mandirBg from "@/assets/mandir-bg.jpg";

const prayers = [
  'Grant me peace and wisdom',
  'Bless my family with happiness',
  'Guide me on the right path',
  'Help me find inner strength',
  'Protect those I love',
];

interface MandirProps {
  onChatWithAI: (message: string) => void;
  aiResponse: string;
  isLoading: boolean;
}

interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
}

export const Mandir = ({ onChatWithAI, aiResponse, isLoading }: MandirProps) => {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [bellRung, setBellRung] = useState(false);

  const handleRingBell = () => {
    setBellRung(true);
    setTimeout(() => setBellRung(false), 1000);
    
    if ((window as any).playBellSound) {
      (window as any).playBellSound();
    }
    
    const bellMessage = "I just rang the temple bell. Please bless me with your divine words.";
    setChatHistory(prev => [...prev, { sender: 'user', text: bellMessage }]);
    onChatWithAI(bellMessage);
  };

  const handleOfferPrayer = (prayer: string) => {
    const prayerMessage = `I offer this prayer: "${prayer}". Please give me a blessing or spiritual guidance.`;
    setChatHistory(prev => [...prev, { sender: 'user', text: prayerMessage }]);
    onChatWithAI(prayerMessage);
  };

  const handleCustomPrayer = (message: string) => {
    const prayerMessage = `I offer this personal prayer: "${message}". Please give me a blessing or spiritual guidance.`;
    setChatHistory(prev => [...prev, { sender: 'user', text: prayerMessage }]);
    onChatWithAI(prayerMessage);
  };

  useEffect(() => {
    if (aiResponse) {
      setChatHistory(prev => [...prev, { sender: 'ai', text: aiResponse }]);
    }
  }, [aiResponse]);

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url(${mandirBg})` }}
    >
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black/30"></div>
      
      <div className="relative z-10 container mx-auto px-4 pt-20 pb-8">
        <div className="max-w-6xl mx-auto">
          {/* Welcome Section */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
              🛕 ॐ Namaste! Welcome to the Sacred Mandir
            </h2>
            <p className="text-xl text-white/90 drop-shadow">
              Ring the bell, offer prayers, and receive divine blessings
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Prayer Actions */}
            <Card className="p-6 bg-card/90 backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-6 text-temple-red">Sacred Actions</h3>
              
              {/* Bell Ringing */}
              <div className="mb-8 text-center">
                <div className="mb-4">
                  <div className={`inline-block transition-transform duration-300 ${bellRung ? 'animate-bounce scale-110' : ''}`}>
                    <span className="text-6xl">🔔</span>
                  </div>
                </div>
                <Button 
                  variant="temple" 
                  size="lg"
                  onClick={handleRingBell}
                  className="mb-2"
                >
                  Ring the Temple Bell
                </Button>
                <p className="text-sm text-muted-foreground">
                  Ring the bell to invite divine presence
                </p>
              </div>

              {/* Quick Prayers */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-3 text-mandir-gold">Quick Prayers</h4>
                <div className="grid gap-2">
                  {prayers.map((prayer) => (
                    <Button 
                      key={prayer}
                      variant="outline" 
                      onClick={() => handleOfferPrayer(prayer)}
                      className="text-left justify-start h-auto py-2 px-3"
                    >
                      🙏 {prayer}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Custom Prayer */}
              <div>
                <h4 className="text-lg font-semibold mb-3 text-mandir-gold">Personal Prayer</h4>
                <div className="flex gap-2">
                  <Input
                    placeholder="Share your personal prayer..."
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                        handleCustomPrayer(e.currentTarget.value);
                        e.currentTarget.value = '';
                      }
                    }}
                    className="flex-1"
                  />
                  <Button 
                    variant="golden" 
                    onClick={(e) => {
                      const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                      if (input.value.trim()) {
                        handleCustomPrayer(input.value);
                        input.value = '';
                      }
                    }}
                    disabled={isLoading}
                  >
                    Offer
                  </Button>
                </div>
              </div>
            </Card>

            {/* Divine Blessings */}
            <Card className="p-6 bg-card/90 backdrop-blur-sm">
              <ChatInterface
                title="Divine Blessings"
                placeholder="Offer a prayer..."
                onSendMessage={handleCustomPrayer}
                aiResponse={aiResponse}
                isLoading={isLoading}
                messageHistory={chatHistory}
                icon={<span className="text-3xl opacity-80">🕉️</span>}
              />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};