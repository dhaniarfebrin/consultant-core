# 07. Halaman Detail Project & Perbaikan Bug

Bagian ini menjelaskan bagaimana kita membuat halaman detail untuk setiap project dan memperbaiki beberapa masalah penting yang muncul selama proses pembuatan.

## 1. Fitur Halaman Detail

Kita baru saja membuat halaman khusus agar user bisa melihat info lengkap dari sebuah project beserta tugas-tugas (tasks) di dalamnya.

### Unit Testing

Kami telah menambahkan unit test dengan cakupan code (code coverage) 100% untuk fitur projects.

- **Tools**: Vitest, React Testing Library, Happy-DOM
- **Lokasi Test**:
  - `src/features/projects/actions.test.ts`: Test untuk server actions.
  - `src/features/projects/components/project-list.test.tsx`: Test untuk list project.
  - `src/features/projects/components/project-header.test.tsx`: Test untuk header project.
  - `src/features/projects/components/task-list.test.tsx`: Test untuk list task.
  - `src/features/projects/components/create-project-modal.test.tsx`: Test untuk modal pembuatan project.
  - `src/components/app-sidebar.test.tsx`: Test untuk sidebar navigasi.
  - `src/components/ui/*.test.tsx`: Test untuk komponen UI common.

Untuk menjalankan test:

```bash
npx vitest run          # Jalankan semua test
npx vitest run --coverage # Jalankan dengan laporan coverage
```

### Alamat Web (Routing)

- **URL**: `/projects/[projectId]`
- **Lokasi File**: `src/app/(main)/projects/[projectId]/page.tsx`

Tanda kurung `[projectId]` itu spesial. Itu namanya **Dynamic Route**. Artinya, Next.js akan menangkap apapun yang kita tulis di situ sebagai sebuah ID.
Contoh:

- buka `/projects/123`, maka `projectId` = "123"
- buka `/projects/abc`, maka `projectId` = "abc"

### Komponen Baru

Kita memecah tampilan menjadi potongan-potongan kecil (Komponen) agar kode lebih rapi:

1.  **ProjectHeader**: Bagian atas yang menampilkan Judul dan Deskripsi project.
2.  **TaskList**: Daftar tugas yang ada di dalam project tersebut.

### Mengambil Data (Fetching)

Kita menambahkan fungsi `getProject(id)` di `actions.ts`. Fungsi ini minta tolong ke Prisma (database) untuk:
"Carikan project dengan ID sekian, dan sekalian ambilkan daftar tasks-nya ya!"

## 2. Masalah & Solusi (Debugging Story)

Selama ngoding tadi, kita ketemu 3 masalah menarik. Ini biasa terjadi, jadi jangan panik!

### A. Masalah Sidebar (Salah Alamat)

**Masalah**: Pas klik menu "Projects" di samping, eh malah dilempar balik ke Dashboard.
**Penyebab**: "Satpam" aplikasi kita (Middleware) terlalu ketat. Dia mikir: "Kalau kamu sudah login tapi nggak lagi di Dashboard, sana balik ke Dashboard!". Padahal kita mau ke halaman Projects.
**Solusi**: Kita kasih tahu "Satpam"-nya (di file `auth.config.ts`), bahwa halaman `/projects`, `/tasks`, dan `/settings` itu juga **boleh** dikunjungi.

### B. Masalah Link Project

**Masalah**: Pas kartu project diklik, alamatnya salah. Harusnya ke `/projects/123`, malah ke `/dashboard/projects/123`.
**Solusi**: Kita perbaiki `href` (link) di komponen `ProjectList` supaya mengarah ke alamat yang benar.

### C. Error Next.js 15 (Janji yang Harus Ditepati)

**Masalah**: Pas halaman dibuka, muncul error merah menyeramkan soal `id undefined` atau `params`.
**Penyebab**: Di Next.js versi terbaru (versi 15), data `params` (yang isinya `projectId` tadi) sifatnya adalah **Promise**.
Bayangkan Promise itu seperti "Janji". Datanya belum ada saat itu juga, tapi "dijanjikan" akan ada. Kita nggak bisa langsung ambil ID-nya.
**Solusi**: Kita harus "menunggu" janjinya ditepati dulu pakai kata kunci `await`.

```tsx
// Kode yang Salah (Cara Lama/Next.js 14 ke bawah)
// const id = params.projectId; // ❌ Error di Next.js 15!

// Kode yang Benar (Next.js 15)
const resolvedParams = await params; // ✅ Tunggu dulu...
const id = resolvedParams.projectId; // ✅ Baru ambil datanya
```

## Kesimpulan

Kita sudah belajar:

1.  Membuat halaman dinamis (`[projectId]`).
2.  Mengambil data spesifik dari database.
3.  Memperbaiki logika redirect di Middleware.
4.  Menangani perubahan _breaking change_ di Next.js 15 soal `params`.
