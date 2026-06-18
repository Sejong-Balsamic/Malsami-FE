## ✅ 작업 완료 — 긴 답변이 한 줄로 잘리던 문제

### 🐞 원인
- 질문상세 답변 본문(`AnswerSection.tsx`)에 `line-clamp-1`이 걸려 있어, 아무리 긴 답변도 **첫 한 줄만** 보이고 나머지가 잘렸습니다.

### 🛠 수정 내용
- `line-clamp-1` 제거.
- `whitespace-pre-wrap break-words` 적용 → 작성자가 넣은 줄바꿈을 보존하고, 긴 단어/URL도 컨테이너를 넘지 않게 줄바꿈하여 **답변 전체가 노출**됩니다.

### 📂 변경 파일
- `src/components/questionDetail/AnswerSection.tsx`

### 🔍 검증
- `npm run build` → `✓ Compiled successfully` (에러 0)

> 커밋: `긴 답변 전체 표시 : fix : ...`
