import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  server: {
    host: 'localhost',
    port: 5175,
    strictPort: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3001',
        changeOrigin: true
      }
    }
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(process.cwd(), 'index.html'),
        admin: resolve(process.cwd(), 'admin.html'),
        account: resolve(process.cwd(), 'account.html'),
        recipes: resolve(process.cwd(), 'recipes.html'),
        story: resolve(process.cwd(), 'story.html'),
        product: resolve(process.cwd(), 'product.html'),
        checkout: resolve(process.cwd(), 'checkout.html'),
        payment: resolve(process.cwd(), 'payment.html'),
        pro: resolve(process.cwd(), 'pro.html')
      }
    }
  }
});
