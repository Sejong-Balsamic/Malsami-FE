"use client";

import { useEffect } from "react";

function ScrollToTopOnLoad(): null {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
}

export default ScrollToTopOnLoad;
// 새로고침하면 페이지의 맨 위로 자동스크롤 되는 함수입니다.
// import 후 최상위 컴포넌트 안에 <ScrollToTopOnLoad /> 를 넣으면 됩니다.
