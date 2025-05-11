function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center">
      <svg // 벡터 그래픽 이미지로 로딩 스피너를 만들기 위한 요소
        className="animate-spin" // Tailwind CSS의 회전 애니메이션 클래스
        xmlns="http://www.w3.org/2000/svg"
        width="80" // 가로길이
        height="80" // 세로길이
        viewBox="0 0 40 40" // SVG의 좌표계
        fill="none"
      >
        <g id="Group 1000003698">
          <path
            id="Ellipse 714"
            // 원형 경로를 따라 로딩 스피너의 형태를 그림
            d="M26.3311 33.528C29.9376 31.8488 32.7294 28.8058 34.0923 25.0683C35.4552 21.3308 35.2775 17.2049 33.5984 13.5984C31.9193 9.99189 28.8762 7.20011 25.1387 5.83723C21.4012 4.47434 17.2754 4.652 13.6689 6.33112"
            stroke="url(#paint0_linear_13416_7408)" // 선에 그라디언트 적용
            strokeWidth="10" // 선의 두께
            strokeLinecap="round" // 스피너 양쪽 끝 모양
          />
        </g>
        <defs>
          {/* 선 색상을 정의하는 그라디언트 */}
          <linearGradient id="paint0_linear_13416_7408" x1="10" y1="0" x2="30" y2="40" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" /> {/* 시작점 색상: 흰색 */}
            <stop offset="40%" stopColor="#AAF7D6" /> {/* 중간 색상: 연한 민트 */}
            <stop offset="100%" stopColor="#08E4BB" /> {/* 끝 색상: 진한 민트 */}
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export default LoadingSpinner;
