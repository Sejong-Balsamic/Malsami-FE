// src/types/api/constants/role.ts
export const Role = {
  ROLE_USER: "ROLE_USER",
  ROLE_ADMIN: "ROLE_ADMIN",
} as const;

export type Role = keyof typeof Role;
