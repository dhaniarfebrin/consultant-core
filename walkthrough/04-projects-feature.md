# 04. Bedah Fitur: Projects Module

Di sinilah kita melihat kekuatan **Next.js App Router** dan **Server Actions**.

Kita membangun fitur manajemen Project di `src/features/projects`.

## 1. Menampilkan Data (Fetching)

Buka `src/features/projects/actions.ts`.
Kita membuat fungsi `getProjects`. Perhatikan bahwa fungsi ini **langsung memanggil database**.

```typescript
export const getProjects = async () => {
    // ... cek sesi login ...
    const projects = await db.project.findMany(...);
    return projects;
}
```

Di Next.js versi lama (Pages Router), kita butuh `API Route` (`/api/projects`) + `fetch` di client.
Di Next.js 16 (App Router), komponen kita adalah **Server Component**. Komponen bisa langsung mengambil data dari database saat di-render di server. Lebih cepat dan aman!

## 2. Membuat Data (Server Actions)

Untuk membuat project baru, kita tidak pakai `API Route`. Kita pakai **Server Action**.
Lihat `createProject` di `actions.ts`.

Fungsi ini punya direktif `"use server"`. Ini artinya, meskipun fungsi ini dipanggil dari tombol di browser (Client), eksekusinya terjadi di Server (Backend).

## 3. UI: Create Project Modal

Lokasi: `src/features/projects/components/create-project-modal.tsx`.

Ini adalah **Client Component** (`"use client"`) karena butuh interaksi (klik tombol, buka modal, isi form).

- Kita pakai `react-hook-form` untuk menghandle input user.
- Kita pakai `useTransition` untuk menampilkan loading state ("Creating...") saat Server Action sedang bekerja.

## 4. Optimistic Updates (Konsep)

Walaupun belum diimplementasikan penuh, tujuannya adalah agar UI terasa instan.
Saat user klik "Create", kita bisa _pura-pura_ menambahkan project ke list di layar _sebelum_ server sebenarnya selesai menyimpannya. Ini membuat aplikasi terasa sangat cepat ("snappy").
