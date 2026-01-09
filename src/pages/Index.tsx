import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { ChaiStall } from '@/components/ChaiStall';
import { Mandir } from '@/components/Mandir';
import { AudioManager } from '@/components/AudioManager';
import { geminiService } from '@/services/geminiService';
import { ApiKeySetup } from '@/components/ApiKeySetup';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [currentScene, setCurrentScene] = useState<'chai-stall' | 'mandir'>('chai-stall');
  const [aiResponse, setAiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
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

  const handleApiKeySet = () => {
    setShowApiKeyInput(false);
    setAiResponse('');
  };

  // Check if we need to show API key setup
  if (showApiKeyInput || !geminiService.isApiKeySet()) {
    return <ApiKeySetup onApiKeySet={handleApiKeySet} />;
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
