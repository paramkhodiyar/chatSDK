# @paramkhodiyar/chat-widget 💬

**@paramkhodiyar/chat-widget** is a lightweight, visually customizable React chat window that connects effortlessly to the ChatSDK backend. It features real-time streaming, automated scrolling, and a responsive experience for any website.

---

## ✨ Features

- 🏎️ **Streaming First**: Visualizes incoming text as it's being generated.
- 🎨 **Dynamic Theme**: Inject your brand's colors and custom bot identity.
- 📱 **Responsive**: Works perfectly from desktop to mobile screens.
- 🚀 **Plug & Play**: Integrates with any React app in just minutes.

---

## 🚀 Installation

```bash
npm install @paramkhodiyar/chat-widget
```

---

## 🛠️ Usage

### 1. Basic Integration

Import and drop the `ChatWidget` component into your React layout:

```tsx
import { ChatWidget, WidgetConfig } from '@paramkhodiyar/chat-widget';

const config: WidgetConfig = {
  theme: {
    primaryColor: '#10b981', // Your brand green
    botName: 'GrocerQuick Assistant',
    placement: 'bottom-right'
  },
  api: {
    endpoint: '/api/chat', // Your streaming API route
  },
  initialMessage: 'Hi! How can I help you find groceries today?',
};

function App() {
  return (
    <div className="layout">
      <ChatWidget config={config} />
    </div>
  );
}
```

---

## 🎨 Configuration

The `WidgetConfig` schema is designed for full visual flexibility:

| Field | Type | Description |
| :--- | :--- | :--- |
| `theme.primaryColor` | `string` | Branding color for the button and header. |
| `theme.botName` | `string` | Display name of the bot. |
| `theme.placement` | `string` | `bottom-right` or `bottom-left`. |
| `theme.iconUrl` | `string` | **Optional**. URL for a custom chat button icon. |
| `api.endpoint` | `string` | **Required**. URL where your `chat-core` stream lives. |
| `api.headers` | `object` | **Optional**. Custom headers (e.g. `x-api-key`). |

---

## 📝 What to Modify & Improve

### ✅ Editable Now
- **Branding**: Update `primaryColor` and `botName` in seconds without CSS.
- **Headers**: Use `api.headers` to securely pass user tokens or API keys to your backend.
- **Initial Context**: Change `initialMessage` to guide the customer immediately.

### 🚀 Future Improvements
- **File Uploads**: The current version only supports text-based messages.
- **Persistent State**: The chat history is currently stored in React state and is lost on refresh. Consider syncing messages to **LocalStorage** or an indexedDB.
- **Rich Media Support**: Add support for rendering Markdown, images, or carousels (e.g., for product suggestions).

---