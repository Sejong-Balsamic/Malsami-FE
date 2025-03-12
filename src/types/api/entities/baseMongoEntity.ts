// src/types/api/entities/baseMongoEntity.ts
export interface BaseMongoEntity {
  createdDate?: string; // LocalDateTime
  updatedDate?: string; // LocalDateTime
  isEdited?: boolean;
  isDeleted?: boolean;
}
