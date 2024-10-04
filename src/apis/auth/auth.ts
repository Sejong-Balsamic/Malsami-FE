import axios from "axios";

export const login = async (id: string, password: string) => {
  if (!id || !password) {
    throw new Error("아이디와 비밀번호는 필수 입력 사항입니다.");
  }

  // form-data 객체 생성
  const formData = new FormData();

  formData.append("sejongPortalId", id);
  formData.append("sejongPortalPassword", password);

  try {
    const response = await axios.post("https://api.sejong-malsami.co.kr/api/member/signin", formData, {
      withCredentials: true, // http-only로 Cookie에 refeshToken 저장하기 위해
    });

    // 성공 처리
    sessionStorage.setItem("accessToken", response.data.accessToken);
    return response.data;
  } catch (error) {
    // 오류 처리
    console.error("로그인 실패:", error);
    console.warn("로그아웃 되었습니다. 다시 로그인해주세요");
    throw error;
  }
};

export default login;
