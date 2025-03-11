import { apiClient } from "./appClient";

export interface ApiCommand {
  [key: string]: any; // 모든 API 요청 객체가 이 인터페이스를 만족하도록 설계
}

// 인증 헤더 생성
export function getAuthHeaders(): Record<string, string> {
  const token = sessionStorage.getItem("accessToken");
  return {
    "Content-Type": "multipart/form-data",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

// FormData 생성
export function createFormData<T extends ApiCommand>(command: Partial<T>): FormData {
  const formData = new FormData();
  Object.entries(command).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, value.toString());
    }
  });
  return formData;
}

// 공통 POST 요청 메서드
export async function postApiRequest<T extends ApiCommand, R>(url: string, command: Partial<T>): Promise<R> {
  const formData = createFormData(command);
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await apiClient.post<R>(url, formData, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    throw error; // console.error 제거
  }
}
