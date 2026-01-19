// Mengimpor module NextAuth untuk menangani otentikasi
import NextAuth from "next-auth";
// Mengimpor konfigurasi otentikasi yang sudah dibuat di file auth.config.ts
import { authConfig } from "./auth.config";

// Mengekspor middleware default yang menggunakan konfigurasi authConfig.
// Middleware ini akan berjalan sebelum request mencapai halaman yang dituju.
// Fungsi .auth ini memastikan session diverifikasi.
export default NextAuth(authConfig).auth;

// Ekspor konfigurasi untuk Next.js Middleware
export const config = {
    // Matcher digunakan untuk menentukan path/rute mana saja yang HARUS melewati middleware ini.
    // Pola regex di bawah ini berarti:
    // "Jalankan middleware pada semua request, KECUALI path yang dimulai dengan:"
    // - api (endpoint API tidak perlu diproteksi middleware ini secara default atau ditangani terpisah)
    // - _next/static (file aset statis seperti CSS/JS build)
    // - _next/image (endpoint optimasi gambar)
    // - favicon.ico (icon website)
    //
    // Dokumentasi: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
