/**
 * @deprecated 이 컴포넌트는 더 이상 사용되지 않습니다.
 * InfoAlertModal을 직접 사용하거나 다른 모달 시스템을 사용하세요.
 *
 * 원래 용도: 로그인이 필요한 경우 리다이렉트 모달 표시
 * 대체 방법: InfoAlertModal 컴포넌트 직접 사용
 */

// "use client";

// import React from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { closeModal } from "@/global/store/modalSlice";
// import { RootState } from "@/global/store";
// import InfoAlertModal from "../common/modal/InfoAlertModal";

// function LoginDirectModal() {
//   const dispatch = useDispatch();
//   const { isVisible, content } = useSelector((state: RootState) => state.modal);

//   const handleConfirm = () => {
//     dispatch(closeModal());
//     window.location.href = "/login"; // 로그인 페이지로 이동
//   };

//   const handleCancel = () => {
//     dispatch(closeModal());
//   };

//   return (
//     <InfoAlertModal
//       isOpen={isVisible}
//       title="로그인 필요"
//       message="로그인 후 이용가능합니다."
//       confirmLabel="로그인"
//       onConfirm={handleConfirm}
//       onCancel={handleCancel}
//     />
//   );
// }

// export default LoginDirectModal;

// 더미 export (파일이 완전히 주석처리되어 빌드 오류 방지)
const deprecated = {};
export default deprecated;
