# 02. Database & ORM (Prisma)

Aplikasi kita butuh tempat menyimpan data (User, Project, Task). Kita menggunakan PostgreSQL dan Prisma.

## apa itu Prisma?

Prisma adalah ORM (Object-Relational Mapping). Bahasa manusianya: **Alat bantu agar kita bisa mengelola database menggunakan TypeScript, bukan SQL manual.**

## 1. Setup Prisma 7

Kita menggunakan Prisma versi terbaru (v7+). Setup-nya sedikit berbeda untuk performa lebih baik menggunakan driver adapter.

Kita membutuhkan beberapa package tambahan:

```bash
npm install prisma@latest @prisma/client@latest
npm install pg @prisma/adapter-pg @types/pg
npm install -D @types/node
```

## 2. Konfigurasi (`prisma.config.ts`)

Di Prisma 7, kita menggunakan file konfigurasi TypeScript `prisma.config.ts` untuk mengatur koneksi database, menggantikan konfigurasi di `schema.prisma`.

```typescript
// prisma.config.ts
import { defineConfig } from "@prisma/config";

export default defineConfig({
  datasource: {
    url: process.env.DATABASE_URL!,
  },
});
```

Dan `prisma/schema.prisma` menjadi lebih bersih (tanpa properti `url`):

```prisma
datasource db {
  provider = "postgresql"
}

generator client {
  provider = "prisma-client-js"
}
```

## 3. Membuat Skema (`schema.prisma`)

File `prisma/schema.prisma` adalah desain database kita. Kita mendefinisikan "Models" (Tabel).

Contoh Model User yang kita buat:

```prisma
model User {
  id        String   @id @default(cuid()) // ID unik acak
  email     String   @unique
  // ...
}
```

## 4. Sinkronisasi ke Database

```bash
npx prisma generate
npx prisma db push
```

## 5. Mengakses Database di Kode (`src/lib/db.ts`)

Karena kita menggunakan Prisma 7 dengan serverless/edge compatibility mind-set, kita menggunakan **Driver Adapter** (`@prisma/adapter-pg`).

Ini membuat koneksi database lebih efisien. Berikut isi `src/lib/db.ts`:

```typescript
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

// Setup koneksi pool PostgreSQL
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const db =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter, // Kita pasang adapter di sini
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
```

Dengannya, cara pemakaian di file lain **tetap SAMA**:

```typescript
import { db } from "@/lib/db";
const users = await db.user.findMany();
```
