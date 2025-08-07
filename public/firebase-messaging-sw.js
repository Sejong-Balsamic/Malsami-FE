/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
// Import Firebase libraries
importScripts("https://www.gstatic.com/firebasejs/9.17.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.17.2/firebase-messaging-compat.js");

// Initialize Firebase in the Service Worker
firebase.initializeApp({
  apiKey: "AIzaSyBLTIxTCv8V8tDc_TgHBLulTloHv0xp6OI",
  projectId: "sejong-malsami-32064",
  messagingSenderId: "550675191615",
  appId: "1:550675191615:web:51d6aabd5988842005658a",
});

// Retrieve Firebase Messaging instance
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage(payload => {
  console.log("[firebase-messaging-sw.js] 백그라운드 메시지 수신:", payload);

  // Show notification (example)
  const { title, body } = payload.notification || {};
  self.registration.showNotification(title || "알림", {
    body: body || "백그라운드에서 메시지를 수신했습니다.",
  });
});
