export const docMediaAllowedTypes = [
  // 이미지 파일 형식
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/jpg",
  // 문서 파일 형식
  "application/pdf", // PDF
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // DOCX
  "application/msword", // DOC
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // XLSX
  "application/vnd.ms-excel", // XLS
  "application/vnd.openxmlformats-officedocument.presentationml.presentation", // PPTX
  "application/vnd.ms-powerpoint", // PPT
  "application/x-hwp", // 한글 파일(HWP)
  "application/x-hwpml",
  // 비디오 파일 형식
  "video/mp4", // MP4
  "video/x-msvideo", // AVI
  "video/quicktime", // MOV
  // 음악 파일 형식
  "audio/mpeg", // MP3
  "audio/wav", // WAV
  "audio/aac", // AAC
  "audio/ogg", // OGG
];

export default docMediaAllowedTypes;
