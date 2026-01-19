# Unit Testing Setup

Dokumen ini menjelaskan setup unit testing pada project ConsultantCore menggunakan **Vitest** dan **React Testing Library**.

## 1. Stack Technology

Kita menggunakan tools berikut untuk keperluan testing:

- **Vitest**: Test runner yang cepat, kompatibel dengan Vite/Next.js ecosystem.
- **React Testing Library**: Library untuk rendering komponen React dan testing behavior dari sudut pandang user.
- **JSDOM**: Environment simulasi browser untuk Node.js agar kita bisa mengetes komponen DOM.
- **@testing-library/jest-dom**: Custom matchers untuk Jest/Vitest untuk mempermudah assertion DOM (contoh: `toBeInTheDocument`).

## 2. Instalasi Dependencies

Dependencies berikut telah diinstall sebagai `devDependencies`:

```bash
npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/dom @testing-library/jest-dom vite-tsconfig-paths
```

## 3. Konfigurasi

### Vitest Config (`vitest.config.ts`)

File konfigurasi ini mengatur environment testing agar menggunakan `jsdom` dan setup file global.

```typescript
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    globals: true,
  },
});
```

### Setup File (`src/test/setup.ts`)

File ini dijalankan sebelum setiap test file. Kita mengimport `jest-dom` di sini agar matchers-nya tersedia secara global.

```typescript
import "@testing-library/jest-dom";
```

## 4. Scripts

Script berikut ditambahkan ke `package.json` untuk menjalankan test:

```json
"scripts": {
  "test": "vitest"
}
```

## 5. Menjalankan Test

Untuk menjalankan test runner:

```bash
npm test
```

Command ini akan berjalan dalam mode watch secara default, sehingga test akan berjalan ulang otomatis setiap ada perubahan file.

## 6. Contoh Test Component

Contoh unit test untuk komponen Button bisa dilihat di `src/components/ui/button.test.tsx`:

```typescript
import { render, screen } from '@testing-library/react';
import { Button } from './button';
import { describe, it, expect } from 'vitest';

describe('Button', () => {
  it('renders correctly', () => {
    // 1. Render component
    render(<Button>Click me</Button>);

    // 2. Query element
    const button = screen.getByRole('button', { name: /click me/i });

    // 3. Assertion
    expect(button).toBeInTheDocument();
  });
});
```
