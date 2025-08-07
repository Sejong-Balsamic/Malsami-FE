// updated types for document post
import type { DocumentType } from "@/types/api/constants/documentType";

export interface DocumentPostFormData {
  title: string;
  content: string;
  subject: string;
  customTags: string[];
  documentTypes: DocumentType[];
  attendedYear: number;
  isDepartmentPrivate: boolean;
  mediaFiles: File[];
}

export interface DocumentFirstPageProps {
  formData: DocumentPostFormData;
  onSubjectChange: (subject: string) => void;
  onAttendedYearChange: (year: number) => void;
  onDocumentTypesChange: (tags: DocumentType[]) => void;
  onCustomTagsChange: (tags: string[]) => void;
  onNextPage: () => void;
}

export interface DocumentSecondPageProps {
  formData: DocumentPostFormData;
  onFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFileDelete: (fileName: string) => void;
  onSubmit: () => void;
  isFormValid: boolean;
  onDepartmentPrivateToggle?: () => void;
}

export interface SubjectSelectorProps {
  value: string;
  onChange: (value: string) => void;
  onSelect?: (subject: string) => void;
}
