# ChatSDK 🚀

**ChatSDK** is a modular, high-performance, and developer-first AI chat system. It allows you to embed a fully functional, RAG-capable support widget into any web application in minutes.

---

## 🏗️ Architecture

The system is split into two lightweight, extensible packages:

1.  **`@paramkhodiyar/chat-core`**: The backend orchestrator. Handles LLM streaming (Groq), Memory management, and local RAG.
2.  **`@paramkhodiyar/chat-widget`**: The frontend SDK. A React-based, visually customizable chat window.

---

## 🚀 Quick Start

### 1. Set Up the Backend Orchestrator

Create a Next.js or Express route:

```typescript
import { ChatOrchestrator } from '@paramkhodiyar/chat-core';

const orchestrator = new ChatOrchestrator({
  llm: {
    provider: 'groq',
    apiKey: process.env.GROQ_API_KEY, // Use server-side variables
    model: 'llama-3.3-70b-versatile',
  },
  behavior: {
    persona: 'A helpful tech support assistant.',
  },
  rag: { enabled: true, provider: 'memory' }
});

// Stream back to client
const stream = orchestrator.streamChat(message);
```

### 2. Embed the Chat Widget

```tsx
import { ChatWidget, WidgetConfig } from '@paramkhodiyar/chat-widget';

const config: WidgetConfig = {
  theme: {
    primaryColor: '#10b981',
    botName: 'AI Support',
    placement: 'bottom-right'
  },
  api: {
    endpoint: '/api/chat',
  },
  initialMessage: 'How can I help you today?',
};

function App() {
  return <ChatWidget config={config} />;
}
```

---

## 🎨 Customization & Branding

ChatSDK is designed to be visually transparent. It uses dynamic CSS variable injection to ensure it never leaks or clashes with your main application's styles.

### `WidgetConfig` Schema

| Property | Type | Description |
| :--- | :--- | :--- |
| `theme.primaryColor` | `string` | Hex or CSS color for branding. |
| `theme.botName` | `string` | Display name in the header. |
| `theme.placement` | `string` | `bottom-right` or `bottom-left`. |
| `theme.iconUrl` | `string` | URL for a custom chat button icon. |
| `api.endpoint` | `string` | Your backend streaming endpoint. |
| `api.headers` | `object` | Optional custom headers (e.g. `x-api-key`). |

---

## 🛡️ Security & API Keys

- **Always** store your `GROQ_API_KEY` on the **Server Side** (e.g., in `.env`).
- **Never** expose your main LLM API key to the browser.
- Use `api.headers` in the `ChatWidget` config to pass an application-specific `x-api-key` header for authentication if your backend is public.

---

## 📝 What can be done better?

This SDK is a robust foundation, but here are some areas for growth:

- **🔄 Persistence**: Currently, RAG data and chat memory are stored in local RAM. Integrating **Pinecone** or **Redis** for persistent memory would benefit high-traffic applications.
- **🛡️ Enhanced Sanitization**: Adding a pre-processor to the `ChatOrchestrator` to catch and block prompt injections *before* they reach the LLM would provide an extra layer of security.
- **📂 File/Image Support**: Expanding the `ChatWidget` to handle attachments would allow for richer support interactions.
- **💾 History Caching**: Syncing the chat state with `localStorage` would prevent losing conversations on page refresh.

---

## 📜 License
MIT © 2026 @paramkhodiyar
