import { splitVendorChunkPlugin, defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "@svgr/rollup";

export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 3000,
  },
  build: {
    outDir: "dist",
    chunkSizeWarningLimit: 2000,
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: "[name].js",
        chunkFileNames: "chunks/[name][hash].js",
        assetFileNames: "assets/[name][hash].[ext]",
        manualChunks: (path) =>
          path.split("/").reverse()[
            path.split("/").reverse().indexOf("node_modules") - 1
          ],
      },
    },
  },
  resolve: {
    alias: {
      fsevents$: "fsevents.js",
      src: "/src",
    },
  },
  plugins: [svgr(), react(), splitVendorChunkPlugin()],
});
