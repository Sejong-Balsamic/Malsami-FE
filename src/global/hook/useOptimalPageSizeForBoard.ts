import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/global/store";
import { 
  BoardType, 
  calculateOptimalPageSizesForAllBoards 
} from "@/global/store/optimalPageSizeSlice";

/**
 * 특정 게시판의 최적 페이지 크기를 반환하는 훅
 * 
 * @param boardType - 게시판 타입
 * @returns optimalPageSizeForBoard - 해당 게시판의 최적 페이지 크기
 */
export function useOptimalPageSizeForBoard(boardType: BoardType): number {
  const dispatch = useDispatch();
  
  // Redux에서 상태 가져오기
  const { 
    pageSizeByBoardType, 
    isCalculationCompleted 
  } = useSelector((state: RootState) => state.optimalPageSize);

  // 화면 크기 계산 및 Redux 업데이트
  useEffect(() => {
    // 이미 계산이 완료되었다면 다시 계산하지 않음
    if (isCalculationCompleted) {
      return;
    }

    const calculateAndStoreOptimalPageSizes = () => {
      const currentScreenHeightPixels = window.innerHeight;
      
      dispatch(calculateOptimalPageSizesForAllBoards({
        screenHeightPixels: currentScreenHeightPixels
      }));
    };

    // 초기 계산
    calculateAndStoreOptimalPageSizes();

    // 화면 크기 변경 시 재계산 (디바운스 적용)
    let resizeTimeoutId: NodeJS.Timeout;
    
    const handleWindowResizeWithDebounce = () => {
      clearTimeout(resizeTimeoutId);
      resizeTimeoutId = setTimeout(() => {
        calculateAndStoreOptimalPageSizes();
      }, 300); // 300ms 디바운스
    };

    window.addEventListener("resize", handleWindowResizeWithDebounce);

    // 클린업
    return () => {
      window.removeEventListener("resize", handleWindowResizeWithDebounce);
      clearTimeout(resizeTimeoutId);
    };
  }, [dispatch, isCalculationCompleted]);

  // 해당 게시판의 최적 페이지 크기 반환
  const optimalPageSizeForBoard = pageSizeByBoardType[boardType];
  
  return optimalPageSizeForBoard;
}

/**
 * 모든 게시판의 페이지 크기를 한 번에 가져오는 훅 (디버깅용)
 * 
 * @returns allPageSizes - 모든 게시판의 페이지 크기 정보
 */
export function useAllOptimalPageSizes() {
  const { 
    pageSizeByBoardType, 
    isCalculationCompleted, 
    screenHeightPixels 
  } = useSelector((state: RootState) => state.optimalPageSize);

  return {
    allPageSizes: pageSizeByBoardType,
    isCalculationCompleted,
    screenHeightPixels,
  };
} 