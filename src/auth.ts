// ==============================================================================
// 1. NextAuth: Library utama untuk menangani semua logika otentikasi (login, logout, session).
//    Di versi 5, ia lebih modular dan support server actions & middleware dengan baik.
import NextAuth from "next-auth";

// 2. authConfig: Konfigurasi terpisah (biasanya berisi settingan halaman login, callbacks).
//    Dipisah ke file lain supaya bisa di-import oleh Middleware (yang tidak support Node.js runtime penuh)
//    tanpa error.
import { authConfig } from "./auth.config";

// 3. Credentials Provider: Salah satu "cara" login di NextAuth.
//    Ini dipakai ketika kita mau user login dengan Email & Password sendiri (bukan via Google/GitHub).
import Credentials from "next-auth/providers/credentials";

// 4. Zod: Library validasi data. Kita pakai untuk memastikan input user (email & password)
//    formatnya benar sebelum kita coba cek ke database.
import { z } from "zod";

// 5. Prisma Client (db): ORM yang kita pakai untuk query ke database.
//    Di sini dipakai untuk mencari data user berdasarkan email.
import { db } from "@/lib/db";

// 6. bcryptjs: Library kriptografi. Password di database disimpan dalam bentuk terenkripsi (hash).
//    Library ini dipakai untuk mencocokkan password login (teks biasa) dengan hash di database.
import bcrypt from "bcryptjs";

// Import schema validasi form login yang sudah kita definisikan sebelumnya.
import { LoginSchema } from "@/features/auth/schemas";

// ==============================================================================
// Inisialisasi NextAuth
// Fungsi ini mengembalikan object yang berisi helper penting:
// - auth: Untuk mengambil data session user saat ini (server-side).
// - signIn: Fungsi untuk melakukan login.
// - signOut: Fungsi untuk logout.
// - handlers: Handler untuk API route (GET/POST) yang dibutuhkan NextAuth.
export const { auth, signIn, signOut, handlers } = NextAuth({
    // Menggabungkan konfigurasi dasar dari authConfig (misal: pages.signIn)
    ...authConfig,
    
    // Daftar Provider Login (Cara user bisa masuk)
    providers: [
        // Konfigurasi Provider "Credentials" (Email & Password)
        Credentials({
            // Fungsi 'authorize' dipanggil saat user klik tombol Login.
            // credentials berisi data yang dikirim dari form (email, password).
            async authorize(credentials) {
                // Langkah 1: Validasi input form menggunakan Zod + LoginSchema
                // safeParse tidak akan error/throw exception, tapi return object success/error.
                const validatedFields = LoginSchema.safeParse(credentials);

                // Jika validasi format gagal (misal email tidak valid), return null (login gagal).
                if (validatedFields.success) {
                    const { email, password } = validatedFields.data;

                    // Langkah 2: Cari user di database berdasarkan email.
                    // Kita cari user yang punya email tersebut.
                    const user = await db.user.findUnique({ where: { email } });
                    
                    // Langkah 3: Cek apakah user ketemu DAN punya password.
                    // Jika user login via Google mungkin tidak punya password, jadi harus dicek.
                    if (!user || !user.password) return null; 

                    // Langkah 4: Bandingkan password inputan user dengan password di database.
                    // bcrypt.compare akan menghashing 'password' inputan dan membandingkan hasilnya
                    // dengan 'user.password' yang ada di DB.
                    const passwordsMatch = await bcrypt.compare(password, user.password);

                    // Jika cocok, kembalikan object user. NextAuth akan membuat session sukses.
                    if (passwordsMatch) return user;
                }

                // Jika sampai sini (email salah, password salah, atau format salah), return null.
                return null;
            },
        }),
    ],
});
