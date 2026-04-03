# CommitLens 🔍

**An AI-powered commit message generator that transforms messy code changes into meaningful, conventional commit messages.**

---

## Overview

CommitLens is a full-stack application that leverages Google's Gemini AI to automatically generate high-quality, conventional commit messages from staged Git changes. It eliminates the friction of writing commit messages while maintaining code consistency and best practices.

### Why CommitLens?

- 🤖 **AI-Powered**: Uses Google Gemini 2.5 Flash for intelligent message generation
- ⚡ **Fast & Efficient**: Generates meaningful commits instantly
- 📋 **Conventional Format**: Follows industry-standard commit conventions (feat, fix, refactor, docs, chore)
- 🎯 **Interactive CLI**: User-friendly prompt interface with the ability to accept, edit, or cancel
- 🗄️ **Persistent Tracking**: Stores commit messages and metadata using Prisma ORM
- 🎨 **Modern Stack**: Built with Next.js, React, and TypeScript

---

## 🏗️ Architecture

CommitLens is structured as a monorepo with multiple components:

### **CLI Component** (`cli/`)

- Standalone command-line interface for quick commit message generation
- Integrates with Git to fetch staged changes (`git diff --cached`)
- Interactive prompts using Inquirer.js for user decisions
- Real-time feedback with Ora spinners and progress indicators

### **Web Application** (`src/`)

- Next.js-based frontend dashboard
- React UI components for visualizing commits
- Integration with backend API

### **Database** (`prisma/`)

- PostgreSQL database schema using Prisma ORM
- Stores commit history and metadata
- Versioned migrations for reliable deployments

---

## 🚀 Tech Stack

| Layer               | Technology                     |
| ------------------- | ------------------------------ |
| **AI/LLM**          | Google Gemini 2.5 Flash        |
| **Backend**         | Node.js, Prisma ORM            |
| **Frontend**        | Next.js 14+, React, TypeScript |
| **Database**        | PostgreSQL                     |
| **CLI**             | Node.js, Inquirer.js, Ora      |
| **Code Quality**    | ESLint                         |
| **Styling**         | Tailwind CSS, PostCSS          |
| **Package Manager** | npm                            |

---

## 📦 Key Features

✅ **Intelligent Message Generation** - AI analyzes git diffs using semantic understanding  
✅ **Conventional Commits** - Follows the conventional commit specification (type + scope + description)  
✅ **Interactive Workflow** - Accept, edit, or discard generated messages  
✅ **Git Integration** - Seamlessly commits changes directly using Git CLI  
✅ **Commit History** - Stores and tracks all generated commits in PostgreSQL  
✅ **User-Friendly UI** - Beautiful terminal UI with loading indicators and clear feedback  
✅ **Error Handling** - Graceful error handling with informative messages

---

## 🔧 How It Works

1. **Stage Changes**: Developer stages files with `git add`
2. **Generate**: Run the CLI tool which fetches staged diff with `git diff --cached`
3. **AI Processing**: Gemini AI analyzes changes and generates a conventional commit message
4. **User Decision**: Accept, edit, or cancel the suggested message via interactive prompts
5. **Persist**: Message is committed to Git and stored in the PostgreSQL database

```
User Stages Changes
        ↓
    CLI Tool Fetches Git Diff
        ↓
    Gemini AI Analyzes & Generates
        ↓
    User Reviews & Decides (Accept/Edit/Cancel)
        ↓
    Git Commit Created & Stored in DB
```

---

## 📋 Project Structure

```
commitlens/
├── cli/                          # CLI Application (Standalone)
│   ├── src/
│   │   ├── commands/
│   │   │   └── git.js           # Git operations
│   │   └── utils/
│   │       ├── ai.js            # Gemini API integration
│   │       ├── formatter.js      # Message formatting
│   │       └── prompt.js         # User prompts
│   ├── index.js                 # CLI entry point
│   └── package.json
├── src/                         # Next.js Web Application
│   ├── app/
│   │   ├── layout.js            # Root layout
│   │   ├── page.js              # Home page
│   │   └── globals.css          # Global styles
│   ├── components/              # React components
│   │   ├── ui/
│   │   │   ├── dialog.js
│   │   │   └── dropdown-menu.js
│   │   └── ...
│   ├── lib/
│   │   └── utils.js             # Helper utilities
│   └── generated/               # Generated Prisma types
├── prisma/                      # Database Layer
│   ├── schema.prisma            # Data model definition
│   └── migrations/              # Database version history
│       ├── migration_lock.toml
│       ├── 20260323085558_commit_model/
│       └── 20260323090040_added/
├── lib/                         # Shared utilities
│   └── prisma.js                # Prisma client
├── public/                      # Static assets
├── .env.example                 # Environment template
├── next.config.mjs              # Next.js configuration
├── eslint.config.mjs            # ESLint rules
├── postcss.config.mjs           # PostCSS configuration
├── components.json              # Component configuration
└── package.json                 # Root dependencies
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ and npm
- **Git** installed and configured
- **PostgreSQL** database running
- **Google Gemini API key** (from [Google AI Studio](https://aistudio.google.com))

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/CBSUA-Apollo-Mar-Pollo/commitlens.git
cd commitlens
```

