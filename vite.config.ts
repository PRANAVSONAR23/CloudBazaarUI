import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'], // Splitting vendor libraries into a separate chunk
          charts: ['recharts'], // Example of splitting chart libraries
          // Add other libraries or modules as needed
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Increase chunk size warning limit (default is 500 KB)
  },
})
