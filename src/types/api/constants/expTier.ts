// src/types/api/constants/expTier.ts
export const ExpTier = {
  A: "A",
  B: "B",
  C: "C",
  D: "D",
  E: "E",
  F: "F",
  G: "G",
  H: "H",
  I: "I",
  J: "J",
  K: "K",
  L: "L",
  M: "M",
  N: "N",
  O: "O",
  P: "P",
  Q: "Q",
  R: "R",
} as const;

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type ExpTier = keyof typeof ExpTier;

export const expTierRanges: Record<ExpTier, { minExp: number; maxExp: number; label: string }> = {
  A: { minExp: 8500, maxExp: 10000, label: "정1품" },
  B: { minExp: 8000, maxExp: 8500, label: "정1품" },
  C: { minExp: 7500, maxExp: 8000, label: "종1품" },
  D: { minExp: 7000, maxExp: 7500, label: "종1품" },
  E: { minExp: 6500, maxExp: 7000, label: "정2품" },
  F: { minExp: 6000, maxExp: 6500, label: "정2품" },
  G: { minExp: 5500, maxExp: 6000, label: "종2품" },
  H: { minExp: 5000, maxExp: 5500, label: "종2품" },
  I: { minExp: 4500, maxExp: 5000, label: "정3품" },
  J: { minExp: 4000, maxExp: 4500, label: "정3품" },
  K: { minExp: 3500, maxExp: 4000, label: "종3품" },
  L: { minExp: 3000, maxExp: 3500, label: "종3품" },
  M: { minExp: 2500, maxExp: 3000, label: "정4품" },
  N: { minExp: 2000, maxExp: 2500, label: "정4품" },
  O: { minExp: 1500, maxExp: 2000, label: "종4품" },
  P: { minExp: 1000, maxExp: 1500, label: "종4품" },
  Q: { minExp: 500, maxExp: 1000, label: "정5품" },
  R: { minExp: 0, maxExp: 500, label: "종9품" },
};
