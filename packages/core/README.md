# @paramkhodiyar/chat-core 🧠

**@paramkhodiyar/chat-core** is the lightweight, modular backend orchestrator that powers the AI Chat SDK. It handles LLM streaming, real-time memory, and localized RAG (Retrieval-Augmented Generation) effortlessly.

---

## ✨ Features

- 🏎️ **Ultra-Fast Streaming**: Powered by Groq for near-instant responses.
- 📚 **In-Memory RAG**: Instantly ingest documents (support docs, FAQs) for context-aware answers.
- 🎭 **Persona Control**: Define exactly how your AI assistant should behave.
- 🛡️ **Safety Driven**: Built-in logic to handle prompt injections and domain-specific assistance.

---

## 🚀 Installation

```bash
npm install @paramkhodiyar/chat-core
```

---

## 🛠️ Usage

### 1. Basic Setup

```typescript
import { ChatOrchestrator } from '@paramkhodiyar/chat-core';

const orchestrator = new ChatOrchestrator({
  llm: {
    provider: 'groq',
    apiKey: process.env.GROQ_API_KEY,
    model: 'llama-3.3-70b-versatile',
  },
  behavior: {
    persona: 'You are a helpful grocery assistant for GrocerQuick.',
  },
  rag: { enabled: true, provider: 'memory' }
});
```

### 2. Live Streaming in Express/Next.js

```typescript
// Example using Next.js Response streaming
const stream = orchestrator.streamChat("What are your delivery hours?");

for await (const chunk of stream) {
  // Write chunks to your response
}
```

---

## ⚙️ Configuration

| Field | Type | Description |
| :--- | :--- | :--- |
| `llm.provider` | `string` | Currently supports `groq`. |
| `llm.apiKey` | `string` | **Required**. Your Groq API key. |
| `behavior.persona` | `string` | Instructions for the AI's identity and safety rules. |
| `rag.enabled` | `boolean` | Set to `true` to enable document searching. |

---

## 📝 What to Modify & Improve

As a developer, here is what you can currently edit and how this core can be improved:

### ✅ Editable Now
- **Persona**: You can inject strict safety rules and domain-specific instructions via the `persona` field.
- **RAG Data**: Use `orchestrator.getRagManager().ingestDocument(text)` to add custom knowledge on the fly.
- **LLM Settings**: Tweak `model`, `temperature`, and `maxTokens` (if exposed in your version).

### 🚀 Future Improvements
- **Persistence**: Currently, RAG data and memory are stored in volatile RAM. Consider replacing the `memory` RAG provider with **Pinecone** or **Supabase** for persistence.
- **Session Management**: Each `ChatOrchestrator` instance currently maintains a single session. For production, wrap this in a session manager that maps `sessionId` to distinct memory clusters.
- **Enhanced Safety**: Add a middle-layer filter to sanitize incoming messages before they hit the LLM.

---


