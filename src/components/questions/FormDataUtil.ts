// FormData 생성 함수

const createFormData = (
  data: {
    memberId: string;
    title: string;
    content: string;
    subject: string;
    questionPresetTagSet: string[];
    customTagSet: string[];
    rewardYeopjeon?: number;
    isPrivate?: boolean;
  },
  mediaFiles: File[],
): FormData => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach(v => formData.append(key, v));
    } else {
      formData.append(key, value as string);
    }
  });

  mediaFiles.forEach(file => formData.append("mediaFiles", file));
  return formData;
};

export default createFormData;
