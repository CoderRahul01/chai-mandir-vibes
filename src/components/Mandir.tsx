import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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

export const Mandir = ({ onChatWithAI, aiResponse, isLoading }: MandirProps) => {
  const [selectedPrayer, setSelectedPrayer] = useState<string>('');
  const [customPrayer, setCustomPrayer] = useState('');
  const [bellRung, setBellRung] = useState(false);

  const handleRingBell = () => {
    setBellRung(true);
    setTimeout(() => setBellRung(false), 1000);
    
    // Play bell sound effect
    if ((window as any).playBellSound) {
      (window as any).playBellSound();
    }
    
    const bellMessage = "I just rang the temple bell. Please bless me with your divine words.";
    onChatWithAI(bellMessage);
  };

  const handleOfferPrayer = (prayer: string) => {
    setSelectedPrayer(prayer);
    const prayerMessage = `I offer this prayer: "${prayer}". Please give me a blessing or spiritual guidance.`;
    onChatWithAI(prayerMessage);
  };

  const handleCustomPrayer = () => {
    if (customPrayer.trim()) {
      const prayerMessage = `I offer this personal prayer: "${customPrayer}". Please give me a blessing or spiritual guidance.`;
      onChatWithAI(prayerMessage);
      setCustomPrayer('');
    }
  };

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
                    value={customPrayer}
                    onChange={(e) => setCustomPrayer(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleCustomPrayer()}
                    className="flex-1"
                  />
                  <Button 
                    variant="golden" 
                    onClick={handleCustomPrayer}
                    disabled={!customPrayer.trim() || isLoading}
                  >
                    Offer
                  </Button>
                </div>
              </div>
            </Card>

            {/* Divine Blessings */}
            <Card className="p-6 bg-card/90 backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-4 text-temple-red">Divine Blessings</h3>
              
              {/* Blessings Display */}
              <div className="bg-muted/30 rounded-lg p-4 h-64 overflow-y-auto">
                {selectedPrayer && (
                  <div className="mb-4">
                    <p className="text-sm text-muted-foreground">Your prayer: {selectedPrayer}</p>
                  </div>
                )}
                
                {aiResponse && (
                  <div className="bg-mandir-gold/10 rounded-lg p-4 mb-2">
                    <p className="font-medium text-sm text-mandir-gold mb-2">🕉️ Divine Blessing:</p>
                    <p className="text-sm leading-relaxed">{aiResponse}</p>
                  </div>
                )}
                
                {isLoading && (
                  <div className="bg-mandir-gold/10 rounded-lg p-4 mb-2">
                    <p className="font-medium text-sm text-mandir-gold mb-2">🕉️ Divine Blessing:</p>
                    <p className="text-sm animate-pulse">The divine is speaking...</p>
                  </div>
                )}
                
                {!aiResponse && !isLoading && (
                  <div className="text-center py-8">
                    <span className="text-4xl mb-4 block">🕉️</span>
                    <p className="text-muted-foreground">
                      Ring the bell or offer a prayer to receive divine blessings
                    </p>
                  </div>
                )}
              </div>

              {/* Sacred Symbols */}
              <div className="mt-4 text-center">
                <div className="flex justify-center space-x-4 text-2xl opacity-60">
                  <span>🕉️</span>
                  <span>🪔</span>
                  <span>🌺</span>
                  <span>🙏</span>
                  <span>🌸</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};