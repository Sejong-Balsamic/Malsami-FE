/**
 * 각 게시판별 페이지 크기 사용 예시
 * 
 * 이 파일은 예시용이며, 실제 프로젝트에서는 삭제해도 됩니다.
 */

import { useOptimalPageSizeForBoard } from "@/global/hook/useOptimalPageSizeForBoard";

// 1. 공지사항 페이지에서 사용
export function NoticePageExample() {
  const noticePageSize = useOptimalPageSizeForBoard("NOTICE");
  
  // API 호출 시 noticePageSize 사용
  // pageSize: noticePageSize  // 고정값! (예: 6개)
  
  return <div>공지사항 페이지 크기: {noticePageSize}</div>;
}

// 2. 자료게시판에서 사용
export function DocumentBoardExample() {
  const documentPageSize = useOptimalPageSizeForBoard("DOCUMENT");
  
  // API 호출 시 documentPageSize 사용
  // pageSize: documentPageSize  // 고정값! (예: 8개)
  
  return <div>자료게시판 페이지 크기: {documentPageSize}</div>;
}

// 3. 질문게시판에서 사용
export function QuestionBoardExample() {
  const questionPageSize = useOptimalPageSizeForBoard("QUESTION");
  
  // API 호출 시 questionPageSize 사용
  // pageSize: questionPageSize  // 고정값! (예: 7개)
  
  return <div>질문게시판 페이지 크기: {questionPageSize}</div>;
}

// 4. 내 댓글 페이지에서 사용
export function MyCommentPageExample() {
  const commentPageSize = useOptimalPageSizeForBoard("MY_COMMENT");
  
  // API 호출 시 commentPageSize 사용
  // pageSize: commentPageSize  // 고정값! (예: 10개)
  
  return <div>내 댓글 페이지 크기: {commentPageSize}</div>;
}

// 5. 검색 결과에서 사용
export function SearchResultExample() {
  const searchPageSize = useOptimalPageSizeForBoard("SEARCH_RESULT");
  
  // API 호출 시 searchPageSize 사용
  // pageSize: searchPageSize  // 고정값! (예: 8개)
  
  return <div>검색 결과 페이지 크기: {searchPageSize}</div>;
} 