export interface OrchestratorConfig {
  llm: {
    provider: 'groq';
    apiKey: string;
    model?: string;
    temperature?: number;
    maxTokens?: number;
  };
  behavior: {
    persona?: string;
    domainScope?: string;
  };
  rag?: {
    enabled: boolean;
    provider: 'memory' | 'pinecone';
  };
}

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface DocumentChunk {
  id: string;
  text: string;
  metadata?: Record<string, any>;
}
