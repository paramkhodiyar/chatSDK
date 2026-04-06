import { ChatMessage } from './types';

export class MemoryManager {
  private history: ChatMessage[] = [];
  private maxHistoryLimit: number;

  constructor(maxHistoryLimit: number = 10) {
    this.maxHistoryLimit = maxHistoryLimit;
  }

  public addMessage(message: ChatMessage) {
    this.history.push(message);
    if (this.history.length > this.maxHistoryLimit) {
      // Keep system messages if we eventually pin them, otherwise just shift
      this.history.shift();
    }
  }

  public getHistory(): ChatMessage[] {
    return [...this.history];
  }

  public clear() {
    this.history = [];
  }
}
