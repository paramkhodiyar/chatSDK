export interface WidgetConfig {
  theme: {
    primaryColor: string;
    textColor?: string;
    botName: string;
    placement?: 'bottom-right' | 'bottom-left';
    iconUrl?: string;
  };
  api: {
    endpoint: string;
    headers?: Record<string, string>;
  };
  initialMessage?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
}
