// Mengimpor tipe definisi NextAuthConfig dari library "next-auth".
// Gunanya agar kita mendapatkan fitur autocomplete TypeScript dan memastikan
// konfigurasi yang kita tulis sesuai dengan standar NextAuth.
import type { NextAuthConfig } from "next-auth";

// Mengekspor objek konfigurasi auth.
// Objek ini dipisah dari file utama (auth.ts) karena file ini akan di-import oleh Middleware.
// Middleware Next.js berjalan di "Edge Runtime" yang lebih terbatas, sedangkan auth.ts mungkin
// berisi library yang butuh Node.js full (seperti bcrypt atau adapter database).
// Jadi pemisahan ini penting untuk menghindari error di Middleware.
export const authConfig = {
    // Bagian pages: Memberi tahu NextAuth halaman kustom kita.
    pages: {
        // signIn: Menentukan URL halaman login kita sendiri.
        // Jika tidak di-set, NextAuth akan membuat halaman login default yang sederhana.
        // Saat user perlu login (misal via redirect), mereka akan dilempar ke rute ini.
        signIn: "/login",
    },
    
    // Bagian callbacks: Fungsi-fungsi yang dijalankan otomatis oleh NextAuth pada event tertentu.
    callbacks: {
        // authorized: Callback ini sangat PENTING untuk Middleware.
        // Fungsi ini dipanggil setiap kali ada request ke halaman web untuk menentukan
        // apakah user BOLEH mengakses halaman tersebut atau tidak.
        authorized({ auth, request: { nextUrl } }) {
            // Mengecek status login user.
            // !!auth?.user akan bernilai true jika user ada, dan false jika tidak.
            const isLoggedIn = !!auth?.user;

            // Mengecek apakah user sedang mencoba mengakses halaman yang diawali "/dashboard".
            // nextUrl.pathname berisi path URL yang sedang dikunjungi.
            const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");

            if (isOnDashboard) {
                // Skenario 1: User mau masuk Dashboard.
                // Jika sudah login (isLoggedIn = true), return true (IZINKAN akses).
                if (isLoggedIn) return true;
                
                // Jika belum login, return false.
                // NextAuth akan otomatis me-redirect user ke halaman login (pages.signIn di atas).
                return false; 
            } else if (isLoggedIn) {
                // Skenario 2: User SUDAH login, tapi berada di halaman publik (misal halaman login atau home).
                // Kita redirect mereka langsung masuk ke Dashboard agar UX lebih bagus.
                // Response.redirect akan memindahkan user ke URL baru.
                return Response.redirect(new URL("/dashboard", nextUrl));
            }

            // Skenario 3: User belum login dan mengakses halaman publik.
            // Return true artinya "IZINKAN", biarkan mereka melihat halaman tersebut.
            return true;
        },
    },
    
    // providers: Daftar penyedia layanan login (Google, GitHub, Email/Password, dll).
    // Di file config ini, kita biarkan array-nya kosong [].
    // Alasannya: Beberapa provider atau library pendukungnya mungkin tidak kompatibel dengan Middleware (Edge Runtime).
    // Kita akan mengisi provider yang "berat" ini nanti di file `src/auth.ts` yang berjalan di Node.js runtime.
    providers: [], 
} satisfies NextAuthConfig;
