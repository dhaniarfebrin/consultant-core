import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: 'happy-dom',
    setupFiles: ['./src/test/setup.ts'],
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/features/**/*.{ts,tsx}', 'src/components/**/*.{ts,tsx}'],
      exclude: ['**/*.test.{ts,tsx}', '**/components/ui/**'], // Generally exclude UI lib from strict coverage or keep if desired. User said features and components. Let's include all but maybe allow lower for generic UI. actually user said "utamakan folder features dan components".
    },
  },
});
