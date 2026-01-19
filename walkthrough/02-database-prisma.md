# 02. Database & ORM (Prisma)

Aplikasi kita butuh tempat menyimpan data (User, Project, Task). Kita menggunakan PostgreSQL dan Prisma.

## apa itu Prisma?

Prisma adalah ORM (Object-Relational Mapping). Bahasa manusianya: **Alat bantu agar kita bisa mengelola database menggunakan TypeScript, bukan SQL manual.**

## 1. Setup Prisma

Kita melakukan inisialisasi dengan:

```bash
npx prisma init
```

Ini membuat folder `prisma/` dan file `.env`.

## 2. Membuat Skema (`schema.prisma`)

File `prisma/schema.prisma` adalah desain database kita. Kita mendefinisikan "Models" (Tabel).

Contoh Model User yang kita buat:

```prisma
model User {
  id        String   @id @default(cuid()) // ID unik acak (contoh: cl9x...)
  email     String   @unique
  password  String?  // Password bisa kosong (opsional)
  role      Role     @default(CONSULTANT)
  // ...
}
```

## 3. Sinkronisasi ke Database

Setiap kita mengubah `schema.prisma`, kita harus memberitahu database kita.

```bash
npx prisma generate # 1. Menyiapkan client TypeScript agar auto-completion jalan
npx prisma db push  # 2. Mendorong perubahan struktur tabel ke database asli
```

## 4. Seeding (Data Awal)

Kita membuat script `prisma/seed.ts` agar saat database masih kosong, kita bisa langsung punya user admin.

```bash
npx prisma db seed
```

Script ini akan membuat user `admin@example.com` secara otomatis jika belum ada.

## 5. Mengakses Database di Kode (`src/lib/db.ts`)

Kita membuat file `src/lib/db.ts`. Ini adalah "konektor" kita. Di file lain, kita cukup import `db` dari file ini untuk mulai mengambil data.

Contoh penggunaan:

```typescript
import { db } from "@/lib/db";

// Mengambil semua user
const users = await db.user.findMany();
```
