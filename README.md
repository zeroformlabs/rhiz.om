# Rhiz.om

Rhiz.om is a platform for creating collaborative, persistent digital spaces. It integrates real-time chat, video conferencing, and a sophisticated AI agent system to foster deep, context-aware interactions.

---

## Technology Stack

This project is built on a modern, popular, and LLM-optimized technology stack:

| Layer              | Selection                                   |
| ------------------ | ------------------------------------------- |
| React framework    | **Next.js**                                 |
| UI runtime         | **React**                                   |
| CSS utilities      | **Tailwind CSS**                            |
| Component kit      | **Material UI (MUI)**                       |
| Auth               | **NextAuth.js**                             |
| API/server         | **Next.js Route Handlers + Server Actions** |
| Real-time (opt-in) | **Socket.IO**                               |
| ORM                | **Prisma**                                  |
| Database           | **PostgreSQL**                              |
| Logging            | **Winston**                                 |
| Unit tests         | **Jest**                                    |
| E2E tests          | **Playwright**                              |
| Monorepo tooling   | **npm Workspaces** (Turbo cache optional)   |
| Deployment         | **Vercel**                                  |

## Project Structure

The repository is a monorepo organized into the following key directories:

```
/rhiz.om
├─ apps/
│  └─ web/               # Next 15 (UI + API)
├─ packages/
│  ├─ ui/                # MUI + Tailwind components
│  ├─ db/                # Prisma schema & migrations
│  └─ shared/            # Zod types, util helpers
├─ prompts/              # Agent prompts for system & commands
├─ docs/                 # Project requirements & documentation
├─ .github/              # CI/CD workflows
├─ turbo.json            # (optional) task cache
├─ package.json          # root + "workspaces"
└─ jest.config.cjs, playwright.config.ts, etc.
```

## Getting Started

### Prerequisites

*   [Node.js](https://nodejs.org/) (v20.x or later) and npm

### Installation & Setup

1.  **Install All Dependencies:**

    From the project root, run:
    ```sh
    npm install
    ```

### Running the Development Servers

In the project root, run:
```sh
npm run dev
```
This will start the Next.js development server (typically on `http://localhost:3000`).

## The Prompt System

This project uses a unique "Prompts as Code" system located in the `prompts/` directory. This system manages all instructions for the integrated AI agent, allowing for version-controlled, reusable, and auditable agent behavior. See `docs/requirements/system-prompts.md` for more details.
