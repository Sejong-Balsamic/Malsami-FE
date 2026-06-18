## ✅ 작업 완료 — 잘못된 로그인 시 "로그인 중" 표시

### 🐞 원인
- 로그인 실패(`else` 분기 / `catch`) 시 로딩 오버레이를 한 번도 띄우지 않고 곧바로 에러 메시지를 표시하고 있었습니다.
- 게다가 부모(`login/page.tsx`)에서 `onHideOverlay` prop을 내려주지 않아, 오버레이를 닫을 경로 자체가 없었습니다.

### 🛠 수정 내용
- `handleLogin` 진입 즉시 **성공/실패와 무관하게** `onShowLoading()`을 호출하도록 변경 → 항상 "로그인 중이에요!" 화면이 먼저 노출됩니다.
- 실패 시 `Date.now()` 기반으로 경과 시간을 계산해 **최소 1초**간 로딩 화면을 유지한 뒤 오버레이를 닫고 에러 메시지를 표시합니다.
- `login/page.tsx`에 `hideOverlay`(상태를 `"none"`으로) 핸들러를 추가하고 `onHideOverlay`로 연결했습니다.

### 📂 변경 파일
- `src/components/login/LoginForm.tsx`
- `src/app/login/page.tsx`

### 🔍 검증
- `npm run build` → `✓ Compiled successfully` (에러 0)

> 커밋: `로그인중 화면 노출 : fix : ...`
