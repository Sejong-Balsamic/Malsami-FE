## ✅ 작업 완료 — 자료게시판 검색바 추가

### 📝 요구사항
- 자료요청 페이지 · 내전공자료 페이지 상단에 검색바가 없었습니다. 질문게시판처럼 검색 기능을 추가합니다.

### 🛠 수정 내용
- **질문/자료 공용 검색바 `BoardSearchBar` 신설** (`components/common/BoardSearchBar.tsx`)
  - `theme` prop으로 테마 색만 분기: `question`(초록) / `document`(파랑). 공통화하여 중복을 줄였습니다.
- **내전공자료 페이지**(`sub/my-faculty`)와 **자료요청 페이지**(`sub/request`) 상단에 검색바 배치.
  - `query` state 추가, `Enter`/검색 버튼으로 `handleSearch` 실행, API 호출에 `query` 전달.
- `DocumentCommand`에 `query?: string` 필드 추가(질문게시판과 동일 컨벤션).

### 📌 참고
- 필터링 기능 자체(`DocumentFilteringBottomSheet`)는 두 페이지에 이미 존재하여, 이번엔 빠져 있던 **검색바**를 추가했습니다.
- 검색어 전달 후 실제 결과 필터링은 백엔드의 `query` 파라미터 지원에 따릅니다(질문게시판과 동일 방식).

### 📂 변경 파일
- `src/components/common/BoardSearchBar.tsx` (신규)
- `src/types/api/requests/documentCommand.ts`
- `src/app/board/document/sub/my-faculty/page.tsx`
- `src/app/board/document/sub/request/page.tsx`

### 🔍 검증
- `npm run build` → `✓ Compiled successfully` (에러 0)

> 커밋: `자료게시판 검색바 추가 : feat : ...`
