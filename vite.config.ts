import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 서버 프록시
  server: {
    proxy: {
      "/api": {
        target: "http://211.228.124.210:9060", // 실제 API 서버 URL
        changeOrigin: true, // 다른 도메인으로 요청을 보내기 위한 설정
        secure: false, // HTTPS가 아닌 경우
      },
    },
  },
});
