// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  preview: {
    host: true,
    port: 4173,
    allowedHosts: [
      "ec2-44-210-84-152.compute-1.amazonaws.com", // ▲ 이 부분 추가!
    ],
  },
});
