import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [react(),VitePWA({

  registerType: 'autoUpdate',

  manifest: {

    name: 'QuickChat',

    short_name: 'QuickChat',

    description: 'Realtime Chat Application',

    theme_color: '#6366f1',

    background_color: '#ffffff',

    display: 'standalone',

    orientation: 'portrait',

    start_url: '/',

    icons: [

      {
        src: '/pwa-192.png',
        sizes: '192x192',
        type: 'image/png'
      },

      {
        src: '/pwa-512.png',
        sizes: '512x512',
        type: 'image/png'
      }

    ]

  }

})],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false
      }
    }
  }
});