// "use client" menandakan bahwa komponen ini adalah Client Component.
// Ini WAJIB karena kita menggunakan React Context (melalui Provider) dan useState,
// yang mana tidak bisa berjalan di Server Components.
"use client";

// Import library TanStack Query (React Query).
// Library ini sangat powerful untuk melakukan fetching data (mengambil data dari API),
// caching (menyimpan data sementara), dan sinkronisasi state server ke client.
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

// ==============================================================================
// Penjelasan File: src/components/providers.tsx
// ==============================================================================
//
// 1. Apa gunanya file ini?
//    File ini bertugas sebagai "Bungkus Utama" (Wrapper) untuk aplikasi kita.
//    Di React/Next.js, seringkali kita butuh fitur yang bisa diakses di SELURUH halaman
//    (seperti data login, tema dark/light mode, atau cache data).
//    Supaya fitur itu tersedia di mana-mana, kita harus membungkus aplikasi kita dengan "Provider".
//
//    Daripada kita menumpuk banyak Provider di file `layout.tsx` (yang bikin kode berantakan),
//    kita kumpulkan semua Provider di satu file ini.
//
// 2. Kenapa pakai useState untuk QueryClient?
//    Kita menggunakan `useState` untuk memastikan instance `QueryClient` hanya dibuat SEKALI saja
//    saat aplikasi pertama kali dimuat di browser.
//    Jika kita menaruh `new QueryClient()` langsung di luar komponen atau tanpa state,
//    klien baru bisa terbuat ulang setiap kali komponen ini re-render, yang akan mereset cache data kita.

export default function Providers({ children }: { children: React.ReactNode }) {
    // Membuat instance QueryClient dengan konfigurasi default.
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        // staleTime: 60 * 1000 (= 1 menit)
                        // Artinya: Data yang sudah diambil dari API akan dianggap "fresh" selama 1 menit.
                        // Selama 1 menit itu, jika user pindah halaman lalu balik lagi,
                        // aplikasi TIDAK akan request ke API lagi, tapi pakai data dari cache (hemat bandwidth & cepat).
                        staleTime: 60 * 1000,
                    },
                },
            })
    );

    return (
        // QueryClientProvider membungkus {children} (seluruh aplikasi kita nantinya).
        // Ini membuat fitur React Query bisa dipakai di komponen manapun di dalam aplikasi.
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
}
