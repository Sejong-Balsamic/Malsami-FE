// src/types/api/entities/interface/baseMongoEntity.ts
export interface BaseMongoEntity {
  createdDate?: string; // LocalDateTime
  updatedDate?: string; // LocalDateTime
  isEdited?: boolean;
  isDeleted?: boolean;
}
