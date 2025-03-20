// src/types/api/entities/mongo/fcmToken.ts
import { BaseMongoEntity } from "@/types/api/entities/interface/baseMongoEntity";

export interface FcmToken extends BaseMongoEntity {
  fcmTokenId?: string;
  memberId?: string;
  fcmToken?: string;
}
