import { DocumentChunk } from './types';

export class RagManager {
  private chunks: DocumentChunk[] = [];
  private enabled: boolean;

  constructor(enabled: boolean = false) {
    this.enabled = enabled;
  }

  // Very naive in-memory "semantic" search for V1
  // Real implementation would use embeddings and cosine similarity
  public async search(query: string, topK: number = 3): Promise<DocumentChunk[]> {
    if (!this.enabled || this.chunks.length === 0) return [];
    
    const queryTokens = query.toLowerCase().split(/\s+/);
    
    // Sort by simple keyword overlap
    const scored = this.chunks.map(chunk => {
      let score = 0;
      const text = chunk.text.toLowerCase();
      for (const token of queryTokens) {
        if (text.includes(token)) score++;
      }
      return { chunk, score };
    });

    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, topK).map(s => s.chunk);
  }

  public ingestDocument(text: string, metadata?: any) {
    // Basic chunking by paragraphs
    const paragraphs = text.split('\n\n');
    paragraphs.forEach((p, idx) => {
      if (p.trim().length > 10) {
        this.chunks.push({
          id: `chunk-${Date.now()}-${idx}`,
          text: p.trim(),
          metadata
        });
      }
    });
  }
}
