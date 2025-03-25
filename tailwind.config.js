/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  import: "#root", // mui style이 tailwindCss보다 우선순위를 가지게 함
  theme: {
    extend: {
      colors: {
        tableHeader: "#E1F1FF",
        tableBorder: "#E5E5E5",
      },
    },
  },
  plugins: [],
  // mui setting
  corePlugins: {
    preflight: false, // Tailwind의 기본 스타일을 비활성화
  },
};
