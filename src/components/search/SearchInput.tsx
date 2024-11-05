import React, { useState } from "react";
import subjects from "@/lib/subjects";
import Autosuggest from "react-autosuggest";

// 저장된 검색어 리스트
const savedSearchTerms: string[] = subjects;

// 검색어 필터 함수
const getSuggestions = (value: string): string[] => {
  const inputValue = value.trim().toLowerCase();
  return savedSearchTerms.filter(term => term.toLowerCase().includes(inputValue));
};

function SearchComponent() {
  const [value, setValue] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>, { newValue }: { newValue: string }) => {
    setValue(newValue);
  };

  const onSuggestionsFetchRequested = ({ value }: { value: string }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const inputProps = {
    placeholder: "검색어를 입력하세요",
    value,
    onChange,
  };

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={(suggestion: string) => suggestion}
      renderSuggestion={(suggestion: string) => <div>{suggestion}</div>}
      inputProps={inputProps}
    />
  );
}

export default SearchComponent;
