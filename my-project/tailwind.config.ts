import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        blob: "blob 7s infinite",
        "fade-up": "fadeUp 0.5s ease-out forwards",
        // 👇 انیمیشن جدید
        scroll: "scroll 40s linear infinite",
        marquee: "marquee 25s linear infinite",
      },
      keyframes: {
        blob: {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(30px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
          "100%": { transform: "translate(0px, 0px) scale(1)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        // 👇 کی‌فریم جدید
        scroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(calc(-50%))" }, // حرکت به چپ
        },
        marquee: {
    "0%": { transform: "translateX(0%)" },
    "100%": { transform: "translateX(100%)" }, // برای راست‌چین (RTL) باید به سمت راست برود
        },
      },
    },
  },
  plugins: [],
};
export default config;