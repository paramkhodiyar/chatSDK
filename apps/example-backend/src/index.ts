import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { ChatOrchestrator, OrchestratorConfig } from '@paramkhodiyar/chat-core';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Initialize Orchestrator
const config: OrchestratorConfig = {
  llm: {
    provider: 'groq',
    apiKey: process.env.GROQ_API_KEY || '',
    model: 'llama-3.3-70b-versatile',
    temperature: 0.7,
  },
  behavior: {
    persona: 'A helpful, professional tech support assistant.',
    domainScope: 'Answer technical questions about the product accurately. If you do not know something, say you will escalate it.',
  },
  rag: {
    enabled: true,
    provider: 'memory'
  }
};

const orchestrator = new ChatOrchestrator(config);

// Add some sample knowledge for RAG testing
orchestrator.getRagManager().ingestDocument(
  "Our product 'ChatSDK' is a modular system for embedding AI chat into web apps. " +
  "It supports React, dynamic styling, and low-latency streaming via Groq."
);
orchestrator.getRagManager().ingestDocument(
  "Support hours are 9 AM to 5 PM EST, Monday through Friday. " +
  "Email support is available at support@example.com."
);

app.post('/api/chat', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Transfer-Encoding', 'chunked');

  try {
    const stream = orchestrator.streamChat(message);

    for await (const chunk of stream) {
      res.write(chunk);
    }

    res.end();
  } catch (error) {
    console.error('Core orchestration error:', error);
    res.status(500).write('Error processing request.');
    res.end();
  }
});

app.listen(port, () => {
  console.log(`Example backend listening at http://localhost:${port}`);
});
