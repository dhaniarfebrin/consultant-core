// Mengimpor 'handlers' dari konfigurasi utama NextAuth kita di file src/auth.ts.
// 'handlers' ini berisi fungsi-fungsi siap pakai untuk menangani request GET dan POST
// yang berkaitan dengan otentikasi.
import { handlers } from "@/auth";

// ==============================================================================
// Penjelasan Folder & File: src/app/api/auth/[...nextauth]/route.ts
// ==============================================================================
//
// 1. Folder `api/`: Folder khusus di Next.js App Router untuk membuat backend endpoint.
//
// 2. Folder `auth/`: Mengelompokkan endpoint yang berhubungan dengan otentikasi.
//
// 3. Folder `[...nextauth]`:
//    - Ini adalah "Dynamic Catch-all Segment".
//    - Tanda kurung siku `[...]` berarti "tangkap apapun".
//    - Jadi, file ini TIDAK HANYA menangani satu URL saja, tapi SEMUA URL yang diawali `/api/auth/`.
//    - Contoh URL yang otomatis ditangani file ini:
//      - /api/auth/signin        (Halaman login bawaan/redirect)
//      - /api/auth/signout       (Proses logout)
//      - /api/auth/callback/google (Jika pakai login Google)
//      - /api/auth/session       (Mengecek data session user)
//      - /api/auth/providers     (Melihat daftar cara login yang tersedia)
//
// 4. File `route.ts`:
//    - Ini adalah file wajib di Next.js App Router untuk mendefinisikan API Handler.
//    - Kita mengekspor `GET` dan `POST` langsung dari `handlers` milik NextAuth.
//    - Artinya: "Apapun request (GET/POST) yang masuk ke sini, serahkan semuanya ke NextAuth untuk diproses".

export const { GET, POST } = handlers;
