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

            const protectedRoutes = ["/dashboard", "/projects", "/tasks", "/settings"];
            const isProtectedRoute = protectedRoutes.some(route => nextUrl.pathname.startsWith(route));

            if (isProtectedRoute) {
                if (isLoggedIn) return true;
                return false; // Redirect to login
            } else if (isLoggedIn) {
                // If user is logged in and on a public page (like login or home), redirect to dashboard
                // But allow other paths if they are not explicitly protected but valid (though we might not have many yet)
                // For now, let's just redirect from root and login
                if (nextUrl.pathname === "/" || nextUrl.pathname.startsWith("/login")) {
                    return Response.redirect(new URL("/dashboard", nextUrl));
                }
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
