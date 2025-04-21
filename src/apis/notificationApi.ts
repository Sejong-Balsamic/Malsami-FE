import { NotificationCommand } from "@/types/api/requests/notificationCommand";
import { NotificationDto } from "@/types/api/responses/notificationDto";
import { postApiRequest } from "./apiUtils";

export const notificationApi = {
  // 특정 사용자에게 알림 전송
  sendNotification: async (command: Partial<NotificationCommand>): Promise<NotificationDto> =>
    postApiRequest<NotificationCommand, NotificationDto>("/api/notification/send", command),

  // 모든 사용자에게 알림 전송 (Void 응답)
  sendNotificationToAll: async (command: Partial<NotificationCommand>): Promise<void> =>
    postApiRequest<NotificationCommand, void>("/api/notification/send/all", command),
};

export default notificationApi;
