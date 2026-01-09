// Gemini AI Service for DesiVerse
// This service interacts with the Gemini API for generating AI responses.

interface GeminiResponse {
  text: string;
}

class GeminiService {
  private apiKey: string | null = null;
  private baseUrl: string = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-preview-0520:generateContent';

  /**
   * Sets the API key for the Gemini service.
   * @param key The API key.
   */
  setApiKey(key: string) {
    this.apiKey = key;
  }

  /**
   * Checks if the API key is set.
   * @returns True if the API key is set, false otherwise.
   */
  isApiKeySet(): boolean {
    return !!this.apiKey;
  }

  /**
   * Helper function to make API calls with exponential backoff.
   * @param url The URL to fetch from.
   * @param options Fetch options.
   * @param retries Current retry count.
   * @returns The fetch response.
   */
  private async fetchWithRetry(url: string, options: RequestInit, retries: number = 0): Promise<Response> {
    try {
      const response = await fetch(url, options);
      if (!response.ok && response.status === 429 && retries < 5) { // Too Many Requests, retry up to 5 times
        const delay = Math.pow(2, retries) * 1000 + Math.random() * 1000; // Exponential backoff with jitter
        await new Promise(resolve => setTimeout(resolve, delay));
        return this.fetchWithRetry(url, options, retries + 1);
      }
      return response;
    } catch (error) {
      if (retries < 5) { // Retry on network errors
        const delay = Math.pow(2, retries) * 1000 + Math.random() * 1000;
        await new Promise(resolve => setTimeout(resolve, delay));
        return this.fetchWithRetry(url, options, retries + 1);
      }
      throw error; // Re-throw if max retries reached
    }
  }

  /**
   * Generates a response from the AI-powered chaiwala.
   * @param userMessage The message from the user.
   * @returns A promise that resolves to the chaiwala's response.
   */
  async generateChaiResponse(userMessage: string): Promise<string> {
    // The API key is expected to be provided by the environment.
    // If it's still empty, it indicates an environment setup issue.
    if (!this.apiKey && typeof __initial_auth_token === 'undefined') {
      return "Arre sahab! Gemini API key missing hai. Environment setup check karo. 🫖 (Gemini API key is missing. Please check your environment setup!)";
    }

    const prompt = `You are a friendly, witty Indian chaiwala (tea vendor) in a traditional chai stall.
    Respond in a mix of Hindi and English (Hinglish) with warmth, humor, and cultural authenticity.
    Use colloquial expressions, talk about the weather, life, and of course, chai!
    Keep responses conversational and under 100 words.

    Customer says: "${userMessage}"

    Respond as the chaiwala:`;

    try {
      const payload = {
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      };

      const response = await this.fetchWithRetry(`${this.baseUrl}?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('❌ API Error Response:', errorData);

        // Handle specific API not enabled error
        if (response.status === 403 && errorData.error?.message?.includes('API has not been used')) {
          throw new Error('API_NOT_ENABLED');
        }

        if (response.status === 403) {
          throw new Error('PERMISSION_DENIED');
        }

        throw new Error(`API request failed: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
      }

      const data = await response.json();

      const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text;

      return responseText || "Chai ready hai! ☕";
    } catch (error: any) {
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

  /**
   * Generates a blessing response from the AI-powered priest.
   * @param prayerMessage The prayer or message from the devotee.
   * @returns A promise that resolves to the priest's blessing.
   */
  async generateBlessingResponse(prayerMessage: string): Promise<string> {
    // The API key is expected to be provided by the environment.
    // If it's still empty, it indicates an environment setup issue.
    if (!this.apiKey && typeof __initial_auth_token === 'undefined') {
      return "🕉️ Om Shanti. Please ensure the Gemini API key is configured in the environment to receive divine blessings.";
    }

    const prompt = `You are a wise, compassionate Hindu priest (pandit ji) in a sacred temple.
    Respond with spiritual wisdom, blessings, and guidance. Use traditional Sanskrit phrases,
    Hindu philosophy, and peaceful language. Include relevant mantras or verses when appropriate.
    Keep responses meaningful and under 150 words.

    Devotee's prayer/message: "${prayerMessage}"

    Respond as the wise priest with blessings:`;

    try {
      const payload = {
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      };

      const response = await this.fetchWithRetry(`${this.baseUrl}?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
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
    } catch (error: any) {
      console.error('Gemini API error:', error);

      if (error.message === 'API_NOT_ENABLED') {
        return "🔧 Om Namah Shivaya. To receive divine blessings, please enable the Generative Language API in your Google Cloud Console first. Then I shall guide you with spiritual wisdom. 🕉️";
      }

      return "🕉️ The divine works in mysterious ways. Please try again with a peaceful heart.";
    }
  }
}

export const geminiService = new GeminiService();
