import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Paperclip } from 'lucide-react';

interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
}

interface ChatInterfaceProps {
  onSendMessage: (message: string) => void;
  aiResponse: string;
  isLoading: boolean;
  title: string;
  placeholder: string;
  messageHistory: ChatMessage[];
  icon: React.ReactNode;
}

export const ChatInterface = ({
  onSendMessage,
  aiResponse,
  isLoading,
  title,
  placeholder,
  messageHistory,
  icon,
}: ChatInterfaceProps) => {
  const [userMessage, setUserMessage] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messageHistory, isLoading]);

  const handleSendMessage = () => {
    if (userMessage.trim()) {
      onSendMessage(userMessage);
      setUserMessage('');
    }
  };

  return (
    <div>
      <h3 className="text-2xl font-bold mb-4 text-gray-800">{title}</h3>
      <div
        ref={chatContainerRef}
        className="bg-gray-100 rounded-lg p-4 mb-4 h-80 overflow-y-auto flex flex-col space-y-4"
      >
        {messageHistory.map((msg, index) => (
          <div
            key={index}
            className={`flex items-start gap-3 ${
              msg.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {msg.sender === 'ai' && <span className="text-3xl opacity-80">{icon}</span>}
            <div
              className={`rounded-xl px-4 py-3 max-w-xs lg:max-w-md shadow-sm ${
                msg.sender === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700'
              }`}
            >
              <p className="text-sm leading-relaxed">{msg.text}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-start gap-3 justify-start">
            <span className="text-3xl opacity-80">{icon}</span>
            <div className="rounded-xl px-4 py-3 max-w-xs lg:max-w-md shadow-sm bg-white text-gray-700">
              <p className="text-sm animate-pulse">Thinking...</p>
            </div>
          </div>
        )}
        {messageHistory.length === 0 && !isLoading && (
          <div className="text-center text-gray-500 flex flex-col items-center justify-center h-full">
            <p>Start the conversation.</p>
          </div>
        )}
      </div>
      <div className="flex gap-2">
        <Input
          placeholder={placeholder}
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          className="flex-1"
        />
        <Button
          onClick={handleSendMessage}
          disabled={!userMessage.trim() || isLoading}
          variant="saffron"
        >
          <Paperclip className="w-4 h-4 mr-2" />
          Send
        </Button>
      </div>
    </div>
  );
};
