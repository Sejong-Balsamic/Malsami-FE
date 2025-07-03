import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ["Pretendard", "Apple SD Gothic Neo", "Roboto", "Arial", "sans-serif"], // 대체 폰트 포함
        suit: ["SUIT", "sans-serif"], // 추가된 SUIT 폰트
      },
      boxShadow: {
        "left-custom": "-5px 0px 5px -5px rgba(128, 128, 128, 1)",
      },
      fontSynthesis: {
        none: "none",
      },
      colors: {
        // 게시판 테마 색상
        "document": {
          "main": "#00D1F2", // 자료게시판 메인 색상
        },
        "question": {
          "main": "#00E8BB", // 질문게시판 메인 색상
        },
        
        // 태그 색상
        "tag": {
          "yeopjeon": "#FFB000", // 엽전 태그 색상
          "accept": "#0062D2", // 채택 태그 색상
        },
        
        // UI 요소 색상
        "ui": {
          "tag-bg": "#F5F5F5",     // 태그 배경색
          "tag-text": "#616161",    // 태그 텍스트 색상
          "muted": "#C5C5C5",       // 흐린 텍스트 색상
          "body": "#616161",        // 본문 텍스트 색상
          "divider": "#F0F0F0",     // 구분선 색상
          "image-bg": "#B5B5B5",    // 이미지 배경색
        },
        
        // Shadcn UI 색상 (유지)
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      screens: {
        xs: "375px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        moveToHamburger: {
          "0%": { transform: "translate(0, 0) rotate(0deg)" },
          "10%": { transform: "translate(25px, 10px) rotate(20deg)" },
          "20%": { transform: "translate(50px, -5px) rotate(-15deg)" },
          "30%": { transform: "translate(75px, 5px) rotate(30deg)" },
          "40%": { transform: "translate(100px, 0px) rotate(-20deg)" },
          "50%": { transform: "translate(125px, 10px) rotate(15deg)" },
          "60%": { transform: "translate(150px, -5px) rotate(-30deg)" },
          "70%": { transform: "translate(175px, 5px) rotate(10deg)" },
          "80%": { transform: "translate(200px, 0px) rotate(-10deg)" },
          "90%": { transform: "translate(225px, 5px) rotate(5deg)" },
          "100%": { transform: "translate(250px, 0px) rotate(0deg)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        moveToHamburger: "moveToHamburger 1.5s ease-in-out forwards",
      },
      backgroundImage: {
        "toast-bg": "url('/image/ToastBG.png')",
      },
      fontSize: {
        SUIT_24: ["24px", { fontWeight: "700" }], // 대제목 : Headline - 24px Bold
        SUIT_20: ["20px", { fontWeight: "700" }], // 중제목 : Headline - 20px Bold
        SUIT_18: ["18px", { fontWeight: "600" }], // 소제목 : Sub Heading - 18px Semibold
        SUIT_16: ["16px", { fontWeight: "500" }], // 메인라벨 : MainLabel - 16px Medium
        SUIT_14: ["14px", { fontWeight: "500" }], // 본문 : Paragraph - 14px Medium
        SUIT_12: ["12px", { fontWeight: "500" }], // 바디 : Body - 12px Medium
      },
    },
  },
  // eslint-disable-next-line global-require
  plugins: [require("tailwindcss-animate"), require("tailwind-scrollbar-hide")],
};
export default config;
