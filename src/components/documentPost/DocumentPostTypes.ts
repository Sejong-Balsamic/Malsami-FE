export interface DocumentPostFormData {
  title: string;
  content: string;
  subject: string;
  studyYear: number;
  categoryTags: string[];
  customTags: string[];
  isPrivate: boolean;
  mediaFiles: File[];
}

export interface DocumentFirstPageProps {
  formData: DocumentPostFormData;
  onSubjectChange: (subject: string) => void;
  onStudyYearChange: (year: number) => void;
  onCategoryTagsChange: (tags: string[]) => void;
  onCustomTagsChange: (tags: string[]) => void;
  onNextPage: () => void;
}

export interface DocumentSecondPageProps {
  formData: DocumentPostFormData;
  onFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFileDelete: (fileName: string) => void;
  onPrivateToggle: () => void;
  onSubmit: () => void;
  isFormValid: boolean;
}

export interface SubjectSelectorProps {
  value: string;
  onChange: (value: string) => void;
  onSelect?: (subject: string) => void;
}
