# ChatSDK Monorepo

A modular, embeddable AI chat support system.

## Project Structure

- `packages/core`: The backend orchestrator (RAG, Memory, LLM integration).
- `packages/widget`: The React-based chat widget (Customizable UI, SSE Streaming).
- `apps/example-backend`: An example Express server implementation.
- `apps/example-frontend`: A demo application showcasing the widget.

## Quick Start

1. Install dependencies from the root:
   ```bash
   npm install
   ```

2. Build all packages:
   ```bash
   npm run build:core
   npm run build:widget
   ```

3. Configure environment:
   Update `apps/example-backend/.env` with your `GROQ_API_KEY`.

4. Run the demos:
   ```bash
   # Terminal 1
   npm run dev:backend

   # Terminal 2
   npm run dev:frontend
   ```

## NPM Publishing

To publish the packages to NPM:

1. Build first.
2. Go to each package in `packages/`:
   ```bash
   cd packages/core && npm publish --access public
   cd packages/widget && npm publish --access public
   ```
   *Note: Ensure you have changed the package names (e.g., `@your-org/chat-sdk-core`) to a namespace you own.*
