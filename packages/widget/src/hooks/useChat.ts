import { useState, useCallback } from 'react';
import { ChatMessage, WidgetConfig } from '../types';

export function useChat(config: WidgetConfig) {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    if (config.initialMessage) {
      return [
        { id: 'init', role: 'assistant', content: config.initialMessage }
      ];
    }
    return [];
  });
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    const assistantMsgId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, { id: assistantMsgId, role: 'assistant', content: '' }]);

    try {
      const response = await fetch(config.api.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(config.api.headers || {})
        },
        body: JSON.stringify({ message: content })
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }
      
      const reader = response.body?.getReader();
      const decoder = new TextDecoder('utf-8');

      if (!reader) throw new Error('No readable stream available');

      let done = false;
      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        if (value) {
          const chunk = decoder.decode(value, { stream: true });
          setMessages(prev => 
            prev.map(m => 
              m.id === assistantMsgId ? { ...m, content: m.content + chunk } : m
            )
          );
        }
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => 
        prev.map(m => 
          m.id === assistantMsgId 
            ? { ...m, content: 'Sorry, I encountered an error. Please try again.' } 
            : m
        )
      );
    } finally {
      setIsLoading(false);
    }
  }, [config.api]);

  return { messages, sendMessage, isLoading };
}
