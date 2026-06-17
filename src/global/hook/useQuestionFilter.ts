import { useState } from "react";
import { QuestionCommand } from "@/types/api/requests/questionCommand";
import { questionPostApi } from "@/apis/questionPostApi";

export default function useQuestionFilter() {
  const [filters, setFilters] = useState<Partial<QuestionCommand>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleFilterChange = (newFilters: Partial<QuestionCommand>) => {
    setFilters(newFilters);
  };

  const handleReset = () => {
    setFilters({});
  };

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      const result = await questionPostApi.getFilteredQuestionPosts(filters);
      // 결과 처리 로직
      console.log("Question filter result:", result);
      return result;
    } catch (error) {
      console.error("Question filter error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    filters,
    isLoading,
    handleFilterChange,
    handleReset,
    handleConfirm,
  };
}
