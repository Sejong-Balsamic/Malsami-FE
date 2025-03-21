// src/types/api/constants/imageQuality.ts
export const ImageQuality = {
  ORIGINAL: "ORIGINAL",
  HIGH: "HIGH",
  MEDIUM: "MEDIUM",
  LOW: "LOW",
} as const;

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type ImageQuality = keyof typeof ImageQuality;

export const imageQualitySettings: Record<ImageQuality, { scale: number; outputQuality: number }> = {
  ORIGINAL: { scale: 1.0, outputQuality: 1.0 },
  HIGH: { scale: 0.9, outputQuality: 0.9 },
  MEDIUM: { scale: 0.7, outputQuality: 0.7 },
  LOW: { scale: 0.5, outputQuality: 0.5 },
};
