# ChatSDK 🚀

**ChatSDK** is a modular, high-performance, and developer-first AI chat system that allows you to embed a fully functional, RAG-capable support widget into any web application in minutes.

---

## 🏗️ Architecture

The system is split into two lightweight, extensible packages:

1.  **`@chat-sdk/core`**: The backend orchestrator. Handles LLM streaming (Groq), Memory management, and local RAG (Simple in-memory vector retrieval).
2.  **`@chat-sdk/widget`**: The frontend SDK. A React-based, visually customizable chat window that connects to your backend orchestrator via Server-Sent Events (SSE).

---

## 📦 Installation

```bash
# To build your own backend
npm install @chat-sdk/core

# To add the widget to your React app
npm install @chat-sdk/widget
```

---

## 🚀 Quick Start

### 1. Set Up the Backend Orchestrator

Create an Express route to handle chat streaming using the core orchestrator.

```typescript
import express from 'express';
import { ChatOrchestrator } from '@chat-sdk/core';

const app = express();
const orchestrator = new ChatOrchestrator({
  llm: {
    provider: 'groq',
    apiKey: process.env.GROQ_API_KEY,
    model: 'llama-3.3-70b-versatile',
  },
  behavior: {
    persona: 'A helpful tech support assistant.',
  },
  rag: { enabled: true, provider: 'memory' }
});

// Ingest documents for RAG (Markdown, Text, PDFs)
orchestrator.getRagManager().ingestDocument("Support hours are 9-5 EST.");

app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');

  const stream = orchestrator.streamChat(message);
  for await (const chunk of stream) {
    res.write(chunk);
  }
  res.end();
});
```

### 2. Embed the Chat Widget

Import the widget into your React application and provide your configuration.

```tsx
import { ChatWidget, WidgetConfig } from '@chat-sdk/widget';

const config: WidgetConfig = {
  theme: {
    primaryColor: '#4f46e5',
    botName: 'AI Support',
    placement: 'bottom-right'
  },
  api: {
    endpoint: 'http://localhost:3001/api/chat',
  },
  initialMessage: 'How can I help you today?',
};

function App() {
  return (
    <div className="app">
      <ChatWidget config={config} />
    </div>
  );
}
```

---

## 🎨 Customization

ChatSDK is designed to be visually transparent. It uses dynamic CSS variable injection to ensure it never leaks or clashes with your main application's styles.

### `WidgetConfig` Schema

| Property | Type | Description |
| :--- | :--- | :--- |
| `theme.primaryColor` | `string` | Hex or CSS color for branding. |
| `theme.botName` | `string` | Display name in the header. |
| `theme.placement` | `string` | `bottom-right` or `bottom-left`. |
| `api.endpoint` | `string` | Your backend SSE endpoint. |
| `initialMessage` | `string` | Optional greeting message. |

---

## 🛠️ Monorepo Development

If you are contributing to ChatSDK or running the source locally:

1.  **Install & Link**: `npm install`
2.  **Build Core**: `npm run build:core`
3.  **Build Widget**: `npm run build:widget`
4.  **Run Demos**: 
    - Frontend: `npm run dev:frontend`
    - Backend: `npm run dev:backend`

---

## 📜 License
[MIT](LICENSE) © 2026 Your Name / Organization
