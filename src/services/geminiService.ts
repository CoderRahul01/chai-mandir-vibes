// Gemini AI Service for DesiVerse
// Note: This is a placeholder service. You'll need to add your Gemini API key.

interface GeminiResponse {
  text: string;
}

class GeminiService {
  private apiKey: string = 'AIzaSyBahBgmEp6SYC1dM7qDHHw3WjCRXQeZnlw';
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
        throw new Error('API request failed');
      }

      const data = await response.json();
      return data.candidates[0]?.content?.parts[0]?.text || "Chai ready hai! ☕";
    } catch (error) {
      console.error('Gemini API error:', error);
      return "Arre yaar, thoda internet slow hai aaj. Phir se try karo! 🤷‍♂️ (Internet is slow today, try again!)";
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
        throw new Error('API request failed');
      }

      const data = await response.json();
      return data.candidates[0]?.content?.parts[0]?.text || "🕉️ Om Shanti Shanti Shanti. May peace be with you.";
    } catch (error) {
      console.error('Gemini API error:', error);
      return "🕉️ The divine works in mysterious ways. Please try again with a peaceful heart.";
    }
  }
}

export const geminiService = new GeminiService();