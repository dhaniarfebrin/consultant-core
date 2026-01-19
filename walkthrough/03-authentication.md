# 03. Authentication (Login & Security)

Fitur login seringkali rumit. Kita menggunakan **NextAuth.js v5 (Beta)** yang sekarang dikenal sebagai `Auth.js`.

## Konsep Utama

1.  **Middleware (`src/middleware.ts`)**: Satpam di depan pintu. Sebelum user masuk ke halaman manapun, middleware mengecek: "Apakah dia sudah login?". Jika user mengakses `/dashboard` tanpa login, middleware menendangnya ke `/login`.
2.  **Server Actions (`src/features/auth/actions.ts`)**: Fungsi login yang jalan di server.
    - Menerima email & password dari form.
    - Mengecek ke database apakah user ada.
    - Membandingkan password (yang di-hash) menggunakan `bcryptjs`.
3.  **Zod Validation (`schemas.ts`)**: Penjaga kualitas data. Memastikan email formatnya benar dan password tidak kosong sebelum dikirim ke server.

## Alur Login

1.  User isi form di **Login Page** (`/login`).
2.  Data divalidasi oleh **Zod**.
3.  Data dikirim ke **Server Action** `login()`.
4.  Server Action memanggil `signIn` dari NextAuth.
5.  Jika sukses, user diarahkan ke `/dashboard`.

## Kenapa Hash Password?

Kita tidak boleh menyimpan password asli (misal: "rahasia123") di database. Jika database bocor, habislah kita.
Kita menggunakan `bcryptjs` untuk mengubah "rahasia123" menjadi kode acak panjang (hash). Kita hanya bisa mencocokkan hash, tidak bisa mengembalikannya jadi teks asli.
