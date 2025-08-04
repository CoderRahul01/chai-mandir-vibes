// Gemini AI Service for DesiVerse
// Note: This is a placeholder service. You'll need to add your Gemini API key.

interface GeminiResponse {
  text: string;
}

class GeminiService {
  private apiKey: string = 'AIzaSyBqbmtsRH9So4UWPEVBWV2CJsAYqmYvlxI';
  private baseUrl: string = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

  setApiKey(apiKey: string) {
    this.apiKey = apiKey;
  }

  async generateChaiResponse(userMessage: string): Promise<string> {
    if (!this.apiKey) {
      return "Arre sahab! Setup karna padega Gemini API key pehle. 🫖 (Please set up your Gemini API key first!)";
    }

    const prompt = `You are a friendly, witty Indian chaiwala (tea vendor) in a traditional chai stall. 
    Respond in a mix of Hindi and English (Hinglish) with warmth, humor, and cultural authenticity. 
    Use colloquial expressions, talk about the weather, life, and of course, chai! 
    Keep responses conversational and under 100 words.
    
    Customer says: "${userMessage}"
    
    Respond as the chaiwala:`;

    try {
      console.log('🫖 Making Gemini API request for chaiwala...');
      console.log('API Key (first 10 chars):', this.apiKey.substring(0, 10));
      
      const response = await fetch(`${this.baseUrl}?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        })
      });

      console.log('📡 Response status:', response.status);
      console.log('📡 Response ok:', response.ok);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('❌ API Error Response:', errorData);
        
        // Handle specific API not enabled error
        if (response.status === 403 && errorData.error?.message?.includes('API has not been used')) {
          console.log('🔧 API not enabled error detected');
          throw new Error('API_NOT_ENABLED');
        }
        
        if (response.status === 403) {
          console.log('🔐 Permission denied error');
          throw new Error('PERMISSION_DENIED');
        }
        
        throw new Error(`API request failed: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
      }

      const data = await response.json();
      console.log('✅ Successful API response:', data);
      
      const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      console.log('💬 Chaiwala response:', responseText);
      
      return responseText || "Chai ready hai! ☕";
    } catch (error) {
      console.error('🚨 Gemini API error:', error);
      
      if (error.message === 'API_NOT_ENABLED') {
        return "🔧 Arre sahab! Gemini API enable karna padega pehle. Google Cloud Console mein jao aur 'Generative Language API' ko enable karo. Phir main bilkul ready hun chai banane ke liye! 🫖\n\nDirect link: https://console.developers.google.com/apis/api/generativelanguage.googleapis.com/overview";
      }
      
      if (error.message === 'PERMISSION_DENIED') {
        return "🔑 Sahab, API key mein koi problem hai! Check karo ki sahi key hai aur permissions theek hain. 🤔";
      }
      
      return `Arre yaar, kuch technical problem hai: ${error.message} 🤷‍♂️ Console check karo details ke liye!`;
    }
  }

  async generateBlessingResponse(prayerMessage: string): Promise<string> {
    if (!this.apiKey) {
      return "🕉️ Om Shanti. Please configure the Gemini API key to receive divine blessings.";
    }

    const prompt = `You are a wise, compassionate Hindu priest (pandit ji) in a sacred temple. 
    Respond with spiritual wisdom, blessings, and guidance. Use traditional Sanskrit phrases, 
    Hindu philosophy, and peaceful language. Include relevant mantras or verses when appropriate.
    Keep responses meaningful and under 150 words.
    
    Devotee's prayer/message: "${prayerMessage}"
    
    Respond as the wise priest with blessings:`;

    try {
      const response = await fetch(`${this.baseUrl}?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        
        // Handle specific API not enabled error
        if (response.status === 403 && errorData.error?.message?.includes('API has not been used')) {
          throw new Error('API_NOT_ENABLED');
        }
        
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      return data.candidates[0]?.content?.parts[0]?.text || "🕉️ Om Shanti Shanti Shanti. May peace be with you.";
    } catch (error) {
      console.error('Gemini API error:', error);
      
      if (error.message === 'API_NOT_ENABLED') {
        return "🔧 Om Namah Shivaya. To receive divine blessings, please enable the Generative Language API in your Google Cloud Console first. Then I shall guide you with spiritual wisdom. 🕉️";
      }
      
      return "🕉️ The divine works in mysterious ways. Please try again with a peaceful heart.";
    }
  }
}

export const geminiService = new GeminiService();