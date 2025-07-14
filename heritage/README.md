# Rhiz.om

> **THis is dead code -- a previous architecture**

Rhiz.om is a platform for creating collaborative, persistent digital spaces. It integrates real-time chat, video conferencing, and a sophisticated AI agent system to foster deep, context-aware interactions.

---

## Technology Stack

This project is built on a modern, edge-native technology stack:

| Layer         | Choice         | Version (as of 2025-07-12) |
| ------------- | -------------- | -------------------------- |
| Runtime       | Deno           | 2.x                        |
| Edge Host     | Deno Deploy    | -                          |
| Front-end     | React          | 19.x                       |
| Bundler / Dev | Vite           | 7.x                        |
| CSS Engine    | Tailwind CSS   | 4.x                        |
| UI Kit        | Flowbite       | 3.x                        |
| Data (KV)     | Deno KV        | -                          |
| Blobs         | Cloudflare R2  | -                          |

## Project Structure

The repository is organized into the following key directories:

```
rhiz.om/
├─ api/                  # Deno backend (edge function)
├─ web/                  # React/Vite frontend SPA
├─ prompts/              # Agent prompts for system & commands
├─ docs/                 # Project requirements & documentation
├─ .github/              # CI/CD workflows
├─ deno.jsonc            # Deno project configuration
└─ README.md             # This file
```

## Getting Started

### Prerequisites

*   [Deno](https://deno.land/) (v1.40.x or later)
*   [Node.js](https://nodejs.org/) (v20.x or later) and npm

### Installation & Setup

1.  **Install All Dependencies:**

    From the project root, run:
    ```sh
    npm install
    ```

### Running the Development Servers

The project is configured to run both the backend API and the frontend development server concurrently with a single command.

In the project root, run:
```sh
npm run dev
```
This will start both the Deno API server (typically on `http://localhost:8000`) and the Vite frontend server (typically on `http://localhost:5173`). The output from both servers will be displayed in your terminal.

## The Prompt System

This project uses a unique "Prompts as Code" system located in the `prompts/` directory. This system manages all instructions for the integrated AI agent, allowing for version-controlled, reusable, and auditable agent behavior. See `docs/requirements/system-prompts.md` for more details.
