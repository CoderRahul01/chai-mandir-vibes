import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { geminiService } from '@/services/geminiService';

interface ApiKeySetupProps {
  onApiKeySet: () => void;
}

export const ApiKeySetup = ({ onApiKeySet }: ApiKeySetupProps) => {
  const [apiKeyInput, setApiKeyInput] = useState('');

  const handleSetApiKey = () => {
    if (apiKeyInput.trim()) {
      geminiService.setApiKey(apiKeyInput.trim());
      onApiKeySet();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-200 via-orange-300 to-rose-400 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg p-6 shadow-2xl border-4 border-white/50 rounded-2xl bg-white/80 backdrop-blur-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-bold text-transparent bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text mb-2">
            Welcome to DesiVerse
          </CardTitle>
          <CardDescription className="text-lg text-stone-600">
            Enter your Gemini API Key to begin your journey.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="relative">
            <Input
              type="password"
              placeholder="Enter your Gemini API key"
              value={apiKeyInput}
              onChange={(e) => setApiKeyInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSetApiKey()}
              className="w-full p-4 text-lg border-2 border-orange-200 rounded-lg focus:ring-orange-500 focus:border-orange-500 transition"
            />
          </div>
          <Button
            variant="saffron"
            onClick={handleSetApiKey}
            disabled={!apiKeyInput.trim()}
            className="w-full text-lg py-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
          >
            Start Your DesiVerse Experience
          </Button>
          <div className="text-sm text-stone-500 space-y-3 pt-4 border-t border-orange-200/50">
            <p className="font-semibold text-orange-600 mb-2">⚠️ Important Setup Steps:</p>
            <ol className="list-decimal list-inside space-y-2 text-xs">
              <li>
                Get your API key from{' '}
                <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  Google AI Studio
                </a>
              </li>
              <li>
                Enable the API in the{' '}
                <a href="https://console.developers.google.com/apis/api/generativelanguage.googleapis.com/overview" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  Google Cloud Console
                </a>
              </li>
              <li>Allow a few minutes for the key to become active.</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
