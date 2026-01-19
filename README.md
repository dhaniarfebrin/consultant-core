# 🏗️ ConsultantCore

**Internal Project Management Platform for IT Consultants.**
Designed to be a lightweight, high-performance alternative to Jira/Linear, built with the latest Next.js 16 features.

## 🚀 Technology Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS v3](https://tailwindcss.com/) + [Shadcn UI](https://ui.shadcn.com/)
- **Database**: PostgreSQL (via [Prisma ORM](https://www.prisma.io/))
- **Auth**: [NextAuth.js v5](https://authjs.dev/)
- **State Management**:
  - **Server**: Tanstack Query (React Query)
  - **Client**: Zustand (for global UI state)

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL (Local or Cloud like Neon/Supabase)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/consultant-core.git
   cd consultant-core
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   # Database connection string
   DATABASE_URL="postgresql://user:password@localhost:5432/consultant_core"

   # Authentication Secret (Generate with `npx auth secret`)
   AUTH_SECRET="your-generated-secret"
   ```

4. **Database Setup**
   Initialize the database schema:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📂 Project Structure

We follow a **Feature-based Architecture** to ensure scalability and maintainability.

```plaintext
src/
├── app/                  # Next.js App Router (Routing & Layouts)
│   ├── (auth)/           # Route groups for auth pages
│   ├── dashboard/        # Dashboard layout and pages
│   ├── api/              # API Routes
│   └── globals.css       # Global styles
│
├── components/           # Global Shared UI Components
│   └── ui/               # Shadcn UI primitives (Button, Card, Input...)
│
├── lib/                  # Library configurations (Prisma, Utils)
│   ├── db.ts             # Prisma singleton
│   └── utils.ts          # Tailwind merge utility
│
├── hooks/                # Global reusable hooks
│
└── features/             # MAJORS MODULES (The Heart of the App)
    ├── auth/             # Authentication Module
    │   ├── actions.ts    # Server Actions (Login, Register)
    │   ├── components/   # Auth-specific UI (LoginForm)
    │   └── schemas.ts    # Zod Validation Schemas
    │
    ├── projects/         # Projects Management Module
    │   ├── actions.ts    # Server Actions (Create, List Projects)
    │   ├── components/   # Project-specific UI (ProjectList, CreateModal)
    │   └── schemas.ts    # Zod Schemas
    │
    └── tasks/            # Tasks Module (Kanban - Todo)
        └── ...
```

## 🔑 Key Features Implementation

- **Server Actions**: Used for all data mutations (Project creation, Login) to ensure type safety and reduced client-side Javascript.
- **Optimistic UI**: Implemented in features where immediate feedback is crucial.
- **Middleware**: `middleware.ts` handles route protection, redirecting unauthenticated users to `/login`.
- **Zod Validation**: Shared schemas for both client-side form validation and server-side action validation.

## 🤝 Contributing

1. Create a new branch for your feature (`git checkout -b feature/amazing-feature`).
2. Commit your changes (`git commit -m 'Add amazing feature'`).
3. Push to the branch (`git push origin feature/amazing-feature`).
4. Open a Pull Request.
