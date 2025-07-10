// 질문글 작성 관련 타입 정의
export interface QuestionPostFormData {
  title: string;
  content: string;
  subject: string;
  customTags: string[];
  questionPresetTags: string[];
  reward: number;
  isPrivate: boolean;
  mediaFiles: File[];
}

export interface FirstPageProps {
  formData: QuestionPostFormData;
  onSubjectChange: (subject: string) => void;
  onJiJeongTagsSelect: (tags: string[]) => void;
  onCustomTagsSubmit: (tags: string[]) => void;
  onNextPage: () => void;
}

export interface SecondPageProps {
  formData: QuestionPostFormData;
  onFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFileDelete: (fileName: string) => void;
  onPrivateToggle: () => void;
  onSubmit: () => void;
  isFormValid?: boolean;
}

export interface SubjectSelectorProps {
  value: string;
  onChange: (value: string) => void;
  onSelect: (subject: string) => void;
}

export interface JiJeongTagSelectorProps {
  selectedTags: string[];
  onTagsSelect: (tags: string[]) => void;
}

export interface CustomTagSelectorProps {
  tags: string[];
  onTagsSubmit: (tags: string[]) => void;
  onRemoveTag: (tag: string) => void;
}
