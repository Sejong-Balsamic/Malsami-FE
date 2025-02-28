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
        "custom-blue": {
          "100": "#95E4DA",
          "200": "#74D7CB",
          "300": "#55CDBB",
          "400": "#09BBA2",
          "500": "#03B89E",
        },
        "custom-green": {
          "100": "#AAE483",
          "200": "#95DF64",
          "300": "#75D837",
          "400": "#68D723",
          "500": "#5ED513",
        },
        "custom-orange": {
          "100": "#F2AB75",
          "200": "#F59B55",
          "300": "#F47F24",
          "400": "#F4710D",
          "500": "#F46B02",
        },
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
        SUIT_20: ["20px", { fontWeight: "700" }], // 제목
        SUIT_18: ["18px", { fontWeight: "600" }], // 소제목목
        SUIT_16: ["16px", { fontWeight: "500" }], // 본문문
        SUIT_14: ["14px", { fontWeight: "500" }], // 세부사항
        SUIT_12: ["12px", { fontWeight: "500" }], // 태그
      },
    },
  },
  // eslint-disable-next-line global-require
  plugins: [require("tailwindcss-animate"), require("tailwind-scrollbar-hide")],
};
export default config;
