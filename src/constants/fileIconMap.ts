// 파일 타입(또는 MIME)별 아이콘 정보 매핑
// 확장하거나 수정할 때는 src/constants/fileIconMap.ts 만 수정하면 됨.
export interface FileIconInfo {
  iconSrc: string; // public 경로
  label: string; // 사용자에게 보여줄 라벨 (확장자)
}

// media 폴더 하위에 확장자명을 대문자로 한 SVG 가 위치
const ICON_BASE_PATH = "/icons/media";

// MIME → 확장자 라벨 매핑
const MIME_TO_LABEL: Record<string, string> = {
  // 이미지
  "image/jpeg": "JPEG",
  "image/png": "PNG",
  "image/gif": "GIF",
  "image/svg+xml": "SVG",
  "image/webp": "WEBP",
  // 문서
  "application/pdf": "PDF",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "DOCX",
  "application/msword": "DOC",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "XLSX",
  "application/vnd.ms-excel": "XLS",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": "PPTX",
  "application/vnd.ms-powerpoint": "PPT",
  "application/x-hwp": "HWP",
  "application/x-hwpml": "HWP",
  // 비디오
  "video/mp4": "MP4",
  "video/x-msvideo": "AVI",
  "video/quicktime": "MOV",
  // 오디오
  "audio/mpeg": "MP3",
  "audio/aac": "AAC",
};

export const DEFAULT_FILE_ICON: FileIconInfo = {
  iconSrc: "/icons/Document.svg", // 기존 기본 아이콘 유지
  label: "FILE",
};

// 파일 객체 → 아이콘 정보 헬퍼
export const getFileIconInfo = (file: File): FileIconInfo => {
  // 1) MIME 타입 매핑 우선
  const labelFromMime = MIME_TO_LABEL[file.type];
  if (labelFromMime) {
    return {
      label: labelFromMime,
      iconSrc: `${ICON_BASE_PATH}/${labelFromMime}.svg`,
    };
  }

  // 2) 확장자 기반 Fallback
  const ext = file.name.split(".").pop()?.toUpperCase();
  if (ext) {
    return {
      label: ext,
      iconSrc: `${ICON_BASE_PATH}/${ext}.svg`,
    };
  }

  // 3) 기본 아이콘
  return DEFAULT_FILE_ICON;
};
