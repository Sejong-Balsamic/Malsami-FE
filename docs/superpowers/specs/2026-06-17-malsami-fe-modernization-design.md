# Malsami-FE 전면 현대화 설계 (Modernization Design)

작성일: 2026-06-17
상태: 승인됨 (사용자가 전권 위임)

## 1. 배경 / 문제 정의

세종말싸미 FE는 운영 중인 서비스(v0.1.38, CI 자동배포)다. 버전(Next 14.2 / React 18 / TS5 / Tailwind 3.4)은 한 세대 전이지만 치명적으로 낡지는 않았다. **진짜 문제는 버전이 아니라 스타일링·구조·패턴의 비일관성**이다.

### 진단으로 확정된 사실 (2026-06-17)

| 영역 | 상태 | 근거 |
|---|---|---|
| 빌드 | ✅ 통과 (`BUILD_EXIT=0`) | 화면 깨짐은 빌드 실패가 아니라 스타일 문제 |
| 죽은 폰트 | ❌ `font-pretendard-*` 121건 / 42파일 | tailwind.config·globals.css 어디에도 정의 없음 → 전부 무시됨 |
| 반응형 | ❌ PC 대응 사실상 0 | `max-w-[640px]` 모바일 고정 43파일, `sm:/md:/lg:` 사용 6파일뿐 |
| 픽셀 하드코딩 | ❌ `w-[Npx]` 등 121파일 | 과도한 커스텀 |
| 인라인 style | ❌ 15파일 | `style={{}}` |
| 색상 토큰 | ✅ 깨끗 (0건) | 하드코딩 `#..` 없음 |
| deprecated import | ✅ 정리됨 (0건) | |
| API 표준화 | ⚠️ 우회 2건 | 대부분 apiUtils 사용 |
| Redux | ⚠️ 슬라이스 7개 | activeTab/auth/bottomSheet/fcm/modal/toast — 네이밍·구조 정리 필요 |
| 타입 구조 | ❌ 루트 25파일 명명 난장판 | `.type.ts`/`.types.ts`/PascalCase/camelCase 혼재 |
| 훅 폴더 | ❌ 2곳 분산 | `src/hooks`(1) + `src/global/hook`(5) |
| `global/` | ❌ 잡탕 | store·hook·util·firebase 혼재 |

## 2. 목표 / 비목표

### 목표
1. **PC/모바일 동시 반응형** — 모바일 고정 탈피
2. **표준화/통일** — 과도한 커스텀(픽셀·인라인) 제거, 프로젝트 토큰으로 수렴
3. **죽은 코드 청산** — 무시되는 폰트 클래스 제거
4. **구조 통일·확장성** — 타입·훅·global 정돈, Feature-based 점진 이동
5. **상태관리·네이밍 규칙 통일**

### 비목표 (YAGNI)
- 메이저 버전 업그레이드 (Next 15 / React 19) — 별도 작업
- 색상 토큰 재정의 — 이미 깨끗
- deprecated 제거 — 이미 완료
- env 값 변경 — 코드 현대화와 무관 (`.env.local`은 로컬에만 존재, git 비추적)

## 3. 핵심 설계 결정

1. **순서**: 위험 낮은 것 → 높은 것. UI 위생(폰트→반응형→픽셀) 먼저, 구조 재편(타입/훅/redux) 나중.
2. **단위**: 작은 PR(또는 단계별 커밋) 여러 개. **각 단계 = prettier → `npm run build` 검증 → 통과해야만 다음.**
3. **안전장치**: 빌드 깨지면 그 단계에서 멈춤. (지난 죽은-클래스 사고 = 검증 없이 질주가 원인)
4. **치환 규칙은 사실 기반**:
   - 죽은 폰트 → 프로젝트 표준 유틸 클래스(globals.css에 실존)
     - `font-pretendard-medium` → `font-suit-medium`
     - `font-pretendard-semibold` → `font-suit-semibold`
     - `font-pretendard-bold` → `font-suit-bold`

## 4. 단계별 계획

### 단계 1 — 죽은 폰트 청산 (42파일, 121건) ⭐ 최우선
- `font-pretendard-{medium,semibold,bold}` → `font-suit-{medium,semibold,bold}` 일괄 치환
- 효과: 무시되던 굵기가 즉시 살아나 텍스트 계층 복구 ("보이지도 않아" 1차 해소)
- 위험: 낮음 (1:1 기계 치환, 치환 대상이 globals.css에 실존)
- 검증: 치환 후 `font-pretendard` 잔여 0건 확인 + 빌드

### 단계 2 — 반응형 전환 (43파일)
- `max-w-[640px]` 모바일 고정 → PC/모바일 동시 대응
- 전략: 최상위 레이아웃 컨테이너부터. 모바일 우선 유지하되 PC에서 중앙 정렬·여백 확보(데스크톱에서 모바일 폭이 화면 가운데 오도록), 필요 페이지는 `md:`/`lg:`로 확장
- 위험: 중간 (레이아웃 시각 영향) → 페이지 그룹 단위로 끊어서 빌드 검증
- 검증: 빌드 + 주요 페이지 렌더 확인

### 단계 3 — 픽셀 하드코딩·인라인 청산 (121 / 15파일)
- `w-[Npx]`·`h-[Npx]`·`text-[Npx]` → Tailwind 표준 스케일
- 인라인 `style={{}}` → className
- 위험: 중간 (값 변환 판단 필요) → 안전하게 변환 가능한 것 우선, 모호한 것은 보존
- 검증: 빌드

### 단계 4 — 구조 통일 (타입·훅·global)
- 타입 25파일 명명/위치 통일 (`api/` 하위 정돈 패턴으로 수렴)
- 훅 2폴더 병합 → 단일 위치
- `global/` 잡탕 분리 (store / util / firebase)
- 위험: 높음 (import 경로 대량 변경) → 단계 4는 별도 신중 진행, import 깨짐 즉시 빌드로 검출
- 검증: 빌드 (import 깨짐 = 빌드 실패로 즉시 검출)

### 단계 5 — Redux·네이밍 규칙 통일
- 슬라이스 네이밍/구조 일관화, boolean `is` 접두사 규칙 등 점검
- 위험: 중간 → 빌드 검증

## 5. 검증 전략

- **모든 단계**: `npx prettier --write .` → `npm run build` → `✓ Compiled successfully` + `BUILD_EXIT=0` 확인
- 빌드 실패 시 해당 단계 중단·롤백, 다음 단계로 넘어가지 않음
- 치환류는 grep으로 잔여 0건 정량 확인

## 6. 산출물

- 단계별 커밋 (main 직접 또는 PR)
- main push → CI 자동배포
- GitHub 이슈에 작업 리포트 (변경 요약·검증 결과)
