import React from 'react';
import { ChatWidget, WidgetConfig } from '@chat-sdk/widget';

const App: React.FC = () => {
  const config: WidgetConfig = {
    theme: {
      primaryColor: '#6366f1', // Indigo
      botName: 'ChatSDK Support',
      placement: 'bottom-right',
      // iconUrl: 'https://cdn-icons-png.flaticon.com/512/2040/2040946.png' // Example icon
    },
    api: {
      endpoint: 'http://localhost:3001/api/chat',
    },
    initialMessage: 'Hi there! How can I help you with ChatSDK today?',
  };

  return (
    <div className="promo">
      <h1>ChatSDK AI</h1>
      <p>
        Experience the future of customer support. 
        Highly modular, blazingly fast, and completely customizable.
      </p>
      
      {/* The Widget */}
      <ChatWidget config={config} />
    </div>
  );
};

export default App;
