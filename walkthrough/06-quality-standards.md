# Standar Kualitas & Pre-commit Hooks

Kami telah menetapkan standar pengkodean yang ketat dan pemeriksaan kualitas otomatis untuk memastikan konsistensi dan keandalan basis kode.

## Linting Ketat (Strict Linting)

Kami menggunakan ESLint dengan konfigurasi ketat untuk menangkap kesalahan umum dan menegakkan praktik terbaik.
Aturan utama meliputi:

- `no-console`: Mencegah penggunaan `console.log` di produksi.
- `no-explicit-any`: Menegakkan keamanan tipe dengan melarang penggunaan `any`.
- `no-unused-vars`: Menjaga kode tetap bersih dengan menandai variabel yang tidak digunakan.
- `react/jsx-pascal-case`: Menegakkan penamaan komponen yang benar.
- `naming-convention`: Menegakkan camelCase untuk variabel/fungsi dan PascalCase untuk tipe/komponen.

File konfigurasi: `eslint.config.mjs`

## Standar Kode

Standar kode kami ditegakkan melalui ESLint.

- **Variabel/Fungsi**: `camelCase`
- **Tipe/Interface/Komponen**: `PascalCase`
- **Konstanta**: `UPPER_CASE` atau `camelCase`

## Pre-commit Hooks

Kami menggunakan `simple-git-hooks` dan `lint-staged` untuk secara otomatis memeriksa kode sebelum di-commit.

- **Proses**: Saat Anda menjalankan `git commit`, hook pre-commit akan berjalan.
- **Aksi**: Ini menjalankan `lint-staged`, yang mengeksekusi `eslint` hanya pada file yang di-stage (diubah).
- **Hasil**: Jika linting gagal, commit akan diblokir sampai error diperbaiki.

### Konfigurasi

Di `package.json`:

```json
"simple-git-hooks": {
  "pre-commit": "npx lint-staged"
},
"lint-staged": {
  "*.{js,jsx,ts,tsx}": [
    "eslint"
  ]
}
```

Untuk mengatur hook secara manual (misalnya setelah cloning):

```bash
npm run prepare
```
