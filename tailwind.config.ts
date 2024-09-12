import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ['Pretendard'],
      },
      colors: {
        'custom-blue': {
          100: '#74D7CB',
          200: '#55CDBB',
          300: '#09BBA2',
          400: '#03B89E',
        },
        'custom-green': {
          100: '#95DF64',
          200: '#75D837',
          300: '#68D723',
          400: '#5ED513',
        },
        'custom-orange': {
          100: '#F59B55',
          200: '#F47F24',
          300: '#F4710D',
          400: '#F46B02',
        },
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [],
};
export default config;
