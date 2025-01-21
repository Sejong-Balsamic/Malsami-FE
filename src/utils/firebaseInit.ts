import { initializeApp, getApps } from "firebase/app";
import { firebaseConfig } from "@/../firebaseConfig";

// Firebase 초기화 함수
function initializeFirebase() {
  if (!getApps().length) {
    initializeApp(firebaseConfig);
  }
}

export default initializeFirebase;
