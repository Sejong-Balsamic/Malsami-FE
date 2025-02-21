function NewLoadingSpinner() {
  return (
    <div className="flex items-center justify-center">
      <svg // 벡터 그래픽 이미지로 로딩 스피너를 만들기 위한 요소
        className="animate-spin" // tailwind css
        xmlns="http://www.w3.org/2000/svg"
        width="80" // 가로길이
        height="80" // 세로길이
        viewBox="0 0 40 40" // SVG의 좌표계
        fill="none"
      >
        <g id="Group 1000003698">
          <path
            id="Ellipse 714"
            d="M26.3311 33.528C29.9376 31.8488 32.7294 28.8058 34.0923 25.0683C35.4552 21.3308 35.2775 17.2049 33.5984 13.5984C31.9193 9.99189 28.8762 7.20011 25.1387 5.83723C21.4012 4.47434 17.2754 4.652 13.6689 6.33112"
            stroke="url(#paint0_linear_13416_7408)"
            strokeWidth="10"
            strokeLinecap="round" // 스피너 양쪽 끝 모양
          />
        </g>
        <defs>
          <linearGradient id="paint0_linear_13416_7408" x1="10" y1="0" x2="30" y2="40" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="40%" stopColor="#AAF7D6" />
            <stop offset="100%" stopColor="#08E4BB" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export default NewLoadingSpinner;
