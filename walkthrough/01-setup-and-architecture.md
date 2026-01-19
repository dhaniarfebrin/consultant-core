# 01. Inisialisasi Project & Setup Awal

Dokumentasi ini menjelaskan langkah pertama yang kita lakukan untuk membangun **ConsultantCore**.

## 1. Stack Teknologi

Sebelum mulai, penting untuk memahami _tools_ yang kita pilih dan alasannya:

- **Next.js 16 (App Router)**: Framework React terbaru. Kita menggunakan "App Router" (`src/app`) yang merupakan standar baru, bukan "Pages Router". Ini memungkinkan fitur canggih seperti Server Components.
- **TypeScript**: JavaScript dengan tipe data yang ketat. Membantu mencegah _bug_ bodoh (seperti salah nama properti) saat coding.
- **Tailwind CSS v3**: Framework CSS "utility-first". Kita tidak menulis file `.css` terpisah, melainkan langsung menulis class seperti `flex justify-center text-red-500` di HTML.
- **Shadcn/UI**: Ini bukan library komponen biasa. Ini adalah koleksi komponen (Button, Input, Card) yang _kita copy-paste_ kodenya ke project kita. Sangat fleksibel dan terlihat profesional.

## 2. Inisialisasi Project

Langkah pertama adalah membuat project Next.js baru:

```bash
npx create-next-app@latest consultant-core
# Pilihan: TypeScript (Yes), Tailwind (Yes), ESLint (Yes), src directory (Yes), App Router (Yes)
```

## 3. Struktur Folder: Feature-Based Architecture

Agar kode tidak berantakan saat aplikasi membesar, kita mengubah struktur bawaan Next.js menjadi **Feature-Based Architecture**.

### Mengapa?

Biasanya tutorial menaruh semua komponen di `src/components`. Ini buruk untuk project besar. Kita membagi kode berdasarkan **Fitur Bisnis**.

### Struktur Kita:

- `src/app`: Hanya untuk _routing_ (halaman yang bisa diakses di browser).
- `src/components`: Komponen **Global** yang dipakai di mana-mana (misal: Button, Navbar).
- `src/features`: Jantung aplikasi. Setiap fitur punya foldernya sendiri.
  - `src/features/auth`: Semua tentang login/register.
  - `src/features/projects`: Semua tentang manajemen project.

Contoh di dalam `src/features/projects`:

- `components/`: UI khusus Project (misal: `ProjectCard`).
- `actions.ts`: Kode server untuk database (Create/Read Project).
- `schemas.ts`: Validasi form (Zod).

## 4. Setup Shadcn UI

Kita menginstall Shadcn untuk komponen UI yang cantik.

```bash
npx shadcn@latest init
```

Setelah init, kita bisa menambahkan komponen satu per satu sesuai kebutuhan, misalnya:

```bash
npx shadcn@latest add button card input form
```

Komponen ini akan muncul di `src/components/ui`. Kamu boleh mengedit isinya jika mau!
