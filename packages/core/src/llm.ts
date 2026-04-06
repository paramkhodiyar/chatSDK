import { Groq } from 'groq-sdk';
import { OrchestratorConfig, ChatMessage } from './types.js';
import { MemoryManager } from './memory.js';
import { RagManager } from './rag.js';

export class ChatOrchestrator {
  private groq: Groq;
  private config: OrchestratorConfig;
  private memory: MemoryManager;
  private rag: RagManager;

  constructor(config: OrchestratorConfig) {
    this.config = config;
    this.memory = new MemoryManager();
    this.rag = new RagManager(config.rag?.enabled);
    
    this.groq = new Groq({
      apiKey: config.llm.apiKey,
    });
  }

  public getRagManager() {
    return this.rag;
  }

  private buildSystemPrompt(contextChunks: string[]): string {
    let prompt = `You are a helpful AI assistant.\n`;
    if (this.config.behavior.persona) {
      prompt += `Persona: ${this.config.behavior.persona}\n`;
    }
    if (this.config.behavior.domainScope) {
      prompt += `Rules: ${this.config.behavior.domainScope}\n`;
    }
    if (contextChunks.length > 0) {
      prompt += `\nUse the following retrieved context to answer the user:\n`;
      prompt += contextChunks.map((c, i) => `--- Context ${i + 1} ---\n${c}\n`).join('\n');
    }
    return prompt;
  }

  public async *streamChat(userMessage: string) {
    // 1. Retrieve Context if RAG enabled
    const searchResults = await this.rag.search(userMessage);
    const contextTexts = searchResults.map(r => r.text);

    // 2. Build Messages Array
    const systemPrompt = this.buildSystemPrompt(contextTexts);
    
    // Combine cleanly: System + History + Current User Msg
    const messages: ChatMessage[] = [
      { role: 'system', content: systemPrompt },
      ...this.memory.getHistory(),
      { role: 'user', content: userMessage }
    ];

    // 3. Add to memory (short-term)
    this.memory.addMessage({ role: 'user', content: userMessage });

    // 4. Call Groq with Streaming
    const stream = await this.groq.chat.completions.create({
      messages: messages as any,
      model: this.config.llm.model || 'llama-3.3-70b-versatile',
      temperature: this.config.llm.temperature ?? 0.7,
      max_tokens: this.config.llm.maxTokens ?? 1024,
      stream: true,
    });

    let fullResponse = '';

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || '';
      if (content) {
        fullResponse += content;
        yield content;
      }
    }

    // 5. Add Assistant reply to memory
    this.memory.addMessage({ role: 'assistant', content: fullResponse });
  }
}
