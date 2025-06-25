import { useState } from "react";
import { DocumentCommand } from "@/types/api/requests/documentCommand";
import { documentPostApi } from "@/apis/documentPostApi";

export default function useDocumentFilter() {
  const [filters, setFilters] = useState<Partial<DocumentCommand>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleFilterChange = (newFilters: Partial<DocumentCommand>) => {
    setFilters(newFilters);
  };

  const handleReset = () => {
    setFilters({});
  };

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      const result = await documentPostApi.filteredDocumentPost(filters);
      // 결과 처리 로직
      console.log("Document filter result:", result);
      return result;
    } catch (error) {
      console.error("Document filter error:", error);
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
