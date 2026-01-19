import { defineConfig } from '@prisma/config';

export default defineConfig({
    // engine: 'classic', // Removed as it causes type error
    datasource: {
        url: process.env.DATABASE_URL!,
    },
});
