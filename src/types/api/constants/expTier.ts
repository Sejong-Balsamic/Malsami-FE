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

export type ExpTier = keyof typeof ExpTier;

export const expTierRanges: Record<ExpTier, { minExp: number; maxExp: number }> = {
  A: { minExp: 8500, maxExp: 10000 },
  B: { minExp: 8000, maxExp: 8500 },
  C: { minExp: 7500, maxExp: 8000 },
  D: { minExp: 7000, maxExp: 7500 },
  E: { minExp: 6500, maxExp: 7000 },
  F: { minExp: 6000, maxExp: 6500 },
  G: { minExp: 5500, maxExp: 6000 },
  H: { minExp: 5000, maxExp: 5500 },
  I: { minExp: 4500, maxExp: 5000 },
  J: { minExp: 4000, maxExp: 4500 },
  K: { minExp: 3500, maxExp: 4000 },
  L: { minExp: 3000, maxExp: 3500 },
  M: { minExp: 2500, maxExp: 3000 },
  N: { minExp: 2000, maxExp: 2500 },
  O: { minExp: 1500, maxExp: 2000 },
  P: { minExp: 1000, maxExp: 1500 },
  Q: { minExp: 500, maxExp: 1000 },
  R: { minExp: 0, maxExp: 500 },
};
