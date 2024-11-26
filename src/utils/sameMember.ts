/**
 * 작성자 여부를 확인하는 함수
 * @param questionDataMemberId - 질문 데이터에 포함된 작성자의 memberId
 * @returns boolean - 작성자 여부 (true: 본인, false: 타인)
 */
const sameMember = (questionDataMemberId: string): boolean => {
  const loggedInMemberId = sessionStorage.getItem("memberId");

  // sessionStorage에서 가져온 ID와 questionData의 memberId를 비교
  return loggedInMemberId === questionDataMemberId;
};

export default sameMember;
