## 🏗️ Phase 2 — Structure Refactor & Dead Code Removal

Follow-up to the UI hygiene pass. This phase tackled structural inconsistencies (scattered hooks, chaotic type files, mixed `global/`) and dead code, again as small build-gated commits.

### 📊 Summary

| Area | Before | After |
| --- | --- | --- |
| Custom hook folders | 2 (`src/hooks` + `src/global/hook`) | 1 (`src/global/hook`, 7 hooks) |
| `src/types` root files | 25 (mixed naming) | 12 (camelCase, single rule) |
| Dead type files | 13 orphaned | 0 |
| `global/` stray files | empty `commonUtil`, misplaced hook | cleaned |
| Debug `console.log` (standalone) | 28 in production code | 0 |
| Build | — | Compiled successfully (per commit) |

### 🔧 Commits

1. **Hook folder unified** (`32f065a`) — moved the lone, unused `src/hooks/useQuestionFilter` into `src/global/hook`; removed the now-empty `src/hooks`. Custom hooks now live in exactly one place.
2. **Dead type files removed** (`b3040ab`) — 13 type modules with **zero references anywhere** (verified by base-name grep + no `export *` re-export + no barrel file). `src/types` root: 25 -> 12.
3. **Type naming unified** (`125ad53`) — `DocFilterOptions.ts -> docFilterOptions.ts`, `docCard.type.ts -> docCard.ts`; synchronized 7 import sites. Root type files now follow a single camelCase convention.
4. **`global/` tidied** (`e37bb16`) — deleted empty `commonUtil.ts`; relocated the misplaced `useUserPermissions` hook from `global/` root into `global/hook` (2 imports synced).
5. **Debug logs purged** (`316b810`) — removed 28 standalone `console.log(...)` statements from production code. **Intentionally preserved** arrow-callback logs, commented-out logs, and `console.error`/`console.warn` (error logging).

### ✅ Verification

Every commit passed `npm run build` -> `Compiled successfully` before landing. Removals were proven safe by cross-checking references with `grep` (no import, no re-export, no barrel) prior to deletion. Each push rebased cleanly onto `origin/main` (CI version bumps) with no conflicts.

### 🧭 Deliberately NOT changed (with rationale)

Honest scoping — these were evaluated and **left as-is on purpose**, not overlooked:

- **`max-w-[640px]` / responsive layout** — `ClientLayout.tsx` already implements the intended mobile-first pattern (grey backdrop + centered 640px white card on desktop). This is by design, not a bug. A true PC-wide layout is a *new design*, not hygiene, and cannot be validated by a build alone.
- **Redux store** — 6 slices, all in use, consistent `xxxSlice` naming, `RootState`/`AppDispatch` typed. Already clean; no change warranted.
- **Remaining `: any` (4 sites)** — all intentional: `apiUtils` generic FormData index signature (load-bearing), and backend-undefined `sort`/Firebase `notification` types (documented). Tightening requires backend specs.

### 📌 Net result

UI tokens converged + structure flattened to single conventions + dead code (13 types, 28 logs, 1 empty util) removed — all without a single build break or behavior change. Two items (responsive PC layout, `any` tightening) remain genuinely out-of-scope for unattended work and are documented above for a future, reviewed pass.
