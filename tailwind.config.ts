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
        // 기본 sans 및 사용자 정의 모두 SUIT 사용
        sans: ["SUIT", "sans-serif"],
        suit: ["SUIT", "sans-serif"],
      },
      boxShadow: {
        "left-custom": "-5px 0px 5px -5px rgba(128, 128, 128, 1)",
        "card-custom": "2px 2px 10px 0px rgba(0, 0, 0, 0.1)",
      },
      fontSynthesis: {
        none: "none",
      },
      colors: {
        // 게시판 테마 색상
        document: {
          main: "#00D1F2", // 자료게시판 메인 색상
          sub: "#74ECFF", // 자료게시판 서브 색상
        },
        question: {
          main: "#00E271", // 질문게시판 메인 색상
          sub: "#47FFA3", // 질문게시판 서브 색상
        },

        // 태그 색상
        tag: {
          yeopjeon: "#FFB000", // 엽전 태그 색상
          accept: "#3D8BFF", // 채택(답변) 태그 색상
          // 지정태그(프리셋태그) 색상
          "preset-question-bg": "#CAFFE5", // 질문 지정태그 배경색 (연한 초록)
          "preset-question-text": "#00E271", // 질문 지정태그 텍스트색 (진한 초록)
          "preset-document-bg": "#E3F2FD", // 자료 지정태그 배경색 (연한 파랑) - 필요시 사용
          "preset-document-text": "#00D1F2", // 자료 지정태그 텍스트색 (진한 파랑) - 필요시 사용
          // 커스텀태그 색상
          "custom-bg": "#EDEDED", // 커스텀태그 배경색 (회색)
          "custom-text": "#898989", // 커스텀태그 텍스트색 (진한 회색)
          hot: "#FF6723", // 추가: 핫오렌지 태그색
          "search-bg": "#D5ECFB", // 추가: 검색 강조태그 배경색
          "search-text": "#0070F3", // 추가: 검색 강조태그 텍스트색
          green: "#5ED513", // 추가: 커스텀 그린 태그색
        },

        // UI 요소 색상
        ui: {
          "tag-bg": "#F5F5F5", // 태그 배경색
          "tag-text": "#616161", // 태그 텍스트 색상
          muted: "#C5C5C5", // 흐린 텍스트 색상
          body: "#616161", // 본문 텍스트 색상
          "body-soft": "#737373", // 본문 보조 회색 (옛 #737373/#727272 통합)
          divider: "#F0F0F0", // 얇은 구분선 색상
          "divider-thick": "#EDEDED", // 두꺼운 구분선 색상 (4px)
          "divider-light": "#F1F1F1", // 카드 테두리용 옅은 구분선 (옛 #F1F1F1/#EEEEEE/#E7E7E7 통합)
          border: "#E2E2E2", // 테두리 색상
          "image-bg": "#B5B5B5", // 이미지 배경색
          count: "#ACACAC", // 카운터용 회색 (좋아요·댓글·조회수 등)
          "muted-soft": "#A7A7A7", // 살짝 진한 흐린 회색 (옛 #A7A7A7/#929292/#A4A4A4 통합)
          disabled: "#C5C5C5",
          error: "#f56565", // 추가: 에러 붉은색
        },

        // 마이페이지 색상
        mypage: {
          teal: "#016C5D", // 추가: 마이페이지 다크틸
          "teal-light": "#74d7cb", // 추가: 마이페이지 계열 연한 틸
        },

        // 레거시 색상 (옛 디자인 청록/채택 파랑 — 점진적 통일용 토큰화)
        legacy: {
          teal: "#03B89E", // 옛 자료게시판 청록 (체크박스·강조선 등)
          "teal-sub": "#95E4DA", // 옛 자료게시판 청록 보조
          "accept-blue": "#0062D2", // 옛 채택/필터 파랑
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
      maxWidth: {
        // 앱 컨테이너 폭 토큰 (폭 값은 이 한 곳에서만 관리)
        container: "640px", // 모바일/기본 컨테이너 폭 (레거시 — 점진 대체)
        "container-lg": "960px", // PC(lg 이상) 확장 컨테이너 폭 (레거시 — 점진 대체)
        // 콘텐츠 성격별 폭 토큰 (통 제거 후 진짜 반응형용)
        "content-narrow": "720px", // 본문 읽기/폼 등 좁게 유지할 콘텐츠
        "content-wide": "1200px", // 리스트/그리드/홈 등 넓게 펼칠 콘텐츠
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
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeOut: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        scaleIn: {
          "0%": { transform: "scale(0)", opacity: "0" },
          "50%": { transform: "scale(1.1)", opacity: "1" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        popIn: {
          "0%": { transform: "scale(0) rotate(-180deg)", opacity: "0" },
          "50%": { transform: "scale(1.2) rotate(10deg)", opacity: "1" },
          "100%": { transform: "scale(1) rotate(0deg)", opacity: "1" },
        },
        slideInUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        tossFadeIn: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        tossPopIn: {
          "0%": { opacity: "0", transform: "scale(0.94)" },
          "60%": { opacity: "1", transform: "scale(1.01)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        tossSlideUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        tossSheetUp: {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
      },
      transitionTimingFunction: {
        toss: "cubic-bezier(0.22, 1, 0.36, 1)",
        "toss-spring": "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        moveToHamburger: "moveToHamburger 1.5s ease-in-out forwards",
        fadeIn: "fadeIn 0.3s ease-out",
        fadeOut: "fadeOut 0.3s ease-out",
        scaleIn: "scaleIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        popIn: "popIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        slideInUp: "slideInUp 0.5s ease-out",
        "toss-fade-in": "tossFadeIn 0.3s cubic-bezier(0.22, 1, 0.36, 1) both",
        "toss-pop-in": "tossPopIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) both",
        "toss-slide-up": "tossSlideUp 0.35s cubic-bezier(0.22, 1, 0.36, 1) both",
        "toss-sheet-up": "tossSheetUp 0.4s cubic-bezier(0.22, 1, 0.36, 1) both",
      },
      animationDelay: {
        "200": "200ms",
        "400": "400ms",
        "600": "600ms",
      },
      backgroundImage: {
        "toast-bg": "url('/image/ToastBG.png')",
      },
      fontSize: {
        SUIT_24: ["24px", { fontWeight: "700", lineHeight: "100%" }], // 대제목 : Headline - 24px Bold
        SUIT_20: ["20px", { fontWeight: "700", lineHeight: "100%" }], // 중제목 : Headline - 20px Bold
        SUIT_18: ["18px", { fontWeight: "600", lineHeight: "100%" }], // 소제목 : Sub Heading - 18px Semibold
        SUIT_16: ["16px", { fontWeight: "500", lineHeight: "100%" }], // 메인라벨 : MainLabel - 16px Medium
        SUIT_14: ["14px", { fontWeight: "500", lineHeight: "100%" }], // 본문 : Paragraph - 14px Medium
        SUIT_12: ["12px", { fontWeight: "500", lineHeight: "100%" }], // 바디 : Body - 12px Medium
      },
    },
  },
  // eslint-disable-next-line global-require
  plugins: [require("tailwindcss-animate"), require("tailwind-scrollbar-hide")],
};
export default config;
