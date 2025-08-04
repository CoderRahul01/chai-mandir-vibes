import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { ChaiStall } from '@/components/ChaiStall';
import { Mandir } from '@/components/Mandir';
import { AudioManager } from '@/components/AudioManager';
import { geminiService } from '@/services/geminiService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

const Index = () => {
  const [currentScene, setCurrentScene] = useState<'chai-stall' | 'mandir'>('chai-stall');
  const [aiResponse, setAiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);

  const handleChatWithAI = async (message: string) => {
    setIsLoading(true);
    setAiResponse('');

    try {
      let response: string;
      if (currentScene === 'chai-stall') {
        response = await geminiService.generateChaiResponse(message);
      } else {
        response = await geminiService.generateBlessingResponse(message);
      }
      setAiResponse(response);
    } catch (error) {
      console.error('AI response error:', error);
      setAiResponse('Sorry, there was an issue connecting. Please try again!');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetApiKey = () => {
    if (apiKey.trim()) {
      geminiService.setApiKey(apiKey.trim());
      setShowApiKeyInput(false);
      setAiResponse('');
    }
  };

  // Check if we need to show API key setup
  if (showApiKeyInput || (!apiKey && !geminiService['apiKey'])) {
    return (
      <div className="min-h-screen bg-gradient-sunset flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-6">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold bg-gradient-saffron bg-clip-text text-transparent mb-2">
              DesiVerse
            </h1>
            <p className="text-muted-foreground">
              Complete setup to enable AI interactions
            </p>
          </div>
          
          <div className="space-y-4">
            <Input
              type="password"
              placeholder="Enter your Gemini API key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSetApiKey()}
            />
            <Button 
              variant="saffron" 
              onClick={handleSetApiKey}
              disabled={!apiKey.trim()}
              className="w-full"
            >
              Start DesiVerse Experience
            </Button>
            
            <div className="text-sm space-y-3">
              <div>
                <p className="font-medium text-destructive mb-2">⚠️ Important Setup Steps:</p>
                <ol className="text-muted-foreground space-y-1 text-xs">
                  <li>1. Get API key from <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google AI Studio</a></li>
                  <li>2. Enable the API in <a href="https://console.developers.google.com/apis/api/generativelanguage.googleapis.com/overview" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Cloud Console</a></li>
                  <li>3. Wait a few minutes for activation</li>
                </ol>
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation currentScene={currentScene} onSceneChange={setCurrentScene} />
      <AudioManager scene={currentScene} />
      
      {currentScene === 'chai-stall' ? (
        <ChaiStall 
          onChatWithAI={handleChatWithAI} 
          aiResponse={aiResponse} 
          isLoading={isLoading} 
        />
      ) : (
        <Mandir 
          onChatWithAI={handleChatWithAI} 
          aiResponse={aiResponse} 
          isLoading={isLoading} 
        />
      )}
      
      {/* API Key Settings Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => setShowApiKeyInput(true)}
        className="fixed bottom-4 right-4 bg-background/80 backdrop-blur-sm"
      >
        ⚙️ API Settings
      </Button>
    </div>
  );
};

export default Index;
