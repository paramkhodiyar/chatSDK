import React, { useState, useEffect, useRef } from 'react';
import { WidgetConfig } from '../types';
import { useChat } from '../hooks/useChat';
import { MessageCircle, X, Send } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import '../styles/main.css';

export interface ChatWidgetProps {
  config: WidgetConfig;
}

export const ChatWidget: React.FC<ChatWidgetProps> = ({ config }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { messages, sendMessage, isLoading } = useChat(config);
  const [inputVal, setInputVal] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const themeVars = {
    '--chat-primary': config.theme.primaryColor || '#4F46E5',
    '--chat-text': config.theme.textColor || '#fff',
  } as React.CSSProperties;

  const placementClass = config.theme.placement === 'bottom-left' ? 'chat-sdk-left' : 'chat-sdk-right';

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim() || isLoading) return;
    sendMessage(inputVal);
    setInputVal('');
  };

  return (
    <div className={`chat-sdk-container ${placementClass}`} style={themeVars}>
      {isOpen && (
        <div className="chat-sdk-window">
          <div className="chat-sdk-header">
            <h3 className="chat-sdk-title">{config.theme.botName}</h3>
            <button className="chat-sdk-close-btn" onClick={() => setIsOpen(false)}>
              <X size={20} />
            </button>
          </div>
          
          <div className="chat-sdk-messages">
            {messages.map((m) => (
              <div key={m.id} className={`chat-sdk-message ${m.role === 'user' ? 'user' : 'assistant'}`}>
                <div className="chat-sdk-bubble">
                  {m.content ? (
                    <div className="chat-sdk-markdown">
                      <ReactMarkdown>{m.content}</ReactMarkdown>
                    </div>
                  ) : (
                    <span className="chat-sdk-typing">...</span>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form className="chat-sdk-input-area" onSubmit={handleSend}>
            <input 
              type="text" 
              className="chat-sdk-input" 
              placeholder="Type your message..."
              value={inputVal}
              onChange={e => setInputVal(e.target.value)}
              disabled={isLoading}
            />
            <button type="submit" className="chat-sdk-send-btn" disabled={isLoading || !inputVal.trim()}>
              <Send size={18} />
            </button>
          </form>
        </div>
      )}

      {!isOpen && (
        <button className="chat-sdk-launcher" onClick={() => setIsOpen(true)}>
          {config.theme.iconUrl ? (
            <img src={config.theme.iconUrl} alt="Chat Icon" className="chat-sdk-icon-img" />
          ) : (
            <MessageCircle size={28} />
          )}
        </button>
      )}
    </div>
  );
};
