## ✅ 후속 작업 진행 — PC 반응형 (컨테이너 확장형)

이슈 본문의 후속 항목 `[ ] (후속) 반응형 전환` 중 **컨테이너 확장형** 방식으로 1차 적용했습니다. 모바일 레이아웃은 그대로 두고 PC(lg 이상)에서만 넓어지도록 했습니다.

### 🛠 적용 내용
1. **공통 컨테이너 확장** (`ClientLayout.tsx`)
   - `max-w-[640px]` → 모바일 640px 유지 + `lg:max-w-[960px]`로 PC에서 확장.
   - 네비를 표시하는 메인 페이지 전체(`/`, `/board/question`, `/board/document`, `/mypage`)에 일괄 반영.
2. **카드 리스트 PC 다단 그리드** (`DocumentCardList.tsx`, `QuestionCardList.tsx`)
   - 모바일: 기존 1열 + 카드 사이 divider 유지.
   - PC(lg): `grid grid-cols-2 gap-x-6 gap-y-4` 2열 그리드. 그리드에서는 divider를 `lg:hidden`으로 숨겨 깨지지 않도록 처리.

### 📂 변경 파일
- `src/app/ClientLayout.tsx`
- `src/components/documentMain/DocumentCardList.tsx`
- `src/components/questionMain/QuestionCardList.tsx`

### 🔍 검증
- `npm run build` → `✓ Compiled successfully` (에러 0)

### 📌 남은 후속
- 상세 페이지·작성 페이지 등 개별 화면의 PC 전용 레이아웃 정교화는 시각 검증과 함께 추가 진행 가능합니다. 이번엔 위험 낮은 공통 컨테이너+리스트 그리드부터 적용했습니다.

> 커밋: `PC 반응형 컨테이너 확장 : feat : ...`