2. **Install dependencies**

```bash
npm install
cd cli && npm install && cd ..
```

3. **Configure environment variables**

```bash
cp .env.example .env.local
```

Edit `.env.local` and add:

```env
GEMINI_API_KEY=your_api_key_here
DATABASE_URL=postgresql://user:password@localhost:5432/commitlens
```

4. **Set up the database**

```bash
npx prisma migrate dev
```

5. **Start the application**

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### Usage - CLI

Generate a commit message for staged changes:

```bash
npm run commit
```

Or run directly:

```bash
node cli/index.js
```

**Workflow:**

1. Stage your changes: `git add .`
2. Run: `npm run commit`
3. Review the generated message
4. Choose: Accept (commits immediately), Edit (modify then commit), or Cancel

---

## 💻 Development

### Running Locally

```bash
# Install dependencies
npm install && cd cli && npm install && cd ..

# Set up environment
cp .env.example .env.local
# Edit .env.local with your keys

# Initialize database
npx prisma migrate dev

# Start dev server
npm run dev

# In another terminal, test CLI
npm run commit
```

### Database Commands

```bash
# Create a new migration after schema changes
npx prisma migrate dev --name describe_your_change

# Reset database (⚠️ development only!)
npx prisma migrate reset

# Open Prisma Studio (visual database browser)
npx prisma studio

# View migration status
npx prisma migrate status
```

### Code Quality

```bash
# Run ESLint
npm run lint

# Format code
npm run format
```

---

## 🎯 Skills Demonstrated

This project showcases expertise in:

### **Full-Stack Development**

- Frontend: Modern React with Next.js App Router and component architecture
- Backend: Node.js CLI with system process management and Git integration
- Database: PostgreSQL schema design with Prisma ORM and migrations

### **API Integration**

- Integrates with Google Gemini AI API for intelligent message generation
- Error handling, response parsing, and API rate management
- Async/await patterns for API calls

### **User Experience**

- Interactive CLI with real-time feedback (loading spinners, success/error states)
- User input validation and error recovery
- Clear feedback messages and intuitive workflows

### **Software Architecture**

- Monorepo structure with shared utilities
- Separation of concerns (CLI, Web, Database)
- Modular code with reusable components and utilities
- Environment-based configuration

### **DevOps & Database**

- Database schema design and migrations
- Prisma ORM for type-safe database access
- Environment variable management
- Version control best practices

### **Git & Version Control**

- Deep Git integration (`git diff`, `git commit`)
- Working with staged changes and commit workflows
- Understanding of conventional commits specification

---

## 🔐 Environment Setup

### Required Variables

| Variable         | Description                  | Example                                       |
| ---------------- | ---------------------------- | --------------------------------------------- |
| `GEMINI_API_KEY` | Google Gemini API key        | `AIza...`                                     |
| `DATABASE_URL`   | PostgreSQL connection string | `postgresql://user:pass@localhost/commitlens` |

### Get Your API Key

1. Visit [Google AI Studio](https://aistudio.google.com)
2. Create a new API key
3. Add to `.env.local`

---

## 📊 Database Schema

The application uses Prisma ORM with PostgreSQL:

```prisma
model Commit {
  id        String   @id @default(cuid())
  message   String   // The generated commit message
  diff      String   // The git diff that was analyzed
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

---

## 🚀 Deployment

### Deploy Web App on Vercel

```bash
vercel deploy
```

### Deploy CLI as npm Package

```bash
npm publish
```

---

## 📈 Performance & Scalability

- **Diff Truncation**: Large diffs are truncated to 4000 characters for optimal API performance
- **Buffering**: Process buffer set to 10MB for handling large repositories
- **Response Streaming**: Real-time feedback via loading spinners
- **Error Resilience**: Comprehensive error handling with user-friendly messages

---

## 🤝 Contributing

This is a demonstration project showcasing full-stack development expertise. However, contributions and suggestions are welcome!

---

## 📄 License

MIT License - Free to use and modify

---

## ⚡ Why This Stands Out

**For Recruiters**: This project demonstrates:

- ✅ Full-stack capabilities (frontend, backend, database, DevOps)
- ✅ AI/LLM integration experience
- ✅ Modern tech stack proficiency
- ✅ Clean code and architecture principles
- ✅ User experience focus
- ✅ Git and development workflow expertise

CommitLens solves a real problem developers face daily while showcasing production-grade code quality and architecture.

---

**Built with ❤️ — An example of full-stack development excellence**
